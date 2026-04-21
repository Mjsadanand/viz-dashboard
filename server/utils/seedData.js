import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Insight from '../models/Insight.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await Insight.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Read JSON file
    const jsonPath = path.join(__dirname, '..', '..', 'jsondata.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    // Insert data
    await Insight.insertMany(jsonData);
    console.log(`✅ Successfully seeded ${jsonData.length} records`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error.message);
    process.exit(1);
  }
};

seedData();
