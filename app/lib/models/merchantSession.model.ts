import mongoose, { Types, models, model } from "mongoose";

export interface MerchantSessionInput {
  merchant: Types.ObjectId;
  userAgent: string;
  valid: boolean;
}

export interface MerchantSessionDocument
  extends MerchantSessionInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const merchantSessionSchema = new mongoose.Schema<MerchantSessionDocument>(
  {
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
    },
    valid: { type: Boolean, default: true },
    userAgent: String,
  },
  { timestamps: true }
);

export default models.MerchantSession ||
  model<MerchantSessionDocument>("MerchantSession", merchantSessionSchema);
