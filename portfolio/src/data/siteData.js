// ================================================================
// siteData.js — Full site content defaults + localStorage CRUD
// ================================================================

const SITE_KEY = 'pev_site_data';

export const DEFAULT_SITE = {
  // ── NAV ─────────────────────────────────────
  nav: {
    logo:      'PEV',
    logoSuffix:'ibes',
    igText:    '@photoediting_vibes ↗',
    igLink:    'https://instagram.com/photoediting_vibes',
  },

  // ── HERO ────────────────────────────────────
  hero: {
    eyebrow:  'Photo · Video · AI Editing · 54K+ Community',
    line1:    'VISUAL',
    line2:    'EDITING',
    line3:    'VIBES.',
    subtitle: 'Lightroom mastery, cinematic color grades, AI-powered edits — turning raw shots into scroll-stopping visuals. Based in India. Working worldwide.',
    cta1:     'Watch Showreel',
    cta2:     'Get Quote',
  },

  // ── STATS ───────────────────────────────────
  stats: [
    { target: 54,  unit: 'K+', label: 'Instagram Followers' },
    { target: 148, unit: '+',  label: 'Projects Delivered' },
    { target: 5,   unit: '+',  label: 'Years Experience' },
    { target: 100, unit: '%',  label: 'Client Satisfaction' },
  ],

  // ── MARQUEE ─────────────────────────────────
  marquee: [
    'Lightroom Editing', 'AI Photo Editing', 'Color Grading',
    'Video Editing', 'Cinematic LUTs', 'Photo Retouching',
    'Motion Graphics', 'Reels & Shorts', 'Brand Content',
  ],

  // ── SHOWREEL ────────────────────────────────
  showreel: {
    label:       '01 — Showreel',
    heading1:    'WATCH THE',
    heading2:    'MAGIC',
    heading3:    'HAPPEN',
    description: 'A curated reel of my best photo and video edits — Lightroom transformations, cinematic color grades, AI-powered retouching, and motion work.',
    videoUrl:    'https://www.youtube.com/embed/JwtATvo5rK8',
    bgImage:     'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1600&q=80',
    timecode:    '00:00:00:00 • 4K • 60fps',
    playerTitle: 'PHOTOEDITING VIBES — 2025 SHOWREEL',
  },

  // ── BEFORE/AFTER ────────────────────────────
  beforeAfter: [
    {
      id: 1, tag: 'Portrait Retouch',
      before: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
      after:  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
    },
    {
      id: 2, tag: 'Cinematic Color Grade',
      before: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
      after:  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80',
    },
    {
      id: 3, tag: 'Lightroom Preset',
      before: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80',
      after:  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    },
    {
      id: 4, tag: 'AI Retouch + Grade',
      before: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
      after:  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    },
  ],

  // ── SERVICES ────────────────────────────────
  services: [
    { id:1, icon:'Camera',     name:'Lightroom Editing',  desc:'Custom preset creation, batch editing, exposure correction, color harmony and skin tone perfection for portraits and landscapes.',  tools:['Lightroom','Presets','RAW'] },
    { id:2, icon:'Wand2',      name:'AI Photo Editing',   desc:'AI-powered sky replacement, object removal, background generation, skin smoothing and scene enhancement at scale.',               tools:['Firefly','Luminar Neo','Topaz'] },
    { id:3, icon:'Video',      name:'Video Editing',       desc:'Reels, YouTube videos, wedding films and brand content. Tight pacing, music sync, transitions and cinematic storytelling.',        tools:['Premiere Pro','DaVinci','Final Cut'] },
    { id:4, icon:'Palette',    name:'Color Grading',       desc:'Cinematic LUT design, teal-orange grades, mood-driven color stories. Your footage gets the look of a Netflix film.',              tools:['DaVinci Resolve','LUTs'] },
    { id:5, icon:'Sparkles',   name:'Motion Graphics',     desc:'Animated titles, lower thirds, logo reveals, Instagram story templates and Reels graphics that demand attention.',                tools:['After Effects','Motion'] },
    { id:6, icon:'Smartphone', name:'Paid Promotions',     desc:'With 54K+ engaged followers, I offer product features, editing tutorials with your preset, and shoutout collaborations.',         tools:['Instagram','Collaborations'] },
  ],

  // ── TOOLS ───────────────────────────────────
  tools: [
    { id:1, name:'Lightroom',      cat:'Photo Editing',    level:98 },
    { id:2, name:'Photoshop',      cat:'Retouching',       level:90 },
    { id:3, name:'Premiere Pro',   cat:'Video Editing',    level:88 },
    { id:4, name:'DaVinci Resolve',cat:'Color Grading',    level:85 },
    { id:5, name:'After Effects',  cat:'Motion Graphics',  level:78 },
    { id:6, name:'AI Tools',       cat:'Firefly · Luminar',level:92 },
  ],

  // ── PROCESS ─────────────────────────────────
  process: [
    { id:1, name:'Brief',   desc:'You share your vision, references, mood board. I understand your style goals before touching anything.' },
    { id:2, name:'Review',  desc:"I assess your raw files — photo resolution, video quality, what's workable and what needs a reshoot." },
    { id:3, name:'Edit',    desc:'First pass delivered within the agreed timeline. Colour, grade, retouch — foundation laid precisely.' },
    { id:4, name:'Revise',  desc:'Your feedback. I refine. Up to 3 revision rounds included — because perfection is the standard.' },
    { id:5, name:'Deliver', desc:'Final exports in all formats — web, print, social. Organised file handoff with usage notes.' },
  ],

  // ── TESTIMONIALS ────────────────────────────
  testimonials: [
    { id:1, text:"The Lightroom editing completely transformed my travel photos. The tones, the mood — exactly what I wanted but couldn't express. Worth every rupee.", author:'Priya Sharma',    role:'Travel Blogger · Mumbai' },
    { id:2, text:'Our brand video went from decent to stunning. The color grade alone changed how people perceive our product. Serious talent here.',                    author:'Aryan Mehta',    role:'Founder · D2C Brand' },
    { id:3, text:'Got my wedding highlight reel and showed it 15 times in a row. The music sync, the cuts, the grade — cinematic is the only word. Thank you!',        author:'Rahul & Neha K.',role:'Wedding Clients · Ahmedabad' },
  ],

  // ── CONTACT ─────────────────────────────────
  contact: {
    label:       '08 — Let\'s Work',
    bigLine1:    'LET\'S',
    bigLine2:    'CREATE',
    bigLine3:    'TOGETHER.',
    description: 'DM me for paid editing, paid promotions, preset packs, and collaborations. Available worldwide, based in India.',
    igHandle:    '@photoediting_vibes',
    igLink:      'https://instagram.com/photoediting_vibes',
    email:       '',
    phone:       '',
  },

  // ── LINKS ───────────────────────────────────
  links: {
    instagram: 'https://instagram.com/photoediting_vibes',
    youtube:   '#',
    behance:   '#',
    linkedin:  '#',
    footerCopy:'© 2025 @photoediting_vibes · All Rights Reserved · India',
  },
};

// ── CRUD ───────────────────────────────────────────────────────
export function getSiteData() {
  try {
    const s = localStorage.getItem(SITE_KEY);
    if (s) {
      const parsed = JSON.parse(s);
      // Deep merge so new default keys are always present
      return deepMerge(DEFAULT_SITE, parsed);
    }
  } catch (_) {}
  return DEFAULT_SITE;
}

export function saveSiteData(data) {
  localStorage.setItem(SITE_KEY, JSON.stringify(data));
}

export function updateSection(section, value) {
  const data = getSiteData();
  const updated = { ...data, [section]: value };
  saveSiteData(updated);
  return updated;
}

function deepMerge(defaults, overrides) {
  const result = { ...defaults };
  for (const key of Object.keys(overrides)) {
    if (
      overrides[key] !== null &&
      typeof overrides[key] === 'object' &&
      !Array.isArray(overrides[key]) &&
      typeof defaults[key] === 'object' &&
      !Array.isArray(defaults[key])
    ) {
      result[key] = deepMerge(defaults[key], overrides[key]);
    } else {
      result[key] = overrides[key];
    }
  }
  return result;
}
