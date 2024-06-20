const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/register', upload.single('photo'), (req, res) => {
    const { name, idNumber, address } = req.body;
    const photo = req.file;

    if (!name || !idNumber || !address || !photo) {
        return res.json({ success: false });
    }

    // Here, you would typically save the user details and photo to a database.
    // For the sake of simplicity, we are skipping that step.

    res.json({ success: true });
});

app.post('/vote', (req, res) => {
    const { party } = req.body;

    if (!party) {
        return res.json({ success: false });
    }

    // Here, you would typically save the vote to a database.
    // For the sake of simplicity, we are skipping that step.

    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
