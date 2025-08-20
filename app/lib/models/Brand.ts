import { Schema, Types, model, Document, models } from "mongoose";
import { ProductDocument } from "@/app/lib/models/Product";

export interface BrandInput {
  name: string;
  admin: Types.ObjectId;
}

export interface BrandDocument extends BrandInput, Document {
  createdAt: Date;
  updatedAt: Date;
  products: ProductDocument[];
}

const BrandSchema = new Schema<BrandDocument>(
  {
    name: { type: String, required: true, uppercase: true, trim: true },
    admin: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

BrandSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "brand",
});

export default models.Brand || model<BrandDocument>("Brand", BrandSchema);
