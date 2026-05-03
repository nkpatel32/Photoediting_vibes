import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, 'db.json');
const MONGO_URI = process.env.MONGO_URI;

// Define the Schema
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
}, { timestamps: true });

const GalleryItem = mongoose.model('GalleryItem', itemSchema);

async function migrate() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected!');

    if (!fs.existsSync(DB_FILE)) {
      console.log('db.json not found. Nothing to migrate.');
      process.exit(0);
    }

    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    console.log(`Found ${data.length} items in db.json. Starting migration...`);

    // Clear existing data (optional, but good for a fresh start)
    await GalleryItem.deleteMany({});

    // Remove the old 'id' field as MongoDB uses '_id'
    const cleanData = data.map(({ id, ...rest }) => rest);

    await GalleryItem.insertMany(cleanData);
    console.log('Migration successful!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
