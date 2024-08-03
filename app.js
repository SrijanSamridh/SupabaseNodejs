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

app.get('/', (req, res) => {
    res.send("Hello, I am working with my friend Supabase <3");
});

app.use("/api/products", require("./src/routes/products.js"))
    .use("/api/auth", require("./src/routes/auth.js"));

app.get('*', (req, res) => {
    res.send("Hello again, I am working with my friend Srijan to the moon and beyond <3");
});

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});
