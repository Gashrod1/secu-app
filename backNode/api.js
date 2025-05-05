const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express')
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express()
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ error: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        req.user = decoded;
        next();
    });
};

app.use(express.json());

app.post('/users', async (req, res) => {
    const { email, password, firstName, lastName, country } = req.body;
    if (!email || !password || !firstName || !lastName || !country) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (email, password, firstName, lastName, country) VALUES (?, ?, ?, ?, ?)';
        const values = [email, encryptedPassword, firstName, lastName, country];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error inserting user into database:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            const createdUser = {
                email,
                password: encryptedPassword,
                firstName,
                lastName,
                country,
                _id: result.insertId
            };
            res.status(201).json(createdUser);
        });
    } catch (error) {
        console.error('Error encrypting password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/auth/login', async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h', algorithm: 'HS256' }
        );

        const updateQuery = 'UPDATE users SET token = ? WHERE id = ?';
        db.query(updateQuery, [token, user.id], (err) => {
            if (err) {
                console.error('Error updating user token in database:', err);
                return res.status(500).json({ error: 'Database error' });
            }
        });

        res.status(200).json({"access_token": token });
    });

})

app.get('/users', verifyToken, (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json(results);
    });
});

const server = http.createServer(app);





server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});