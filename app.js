const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

app = express();
const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {});
        app.listen(PORT, () => {
            console.log(`App started on port ${PORT}`)
        })
    } catch (e) {
        console.log('server ERROR: ', e.message);
        process.exit(1);
    }
}

start();


