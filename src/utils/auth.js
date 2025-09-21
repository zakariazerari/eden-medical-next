import bcrypt from "bcryptjs";

// ⚠️ ها هنا كنديروهم ثابتين بلا .env
const ADMIN_EMAIL = "admin@eden.com";
// هاش ديال "123456"
const ADMIN_PASSWORD_HASH = "$2b$10$3yLznd.qNgOzYHHrFyf9qOtvKqMPq/ItK9hIQA/ZZTsmOPNNEPuwG";

export async function verifyAdmin(email, password) {
  console.log("📥 email from form:", email);

  if (email !== ADMIN_EMAIL) {
    console.log("❌ Email mismatch");
    return false;
  }

  try {
    const match = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    console.log("🔐 Password match:", match);
    return match;
  } catch (err) {
    console.error("❌ Error comparing password:", err);
    return false;
  }
}
