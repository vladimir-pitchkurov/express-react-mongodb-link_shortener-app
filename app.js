const express = require('express');
const config = require('config')

app = express();
const PORT = config.get('port') || 5000;

app.listen(PORT, () => {
    console.log('App started!')
})