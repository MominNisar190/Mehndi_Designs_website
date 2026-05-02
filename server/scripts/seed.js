/**
 * Seed script — creates an admin user and sample designs
 * Run: node scripts/seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Design = require('../models/Design');

const sampleDesigns = [
  {
    title: 'Royal Bridal Full Hand',
    category: 'bridal',
    description: 'Intricate royal bridal mehndi covering the full hand with peacock motifs, paisleys, and fine detailing. Perfect for your wedding day.',
    price: 3500,
    timeRequired: 180,
    difficulty: 'expert',
    isFeatured: true,
    tags: ['bridal', 'royal', 'peacock', 'traditional'],
    images: [{ url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800', isPrimary: true }],
  },
  {
    title: 'Arabic Floral Pattern',
    category: 'arabic',
    description: 'Bold Arabic floral design with open spaces and geometric elements. Modern yet traditional.',
    price: 1200,
    timeRequired: 60,
    difficulty: 'medium',
    isFeatured: true,
    tags: ['arabic', 'floral', 'modern'],
    images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', isPrimary: true }],
  },
  {
    title: 'Minimal Finger Design',
    category: 'minimal',
    description: 'Clean, minimalist mehndi for the modern woman. Delicate lines and dots on fingers.',
    price: 500,
    timeRequired: 30,
    difficulty: 'easy',
    isFeatured: true,
    tags: ['minimal', 'modern', 'fingers'],
    images: [{ url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800', isPrimary: true }],
  },
  {
    title: 'Festive Half Hand',
    category: 'half-hand',
    description: 'Vibrant festive design perfect for Eid, Diwali, and celebrations. Covers wrist to mid-palm.',
    price: 800,
    timeRequired: 45,
    difficulty: 'medium',
    isFeatured: false,
    tags: ['festive', 'eid', 'diwali'],
    images: [{ url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800', isPrimary: true }],
  },
  {
    title: 'Traditional Full Hand',
    category: 'full-hand',
    description: 'Classic traditional mehndi with paisley patterns, flowers, and fine detailing from fingertips to wrist.',
    price: 2000,
    timeRequired: 120,
    difficulty: 'hard',
    isFeatured: true,
    tags: ['traditional', 'full-hand', 'classic'],
    images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', isPrimary: true }],
  },
  {
    title: 'Geometric Arabic',
    category: 'arabic',
    description: 'Modern geometric Arabic design with clean lines and bold patterns.',
    price: 1500,
    timeRequired: 75,
    difficulty: 'hard',
    isFeatured: false,
    tags: ['arabic', 'geometric', 'modern'],
    images: [{ url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800', isPrimary: true }],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@saniyamehndi.com' });
    if (!adminExists) {
      await User.create({
        name: 'Saniya Admin',
        email: 'admin@saniyamehndi.com',
        password: 'Admin@123',
        role: 'admin',
      });
      console.log('✅ Admin user created: admin@saniyamehndi.com / Admin@123');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create sample designs
    const existingCount = await Design.countDocuments();
    if (existingCount === 0) {
      // Add slugs manually to avoid pre-save hook issues on insertMany
      const designsWithSlugs = sampleDesigns.map((d) => ({
        ...d,
        slug: d.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now() + Math.floor(Math.random() * 1000),
      }));
      for (const design of designsWithSlugs) {
        await Design.create(design);
      }
      console.log(`✅ ${sampleDesigns.length} sample designs created`);
    } else {
      console.log(`ℹ️  ${existingCount} designs already exist, skipping`);
    }

    console.log('\n🎉 Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
