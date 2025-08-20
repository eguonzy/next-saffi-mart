import { Schema, Types, model, Document, models } from "mongoose";
import { ProductDocument } from "@/app/lib/models/Product";

export interface CategoryInput {
  name: string;
  hasParent?: boolean;
  parent?: Types.ObjectId;
  children?: Types.ObjectId;
  admin: Types.ObjectId;
}

export interface CategoryDocument extends CategoryInput, Document {
  createdAt: Date;
  updatedAt: Date;
  products: ProductDocument[];
}

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, uppercase: true, trim: true },
    hasParent: { type: Boolean, default: false },
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
    children: { type: Schema.Types.ObjectId, ref: "Category" },
    // products: { type: Schema.Types.ObjectId, ref: "Product" },
    admin: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

CategorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
});
export default models.Category ||
  model<CategoryDocument>("Category", CategorySchema);
