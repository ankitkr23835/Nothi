const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.json({ status: 'success', message: 'File uploaded successfully!' });
    } else {
        res.json({ status: 'error', message: 'Please choose a file.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
