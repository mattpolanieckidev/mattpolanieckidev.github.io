const express = require('express');
const app = express();
const port = 3000;

// serve
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log('server running')
})
