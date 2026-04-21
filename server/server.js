import app from './app.js';
import connectDB from './config/db.js';

// Render injects env vars directly, so dotenv is optional there.
try {
  const dotenv = await import('dotenv');
  dotenv.config();
} catch {
  // Ignore when dotenv is unavailable in production runtime.
}

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
