import mongoose, { Types, models } from "mongoose";

export interface AdminSessionInput {
  admin: Types.ObjectId;
  userAgent: string;
  valid: boolean;
}

export interface AdminSessionDocument
  extends AdminSessionInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const adminSessionSchema = new mongoose.Schema<AdminSessionDocument>(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    valid: { type: Boolean, default: true },
    userAgent: String,
  },
  { timestamps: true }
);

export default models.AdminSession ||
  mongoose.model<AdminSessionDocument>("AdminSession", adminSessionSchema);
