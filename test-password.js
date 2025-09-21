// test-password.js
const bcrypt = require("bcryptjs");

// 👇 بدّل هد السطرين حسب الحاجة
const plainPassword = "AZERTY"; // الكود لي كيدخل فـ الفورم
const hashedPassword = "$2b$10$gVPzYF63zoo01fPaiaaOJeQfxgcvj98i76Tt58jgN0mTXN5R04l9a"; // من .env

bcrypt.compare(plainPassword, hashedPassword)
  .then((result) => {
    console.log("✅ Password match:", result); // true ولا false
  })
  .catch((err) => {
    console.error("❌ Error:", err);
  });
