const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Set up SQLite database
let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS feedbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    insights TEXT,
    improvements TEXT,
    likes TEXT,
    relevance TEXT,
    suggestions TEXT
)`);

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to submit feedback
app.post('/submit-feedback', (req, res) => {
    let feedback = req.body;
    db.run(`INSERT INTO feedbacks (insights, improvements, likes, relevance, suggestions) VALUES (?, ?, ?, ?, ?)`,
        [feedback.insights, feedback.improvements, feedback.likes, feedback.relevance, feedback.suggestions],
        (err) => {
            if (err) {
                return console.error(err.message);
            }
            res.sendStatus(200);
        }
    );
});

// Endpoint to get feedbacks
app.get('/get-feedbacks', (req, res) => {
    db.all(`SELECT * FROM feedbacks`, [], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar feedbacks:', err);
            res.status(500).json({ error: 'Ocorreu um erro ao buscar os feedbacks.' });
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
