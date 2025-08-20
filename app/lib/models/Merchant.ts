import { Schema, model, Document, Types, models } from "mongoose";
import bcrypt from "bcrypt";
export interface MerchantInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  businessName: string;
  address: {
    street: string;
    town: string;
    state: string;
  };
  phoneNumber: string;
  nuban: string;
  bank: string;
}
export interface MerchantDocument extends MerchantInput, Document {
  isEmailVerified: boolean;
  isPhoneNumberVerified: boolean;
  products: [Types.ObjectId]; // Reference to products listed by the merchant
  orders: [type: Types.ObjectId];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const MerchantSchema = new Schema<MerchantDocument>(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    businessName: { type: String, uppercase: true, trim: true },
    address: {
      street: String,
      town: String,
      state: String,
    },
    phoneNumber: String,
    bank: String,
    nuban: String,
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    isEmailVerified: { type: Boolean, default: false },
    isPhoneNumberVerified: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
MerchantSchema.virtual("products", {
  ref: "Product",
  foreignField: "merchant",
  localField: "_id",
});
MerchantSchema.virtual("productsCount", {
  ref: "Product",
  foreignField: "merchant",
  localField: "_id",
  count: true,
});
MerchantSchema.pre("save", async function (next) {
  const merchant = this as unknown as MerchantDocument;
  if (!merchant.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(merchant.password, salt);
  merchant.password = hash;
  return next();
});

MerchantSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const merchant = this as MerchantDocument;
  return bcrypt
    .compare(candidatePassword, merchant.password)
    .catch((e) => false);
};

export default models.Merchant ||
  model<MerchantDocument>("Merchant", MerchantSchema);
