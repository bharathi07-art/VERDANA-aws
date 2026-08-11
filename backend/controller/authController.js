 import express from 'express';
 import bcrypt from 'bcrypt';
 import jwt from 'jsonwebtoken';
 import Admin from '../models/admin.js'
import { where } from 'sequelize';

 export async function login(req,res){
    const{username,password} = req.body;

    try{
        if(!username || !password){
        return res.status(400).json({message:"username and password required"});
    }

    const admin = await Admin.findOne({where:{username}});
    if(!admin){
        return res.status(401).json({message:"Invalid credential"});
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if(!isValid){
        return res.status(401).json({message:"Invalid credentials"})
    }

    const token = jwt.sign(
        {adminId: admin._id, username:admin.username},
        process.env.JWT_Secret,
        {expiresIn:"2h"}
    );

    res.json({token});
    }catch(err){
        res.status(500).json({message:err.message})
    }
 }

