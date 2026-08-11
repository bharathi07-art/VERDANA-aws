import Product from "../models/product.js";

export async function getAllProducts(req,res){

    try{
        const product = await Product.findAll({
            where:{status:"draft"},
            order:[["createdAt", "DESC"]],
        })

        res.json(product);
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

export async function getProductById(req, res){
    try{
     
        const product = await Product.findByPk(req.params.id);

        if(!product){
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}