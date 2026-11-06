import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

async function generateProjectZip() {
  const zip = new JSZip();
  const rootDir = process.cwd();

  const ignoreDirs = new Set(['node_modules', '.git', 'dist', '.cache', '.npm']);
  const ignoreFiles = new Set(['nexbank-agentic-cs-system.zip', '.DS_Store']);

  function addDirectory(currentPath: string, zipFolder: JSZip) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      if (ignoreDirs.has(item) || ignoreFiles.has(item) || item.startsWith('.')) {
        if (item !== '.env.example') continue;
      }

      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const subFolder = zipFolder.folder(item);
        if (subFolder) {
          addDirectory(fullPath, subFolder);
        }
      } else {
        const fileData = fs.readFileSync(fullPath);
        zipFolder.file(item, fileData);
      }
    }
  }

  console.log('Packaging full project files into nexbank-agentic-cs-system.zip...');
  addDirectory(rootDir, zip);

  const zipBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  const outputPath = path.join(rootDir, 'nexbank-agentic-cs-system.zip');
  fs.writeFileSync(outputPath, zipBuffer);
  console.log(`✓ Project zip successfully created at ${outputPath} (${(zipBuffer.length / 1024).toFixed(1)} KB)`);
}

generateProjectZip().catch((err) => {
  console.error('Failed to create project zip:', err);
  process.exit(1);
});
