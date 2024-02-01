const fileInput = document.getElementById('fileInput');
const status = document.getElementById('status');
const downloadLink = document.getElementById('downloadLink');

fileInput.addEventListener('change', (event) => {
	const file = event.target.files[0];
	status.textContent = `Downloading file...`;
	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/upload');
	const formData = new FormData();
	formData.append('file', file);
	xhr.upload.onprogress = (event) => {
		if (event.lengthComputable) {
			status.textContent = `Downloading file... ${Math.round(event.loaded / event.total * 100)}%`;
		}
	};
	xhr.onload = () => {
		if (xhr.status === 200) {
			status.textContent = `File downloaded successfully.`;
			downloadLink.href = `/download/${file.name}`;
			downloadLink.download = file.name;
			downloadLink.click();
		} else {
			status.textContent = `Error downloading file: ${xhr.statusText}`;
		}
	};
	xhr.send(formData);
});
