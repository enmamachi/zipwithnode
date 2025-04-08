const inquirer = require('inquirer').default;
const fs = require('fs');
const path = require('path');
const { ZipFile } = require('zip-lib');

async function compressFolder(folderPath, zipFilePath, password) {
  try {
    // Buat instance ZipFile
    const zip = new ZipFile();

    // Tambahkan folder ke dalam zip
    await zip.addFolder(folderPath);

    // Set password untuk zip
    zip.setPassword(password);

    // Simpan zip ke file
    await zip.saveAs(zipFilePath);

    console.log(`Folder ${folderPath} telah dikompresi menjadi ${zipFilePath} dengan password: ${password}`);
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
  const password = 'abcd';

  // Pastikan folder yang akan dikompresi ada
  if (fs.existsSync(folderPath)) {
    compressFolder(folderPath, zipFilePath, password);
  } else {
    console.error(`Folder tidak ditemukan: ${folderPath}`);
  }
});
