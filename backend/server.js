import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- MONGODB CONNECTION ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- GALLERY SCHEMA ---
const itemSchema = new mongoose.Schema({
  cat: String,
  title: String,
  tag: String,
  cls: String,
  thumb: String,
  before: String,
  after: String,
  desc: String,
  order: Number,
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

itemSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const GalleryItem = mongoose.model('GalleryItem', itemSchema);

// --- SITE CONFIG SCHEMA ---
const configSchema = new mongoose.Schema({
  nav: Object,
  hero: Object,
  stats: Array,
  marquee: Array,
  showreel: Object,
  beforeAfter: Array,
  services: Array,
  tools: Array,
  process: Array,
  testimonials: Array,
  contact: Object,
  links: Object,
}, { timestamps: true });

const SiteConfig = mongoose.model('SiteConfig', configSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });

// --- API ROUTES ---

// Get site config
app.get('/api/config', async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      return res.status(404).json({ error: 'Config not found' });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch config' });
  }
});

// Update site config
app.put('/api/config', async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      config = new SiteConfig(req.body);
    } else {
      Object.assign(config, req.body);
    }
    await config.save();
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update config' });
  }
});

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ order: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Add new item
app.post('/api/items', async (req, res) => {
  try {
    const count = await GalleryItem.countDocuments();
    const newItem = new GalleryItem({
      ...req.body,
      order: count + 1
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// Update item
app.put('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await GalleryItem.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete item
app.delete('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await GalleryItem.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Reorder items
app.post('/api/items/reorder', async (req, res) => {
  try {
    const newOrder = req.body; // array of items with new order
    const bulkOps = newOrder.map((item, index) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { order: index + 1 }
      }
    }));
    await GalleryItem.bulkWrite(bulkOps);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder items' });
  }
});

// Upload image (Now uses Cloudinary)
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'photoediting_vibes',
    });

    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    res.json({ secure_url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    res.status(500).json({ error: 'Failed to upload image to cloud' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
