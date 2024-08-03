const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();


// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const supabase = supabaseClient.createClient({
  apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptbWN0cWl2Zmh5aWRnY21jb3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2ODM5NjIsImV4cCI6MjAzODI1OTk2Mn0.YTsQPlRevSPivvEAsNJsFSpkto15aYS-IGWL-tWtWio', // public key
  project: 'zmmctqivfhyidgcmcoum' // project id
});

app.get('/products', async (req, res) => {
    const {data, error} = await supabase
        .from('products')
        .select()
    res.send(data);
});

app.get('/products/:id', async (req, res) => {
    const {data, error} = await supabase
        .from('products')
        .select()
        .is('id', req.params.id)
    res.send(data);
});

app.post('/products', async (req, res) => {
    const {error} = await supabase
        .from('products')
        .insert({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        })
    if (error) {
        res.send(error);
    }
    res.send("created!!");
});

app.put('/products/:id', async (req, res) => {
    const {error} = await supabase
        .from('products')
        .update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        })
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("updated!!");
});

app.delete('/products/:id', async (req, res) => {
    const {error} = await supabase
        .from('products')
        .delete()
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("deleted!!")

});

app.get('/', (req, res) => {
    res.send("Hello I am working my friend Supabase <3");
});

app.get('*', (req, res) => {
    res.send("Hello again I am working my friend to the moon and behind <3");
});

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});