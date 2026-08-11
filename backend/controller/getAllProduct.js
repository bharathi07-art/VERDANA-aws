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
export async function deleteProduct(req,res){
    try{
        const {id} = req.params;

        const deleted = await Product.destroy({
            where:{id}
        });

        if(deleted == 0){
            res.status(404).json({message:"Can't fount the product to delete"})
        }

        return res.status(200).json({
            message:"Product delete successfully"
        });

    }catch(err){
        console.error("Error Message:",err.message)
    }
}