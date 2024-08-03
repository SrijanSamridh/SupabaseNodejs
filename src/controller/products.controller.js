const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const getProducts =  async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select();
    if (error) {
        res.status(500).send(error);
    } else {
        res.send(data);
    }
}

const getProductByID = async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', req.params.id);
    if (error) {
        res.status(500).send(error);
    } else {
        res.send(data);
    }
}

const addProduct = async (req, res) => {
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
}

const updateProductByID = async (req, res) => {
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
}

const deleteProductByID = async (req, res) => {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', req.params.id);
    if (error) {
        res.status(500).send(error);
    } else {
        res.send("Deleted!!");
    }
}

module.exports = {
    getProducts,
    getProductByID,
    addProduct,
    updateProductByID,
    deleteProductByID
}