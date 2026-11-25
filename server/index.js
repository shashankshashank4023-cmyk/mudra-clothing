import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`===============================================`);
  console.log(`🏛️ MUDRA Haute Menswear Full-Stack Server Live`);
  console.log(`📡 Local Port: http://localhost:${PORT}`);
  console.log(`🌐 API Endpoint: http://localhost:${PORT}/api/products`);
  console.log(`📊 Admin API: http://localhost:${PORT}/api/admin/analytics`);
  console.log(`===============================================`);
});
