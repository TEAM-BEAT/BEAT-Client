const fs = require("fs");
const path = require("path");

// 명령어 인수로 파일 확장자와 폴더 이름을 받음
const fileExtension = process.argv[2];
const folderName = process.argv[3];

if (!fileExtension || !folderName) {
  console.error("파일 확장자와 폴더 이름을 입력하세요.");
  process.exit(1);
}

const TARGET_DIR = path.resolve(__dirname, folderName);
const INDEX_FILE = path.join(TARGET_DIR, "index.ts");

// 하위 디렉토리의 모든 지정된 확장자의 파일을 찾는 함수
function getAllFiles(dirPath, extension) {
  let filesList = [];

  function readDirectory(directory) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        readDirectory(fullPath);
      } else if (file.endsWith(extension) && !file.includes(".stories")) {
        filesList.push(fullPath);
      }
    });
  }

  readDirectory(dirPath);
  return filesList;
}

function generateIndexFileForDirectory(dirPath, extension) {
  const files = getAllFiles(dirPath, extension);

  const exportStatements = files
    .map((file) => {
      const relativePath = path.relative(dirPath, file);
      const name = path.basename(file, extension);
      return `export { default as ${name} } from "./${relativePath.replace(/\\/g, "/")}";`;
    })
    .join("\n");

  fs.writeFile(INDEX_FILE, exportStatements, (writeErr) => {
    if (writeErr) {
      console.error(`index.ts 작성 실패: ${INDEX_FILE}`, writeErr);
      process.exit(1);
    } else {
      console.log(`index.ts 생성 성공: ${INDEX_FILE}`);
    }
  });
}

generateIndexFileForDirectory(TARGET_DIR, fileExtension);
