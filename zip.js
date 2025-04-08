const { ZipFile } = require('zip-lib');
const fs = require('fs');
const path = require('path');

async function compressFolder(folderPath, zipFilePath, password) {
    // Buat instance ZipFile
    const zip = new ZipFile();

    // Tambahkan folder ke dalam zip
    await zip.addFolder(folderPath);

    // Set password untuk zip
    zip.setPassword(password);

    // Simpan zip ke file
    await zip.saveAs(zipFilePath);
    console.log(`Folder ${folderPath} telah dikompresi menjadi ${zipFilePath} dengan password: ${password}`);
}

// Konfigurasi
const folderPath = 'D:\\project\\bukapasszip\\b'; // Ganti dengan path folder Anda
const zipFilePath = 'D:\\project\\bukapasszip\\b.zip'; // Ganti dengan path output ZIP Anda
const password = 'abcd'; // Ganti dengan password 4 karakter huruf kecil

// Pastikan folder yang akan dikompresi ada
if (fs.existsSync(folderPath)) {
    compressFolder(folderPath, zipFilePath, password).catch(console.error);
} else {
    console.error(`Folder tidak ditemukan: ${folderPath}`);
}
