const { exec } = require("shelljs");
const fs = require("fs");
const path = require("path");

const SVG_DIR = path.resolve(__dirname, "public/svgs");
const OUTPUT_DIR = path.resolve(__dirname, "src/assets/svgs");
const INDEX_FILE = path.join(OUTPUT_DIR, "index.tsx");

// Run SVGR
exec(
  `npx @svgr/cli -d ${OUTPUT_DIR} --ignore-existing --typescript --no-dimensions ${SVG_DIR}`,
  (code, stdout, stderr) => {
    if (code !== 0) {
      console.error("SVGR command failed:", stderr);
      process.exit(code);
    }
    deleteIndexTs();
    generateIndexFile();
  }
);

// Delete index.ts if it exists
function deleteIndexTs() {
  const indexTsPath = path.join(OUTPUT_DIR, "index.ts");
  if (fs.existsSync(indexTsPath)) {
    fs.unlinkSync(indexTsPath);
  }
}

// Generate index.tsx
function generateIndexFile() {
  fs.readdir(OUTPUT_DIR, (err, files) => {
    if (err) {
      console.error("Failed to read directory:", err);
      process.exit(1);
    }

    const exportStatements = files
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => {
        const name = path.basename(file, ".tsx");
        return `export { default as ${name} } from "./${name}";`;
      })
      .join("\n");

    fs.writeFile(INDEX_FILE, exportStatements, (writeErr) => {
      if (writeErr) {
        console.error("Failed to write index.tsx:", writeErr);
        process.exit(1);
      }
      console.log("index.tsx generated successfully");
    });
  });
}
