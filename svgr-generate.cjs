const { exec } = require("shelljs");
const fs = require("fs");
const path = require("path");

const SVG_DIR = path.resolve(__dirname, "public/svgs");
const OUTPUT_DIR = path.resolve(__dirname, "src/assets/svgs");
const INDEX_FILE = path.join(OUTPUT_DIR, "index.tsx");

// SVGR 실행
exec(
  `npx @svgr/cli -d ${OUTPUT_DIR} --ignore-existing --typescript --no-dimensions ${SVG_DIR}`,
  (code, stdout, stderr) => {
    if (code !== 0) {
      console.error("SVGR 명령 실패:", stderr);
      process.exit(code);
    }
    generateIndexFile();
  }
);

// index.tsx 파일 생성
function generateIndexFile() {
  fs.readdir(OUTPUT_DIR, (err, files) => {
    if (err) {
      console.error("디렉토리 읽기 실패:", err);
      process.exit(1);
    }

    const exportStatements = files
      .filter((file) => file.endsWith(".tsx") && file !== "index.tsx") // index.tsx 제외
      .map((file) => {
        const name = path.basename(file, ".tsx");
        return `export { default as ${name} } from "./${name}";`;
      })
      .join("\n");

    fs.writeFile(INDEX_FILE, exportStatements, (writeErr) => {
      if (writeErr) {
        console.error("index.tsx 작성 실패:", writeErr);
        process.exit(1);
      }
      console.log("index.tsx 생성 성공");
    });
  });
}
