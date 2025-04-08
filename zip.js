const inquirer = require('inquirer').default;
const fs = require('fs');
const path = require('path');
const zip = require('zip-a-folder');

async function compressFolder(folderPath, zipFilePath) {
  try {
    // Kompres folder
    await zip.zip(folderPath, zipFilePath);

    console.log(`Folder ${folderPath} telah dikompresi menjadi ${zipFilePath}`);
  } catch (err) {
    console.error('Terjadi kesalahan saat mengompres folder:', err);
  }
}

// Tampilkan dialog pilihan folder
inquirer.prompt([
  {
    type: 'input',
    name: 'folderPath',
    message: 'Masukkan path folder:',
  },
]).then(answers => {
  const folderPath = answers.folderPath;
  const zipFilePath = path.join(folderPath, 'output.zip');

  // Pastikan folder yang akan dikompresi ada
  if (fs.existsSync(folderPath)) {
    compressFolder(folderPath, zipFilePath);
  } else {
    console.error(`Folder tidak ditemukan: ${folderPath}`);
  }
});
