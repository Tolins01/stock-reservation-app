import mongoose from "mongoose";

const schema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  name: { type: String, required: true, trim: true },
  sku: { type: String, required: true, unique: true, uppercase: true, trim: true },
  totalStock: { type: Number, required: true, min: 0 },
  reservedStock: { type: Number, default: 0, min: 0 }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => { delete ret.__v; return ret; }
  }
});

schema.virtual("availableStock").get(function () {
  return this.totalStock - this.reservedStock;
});
schema.index({ name: "text", sku: "text" });

export default mongoose.model("Inventory", schema);
