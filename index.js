const express = require('express');
const { sequelize, connectDB } = require('./db/database');
require('dotenv').config();
const cors = require ('cors');


const app = express();


app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());
const PORT = process.env.PORT || 3000; 


app.use('/uploads',express.static('uploads'));
app.get('/', (req, res) => {
    res.send('Backend chali');
});

app.get('/contact', (req, res) => {
    res.send('Contact');
});

app.get('/about', (req, res) => {
    res.send('About');
});

app.use('/api/user', require('./route/route'));
app.use('/api/test', require('./route/testRoute'));


app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});


const startServer = async () => {
    try {
        await connectDB();
        await sequelize.sync({ alter: true });
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();