const { ZipFile } = require('zip-lib');
const fs = require('fs');
const path = require('path');

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

// Konfigurasi
const folderPath = path.join('D:', 'project', 'bukapasszip', 'b');
const zipFilePath = path.join('D:', 'project', 'bukapasszip', 'b.zip');
const password = 'abcd';

// Pastikan folder yang akan dikompresi ada
if (fs.existsSync(folderPath)) {
  compressFolder(folderPath, zipFilePath, password);
} else {
  console.error(`Folder tidak ditemukan: ${folderPath}`);
}
