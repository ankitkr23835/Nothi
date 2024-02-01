function uploadAndExtract() {
  const zipFile = document.getElementById('zip_file').files[0];
  const zip = new JSZip();
  const downloadLink = document.getElementById('download_link');

  if (!zipFile) {
    alert('Please select a .zip file to upload.');
    return;
  }

  JSZip.loadAsync(zipFile).then(function (zip) {
    const zipFilename = zipFile.name;
    const extractedFolder = zipFilename.slice(0, -4);
    const extractedFiles = zip.files;

    Object.keys(extractedFiles).forEach(function (filename) {
      const file = extractedFiles[filename];
      const blob = new Blob([file.asUint8Array()], { type: 'application/octet-stream' });
      const blobUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = filename;
      downloadLink.textContent = 'Download ' + filename;
      document.body.appendChild(downloadLink);
    });

    downloadLink.style.display = 'block';
  });
        }
