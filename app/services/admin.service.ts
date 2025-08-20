import { FilterQuery } from "mongoose";
import AdminModel, { AdminDocument, AdminInput } from "@/app/lib/models/Admin";

export const createAdmin = async (input: AdminInput) => {
  try {
    return await AdminModel.create(input);
  } catch (error) {
    console.log(error);
  }
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const admin = await AdminModel.findOne({ email });

  if (!admin) return false;

  const isValid = await admin.comparePassword(password);

  if (!isValid) return false;

  return admin.toObject();
};

export const findAdmin = async (query: FilterQuery<AdminDocument>) =>
  AdminModel.findOne(query).lean();
