import mongoose from "mongoose";

const item=new mongoose.Schema({
    inventoryId:{type:mongoose.Schema.Types.ObjectId,
        ref:"Inventory",required:true},
        productName:{type:String,required:true},
        sku:{type:String,required:true},
        quantity:{type:Number,required:true,min:1

        }},{_id:false});
const schema=new mongoose.Schema({
    
    reservationNumber:{type:String,required:true,unique:true,index:true},
    order:{type:mongoose.Schema.Types.ObjectId,
        ref:"Order",required:true,index:true},
        items:{type:[item],required:true,
            validate:v=>v.length>0},
            status:{type:String,enum:["Active","Released","Expired","Confirmed"],
                default:"Active",index:true},expiresAt:{type:Date,required:true,index:true},
                releasedAt:Date,confirmedAt:Date},
                {timestamps:true}
            );
schema.index({status:1,expiresAt:1});
export default mongoose.model("Reservation",schema);
