// scripts/generate-hash.js
const bcrypt = require("bcryptjs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Enter password to hash: ", async (pw) => {
  const hash = await bcrypt.hash(pw, 10);
  console.log("\n✅ Hash:\n", hash);
  readline.close();
});
