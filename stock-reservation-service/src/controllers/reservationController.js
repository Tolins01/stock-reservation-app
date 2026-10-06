import Reservation from "../models/Reservation.js";
import {createReservation,releaseReservation,releaseExpiredReservations} from "../services/reservationService.js";

export async function getReservations(req,res){
    const filter={};if(req.query.status)filter.status=req.query.status;
    const data=await Reservation.find(filter).populate("order").sort({createdAt:-1});
    res.json({success:true,count:data.length,data});
}

export async function getReservation(req,res){ 
    const data=await Reservation.findById(req.params.id).populate("order");
    if(!data)return res.status(404).json({success:false,message:"Reservation not found"});
    res.json({success:true,data});
}

export async function createReservationController(req,res){
    const data=await createReservation(req.body);
    res.status(201).json({success:true,message:"Reservation created",data});
}

export async function releaseReservationController(req,res){
    const data=await releaseReservation(req.params.id);
    res.json({success:true,message:"Reservation released and stock returned",data});
}

export async function releaseExpiredController(req,res){
    const releasedCount=await releaseExpiredReservations();
    res.json({success:true,message:`${releasedCount} expired reservation(s) released`,releasedCount});
}
