import { Schema, model, Document, models } from "mongoose";
import bcrypt from "bcrypt";
export interface AdminInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  nuban: string;
  bank: string;
}
export interface AdminDocument extends AdminInput, Document {
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminSchema = new Schema<AdminDocument>(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
    bank: String,
    nuban: String,
    permissions: [],
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function (next) {
  const admin = this as unknown as AdminDocument;
  if (!admin.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(admin.password, salt);
  admin.password = hash;
  return next();
});

AdminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const admin = this as AdminDocument;
  return bcrypt.compare(candidatePassword, admin.password).catch((e) => false);
};

export default models.Admin || model<AdminDocument>("Admin", AdminSchema);
