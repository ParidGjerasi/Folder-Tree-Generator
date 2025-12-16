const fs = require("fs");
const path = require("path");

const targetDir = process.argv[2] || process.cwd();
const rootDir = path.resolve(targetDir);  

function generateTree(dir, indent = "") {
  const items = fs.readdirSync(dir);
  

  const filteredItems = items.filter(item => item !== '.git');

  filteredItems.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isLast = index === filteredItems.length - 1;
    const prefix = isLast ? "└─ " : "├─ ";

    console.log(indent + prefix + item);

    if (fs.statSync(fullPath).isDirectory()) {
      const newIndent = indent + (isLast ? "   " : "│  ");
      generateTree(fullPath, newIndent);
    }
  });
}

generateTree(rootDir);