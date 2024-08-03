const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/products', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select();
    if (error) {
        res.status(500).send(error);
    } else {
        res.send(data);
    }
});

app.get('/products/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', req.params.id);
    if (error) {
        res.status(500).send(error);
    } else {
        res.send(data);
    }
});

app.post('/products', async (req, res) => {
    const { error } = await supabase
        .from('products')
        .insert({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        });
    if (error) {
        res.status(500).send(error);
    } else {
        res.send("Created!!");
    }
});

app.put('/products/:id', async (req, res) => {
    const { error } = await supabase
        .from('products')
        .update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        })
        .eq('id', req.params.id);
    if (error) {
        res.status(500).send(error);
    } else {
        res.send("Updated!!");
    }
});

app.delete('/products/:id', async (req, res) => {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', req.params.id);
    if (error) {
        res.status(500).send(error);
    } else {
        res.send("Deleted!!");
    }
});

app.get('/', (req, res) => {
    res.send("Hello, I am working with my friend Supabase <3");
});

app.get('*', (req, res) => {
    res.send("Hello again, I am working with my friend to the moon and beyond <3");
});

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});
