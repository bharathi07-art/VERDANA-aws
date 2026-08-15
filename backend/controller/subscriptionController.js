import Subscription from "../models/subscription.js";

export async function SubscriptionFn(req,res){
     const { email } = req.body;

    try{
        if(!email) {
            return res.status(400).json({message:"The subscription feild must not to be empty.."});
        }

        const isExist = await Subscription.findOne({where:{email}});

        if(isExist){
            return res.status(409).json({message:"You are already apart of ours, so don't try again, and thank you for already subscibed our products."})
        }

        const newEmail = await Subscription.create({email});
        res.status(200).json(newEmail)

    }catch(err){
         return res.status(500).json({
            error: err.message
        });
    };
}
