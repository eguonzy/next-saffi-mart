import { Schema, model, Document, Types, models } from "mongoose";
import bcrypt from "bcrypt";

import { ProductDocument } from "@/app/lib/models/Product";

export interface CustomerInput {
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
}

export interface CustomerDocument extends CustomerInput, Document {
  dob: string;
  email: string;
  sex: string;
  createdAt: Date;
  updatedAt: Date;
  cart: { product: Types.ObjectId; quantity: number }[];
  wishlist: { product: Types.ObjectId }[];
  addresses: {
    street: string;
    town: string;
    state: string;
  }[];
  defaultAddress: {
    street: string;
    town: string;
    state: string;
  };
  recentlyViewed: { product: Types.ObjectId }[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const CustomerSchema = new Schema<CustomerDocument>(
  {
    firstName: String,
    lastName: String,
    sex: String,
    email: String,
    password: String,
    phoneNumber: String,
    cart: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", unique: true },
        quantity: Number,
      },
    ],
    wishlist: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
      },
    ],
    recentlyViewed: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
      },
    ],
    addresses: [
      {
        street: String,
        town: String,
        state: String,
      },
    ],
    defaultAddress: {
      street: String,
      town: String,
      state: String,
    },
  },
  { timestamps: true }
);

CustomerSchema.pre("save", async function (next) {
  const customer = this as unknown as CustomerDocument;
  if (!customer.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(customer.password, salt);
  customer.password = hash;
  return next();
});

CustomerSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const customer = this as CustomerDocument;
  return bcrypt
    .compare(candidatePassword, customer.password)
    .catch((e) => false);
};

export default models.Customer ||
  model<CustomerDocument>("Customer", CustomerSchema);
