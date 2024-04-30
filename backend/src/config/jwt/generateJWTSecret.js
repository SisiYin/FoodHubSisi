const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const generateJWTSecret = () => {
  // Generate a new JWT_SECRET
  const JWT_SECRET = crypto.randomBytes(32).toString("hex");
  console.log("JWT_SECRET: ", JWT_SECRET);
  // Construct the new line to be added or updated in the .env file
  const newLine = `JWT_SECRET=${JWT_SECRET}\n`;

  // Get the path to the .env file
  const envFilePath = path.resolve(__dirname, "../dotenv/.env");

  // Read the existing .env file
  fs.readFile(envFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading .env file:", err);
      return;
    }

    // Check if JWT_SECRET already exists in the .env file
    if (data.includes("JWT_SECRET")) {
      // If JWT_SECRET exists, replace its value with the new one
      const updatedData = data.replace(/JWT_SECRET=.*/, newLine);
      fs.writeFileSync(envFilePath, updatedData);
    } else {
      // If JWT_SECRET doesn't exist, append the new line to the .env file
      fs.appendFileSync(envFilePath, newLine);
    }

    console.log("JWT secret generated and saved to .env file.");
  });
};

module.exports = { generateJWTSecret };
