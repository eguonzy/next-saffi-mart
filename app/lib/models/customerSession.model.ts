import mongoose, { Types, models, model } from "mongoose";

export interface CustomerSessionInput {
  customer: Types.ObjectId;
  userAgent: string;
  valid: boolean;
}

export interface CustomerSessionDocument
  extends CustomerSessionInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const customerSessionSchema = new mongoose.Schema<CustomerSessionDocument>(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    valid: { type: Boolean, default: true },
    userAgent: String,
  },
  { timestamps: true }
);

export default models.CustomerSession ||
  model<CustomerSessionDocument>("CustomerSession", customerSessionSchema);
