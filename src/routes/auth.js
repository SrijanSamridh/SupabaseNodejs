const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const signIn = async (req, res) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });

    if (error) {
        res.status(500).send(error.message);
    } else {
        res.redirect(data.url);
    }
};

const callback = async (req, res) => {
    const { access_token } = req.query;
    if (!access_token) {
        return res.status(400).send('Access token not provided');
    }

    const { user, session, error } = await supabase.auth.setSession({ access_token });

    if (error) {
        res.status(500).send(error.message);
    } else {
        res.send(`Hello, ${user.email}`);
    }
};

const authRoute = express.Router();

authRoute.get('/signin', signIn);
authRoute.get('/callback', callback);

module.exports = authRoute;
