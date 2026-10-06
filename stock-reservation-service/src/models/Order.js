import mongoose from "mongoose";

const item=new mongoose.Schema({
    inventoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Inventory",
        required:true},
        productName:{
            type:String,
            required:true
        },sku:{
            type:String,
            required:true
        },quantity:{
            type:Number,
            required:true,
            min:1},
            unitPrice:{
                type:Number,
                default:0,
                min:0}
            },{_id:false});

const schema = new mongoose.Schema({
    orderNumber:{type:String,required:true,unique:true,index:true},
    customer:{name:{type:String,required:true,trim:true},
    email:{type:String,trim:true,lowercase:true}},
    items:{type:[item],required:true,
        validate:v=>v.length>0},
        status:{type:String,
            enum:["Pending","Processing","Shipped","Delivered","Cancelled"],default:"Pending"
        },
        reservationStatus:{type:String,enum:["None","Active","Released","Expired","Confirmed"],
            default:"None"
        },
        totalAmount:{
            type:Number,default:0,min:0
        }},{timestamps:true}
    );
export default mongoose.model("Order",schema);
