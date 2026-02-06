const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({path:'.env.local'});

async function fix() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const Admin = mongoose.model('Admin', new mongoose.Schema({
    email: String,
    password: String,
    resetToken: String,
    resetTokenExpiry: Date
  }));
  
  // Delete old admins
  await Admin.deleteMany({});
  console.log('🗑️  Cleared old admins');
  
  // Create ADMIN 1
  const hash1 = await bcrypt.hash('azerty123', 10);
  await Admin.create({
    email: 'zakariazerari042@gmail.com',
    password: hash1,
    resetToken: null,
    resetTokenExpiry: null
  });
  console.log('✅ ADMIN 1 CREATED');
  console.log('   📧 Email: zakariazerari042@gmail.com');
  console.log('   🔑 Password: azerty123\n');
  
  // Create ADMIN 2
  const hash2 = await bcrypt.hash('Admin123456', 10);
  await Admin.create({
    email: 'edenmedtrans@gmail.com',
    password: hash2,
    resetToken: null,
    resetTokenExpiry: null
  });
  console.log('✅ ADMIN 2 CREATED');
  console.log('   📧 Email: edenmedtrans@gmail.com');
  console.log('   🔑 Password: Admin123456\n');
  
  console.log('═══════════════════════════════════');
  console.log('✅ SUCCESS - 2 ADMINS CREATED!');
  console.log('═══════════════════════════════════');
  
  process.exit(0);
}

fix();      