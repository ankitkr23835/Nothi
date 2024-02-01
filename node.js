const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    const uniqueName = Date.now() + '-' + file.originalname;
    const newPath = path.join(__dirname, 'uploads', uniqueName);
    fs.rename(file.path, newPath, (err) => {
        if (err) {
            return res.status(500).send('Error moving file.');
        }
        res.send('File uploaded successfully.');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
