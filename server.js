const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

//create a new express app
var expressApp = express();

expressApp.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().toString();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

// maintenance page

let maintananceflag = false;

expressApp.use((req, resp, next) => {
    if (maintananceflag === true) {
        resp.render('maintenance.hbs');
    } else {
        next();
    }
});

//static conten
expressApp.use(express.static(__dirname + '/public'));


//Middlewar
expressApp.use((req, res, next) => {
    let now = new Date().toString();
    let log = now + " : " + req.method + " : " + req.url;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });

    if (req.path === '/info') {
        res.send('http method ' + JSON.stringify(req.headers));
    }

    next();  //App contunue to run
})



//Http route handlers
//HTTP GE
expressApp.get('/', (request, response) => {
    // response.send('<h3>Hello Express!</h3>');

    //convert to JSON automatically
    // response.send({
    //     name: 'Malaka',
    //     likes: [
    //         'bikes',
    //         'cameras',
    //         'songs'
    //     ]
    // });

    response.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome'
    });
});
expressApp.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});
expressApp.get('/error', (request, response) => {
    response.send({
        errorMessage: 'error occured'
    });
});

//App starts listennin
expressApp.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
