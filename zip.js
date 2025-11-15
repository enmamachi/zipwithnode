const { ipcRenderer } = require('electron');

document.getElementById('browseFolder').addEventListener('click', async () => {
  const folderPath = await ipcRenderer.invoke('select-folder');
  if (folderPath) {
    document.getElementById('folderPath').value = folderPath;
  }
});

document.getElementById('browseZip').addEventListener('click', async () => {
  const zipPath = await ipcRenderer.invoke('select-zip-output');
  if (zipPath) {
    document.getElementById('zipPath').value = zipPath;
  }
});

document.getElementById('compress').addEventListener('click', async () => {
  const folderPath = document.getElementById('folderPath').value;
  const zipPath = document.getElementById('zipPath').value;
  const status = document.getElementById('status');

  if (!folderPath || !zipPath) {
    status.textContent = 'Pilih folder dan lokasi output terlebih dahulu.';
    status.style.color = 'red';
    return;
  }

  status.textContent = 'Mengompresi...';
  status.style.color = 'blue';

  const result = await ipcRenderer.invoke('compress-folder', folderPath, zipPath);
  status.textContent = result.message;
  status.style.color = result.success ? 'green' : 'red';
});
