const express = require('express');

//create a new express app
var app = express();

//Http route handlers
//HTTP GET
app.get('/', (request, response) => {
    // response.send('<h3>Hello Express!</h3>');

    //convert to JSON automatically
    response.send({
        name: 'Malaka',
        likes: [
            'bikes',
            'cameras',
            'songs'
        ]
    });
});

app.get('/about', (request, response) => {
    response.send('About page');
});
app.get('/error', (request, response) => {
    response.send({
        errorMessage: 'error occured'
    });
});

//App starts listenning
app.listen(3000);
