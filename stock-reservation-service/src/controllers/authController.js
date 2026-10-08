import User from "../models/User.js";
import { createAccessToken } from "../utils/auth.js";
import { notify } from "../services/notificationService.js";

const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name?.trim() || !email?.trim() || !password) return res.status(400).json({ success:false, message:"Name, email and password are required" });
  if (!validEmail(email)) return res.status(400).json({ success:false, message:"Please provide a valid email address" });
  if (password.length < 8) return res.status(400).json({ success:false, message:"Password must be at least 8 characters" });
  const normalizedEmail=email.toLowerCase().trim();
  if (await User.findOne({email:normalizedEmail})) return res.status(409).json({success:false,message:"An account with this email already exists"});
  const user=await User.create({name:name.trim(),email:normalizedEmail,password,role:"staff"});
  await notify(user,{type:"success",title:"Welcome to Stock Reservation Service",message:"Your account was created successfully."});
  res.status(201).json({success:true,message:"Account created successfully",data:{user:user.toSafeObject(),token:createAccessToken(user)}});
}

export async function login(req,res){
  const {email,password}=req.body;
  if(!email||!password) return res.status(400).json({success:false,message:"Email and password are required"});
  const user=await User.findOne({email:email.toLowerCase().trim()}).select("+password");
  if(!user||!user.isActive||!(await user.comparePassword(password))) return res.status(401).json({success:false,message:"Invalid email or password"});
  res.json({success:true,message:"Login successful",data:{user:user.toSafeObject(),token:createAccessToken(user)}});
}

export async function getMe(req,res){res.json({success:true,data:{user:req.user.toSafeObject()}});}

export async function updateMe(req,res){
  const {name}=req.body;
  if(!name?.trim()) return res.status(400).json({success:false,message:"Name is required"});
  req.user.name=name.trim();
  await req.user.save();
  res.json({success:true,message:"Profile updated successfully",data:{user:req.user.toSafeObject()}});
}
