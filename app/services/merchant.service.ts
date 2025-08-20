import { FilterQuery } from "mongoose";
import MerchantModel, {
  MerchantDocument,
  MerchantInput,
} from "@/app/lib/models/Merchant";

import logger from "@/app/utils/logger";
import Product from "../lib/models/Product";

export const createMerchant = async (input: MerchantInput) => {
  try {
    return await MerchantModel.create(input);
  } catch (error) {
    logger.error(`Error creating merchant: ${error as string}`);
  }
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const merchant = await MerchantModel.findOne({ email });

  if (!merchant) return false;

  const isValid = await merchant.comparePassword(password);

  if (!isValid) return false;

  return merchant.toObject();
};

export const findMerchant = async (query: FilterQuery<MerchantDocument>) =>
  MerchantModel.findOne(query).lean();

export const getMerchants = async (
  query: FilterQuery<MerchantDocument>,
  skip: number,
  limit: number
) => {
  const merchants = await MerchantModel.find(query).populate("products").exec();
  return merchants;
};

export const getMerchantsCount = async () =>
  MerchantModel.find().countDocuments();
