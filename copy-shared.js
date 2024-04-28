const fs = require("fs-extra");
const path = require("path");

// Define source and destination directories
const sourceDir = path.join(__dirname, "shared");
const destinations = [
  path.join(__dirname, "expo", "common"),
  path.join(__dirname, "firebase", "functions", "src", "common"),
];

// Function to copy the shared folder to each destination as 'common'
async function copyShared() {
  try {
    for (const destination of destinations) {
      await fs.copy(sourceDir, destination);
      console.log(`Copied 'shared' to '${destination}' successfully.`);
    }
  } catch (err) {
    console.error("Error copying shared directory:", err);
  }
}

// Run the copy function
copyShared();
