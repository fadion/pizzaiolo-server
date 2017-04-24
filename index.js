var restify = require('restify');
var app = restify.createServer({
    name: 'pizzaiolo',
    version: '1.0.0'
});

app.use(restify.gzipResponse());
app.use(restify.queryParser());

var data = {
    pizza: require('./data/pizza.json'),
    category: require('./data/category.json'),
    featured: require('./data/featured.json')
};

/* <ROUTES> */

app.get('/pizza', function(req, res) {
    res.send({pizza: data.pizza});
});

app.get('/pizza/:id', function(req, res) {
    var item = data.pizza.filter(function(item) {
        return item.id == req.params.id;
    });

    item.length ? res.send({pizza: item}) : res.send(404, new Error('No pizza found'));
});

app.get('/categories', function(req, res) {
    res.send({category: data.category});
});

app.get('/categories/:id', function(req, res) {
    var item = data.category.filter(function(item) {
        return item.id == req.params.id;
    });

    item.length ? res.send({category: item}) : res.send(404, new Error('No category found'));
});

app.get('/featured', function(req, res) {
    res.send({featured: data.featured});
});

app.get(/\/photos\/?.*/, restify.serveStatic({
    directory: __dirname
}));

/* </ROUTES> */

app.listen(3000);