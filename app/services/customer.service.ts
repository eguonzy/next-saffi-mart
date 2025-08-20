import { FilterQuery } from "mongoose";
import CustomerModel, {
  CustomerDocument,
  CustomerInput,
} from "@/app/lib/models/Customer";

export const createCustomer = async (input: CustomerInput) => {
  try {
    return await CustomerModel.create(input);
  } catch (error) {
    console.log(error);
  }
};

export const validatePassword = async ({
  email,
  password,
  phoneNumber,
}: {
  email?: string;
  password: string;
  phoneNumber?: string;
}) => {
  const customer = await CustomerModel.findOne(
    email ? { email } : { phoneNumber }
  );

  if (!customer) return false;

  const isValid = await customer.comparePassword(password);

  if (!isValid) return false;

  return customer.toObject();
};

export const findCustomer = async (query: FilterQuery<CustomerDocument>) =>
  CustomerModel.findOne(query).lean();

export const findCustomers = async (
  query: FilterQuery<CustomerDocument>,
  skip: number,
  limit: number
) => CustomerModel.find(query).skip(skip).limit(limit).lean();

export const addProductToCartService = async (
  id: string,
  product: string,
  quantity: number
) =>
  CustomerModel.findByIdAndUpdate(
    id,
    {
      $push: { cart: { product, quantity } },
    },
    { new: true }
  ).lean();

export const verifyCart = async (product: string) =>
  await CustomerModel.findOne({ "cart.product": product });

export const updateCartService = async (
  id: string,
  product: string,
  quantity: number
) =>
  CustomerModel.findOneAndUpdate(
    { _id: id, "cart.product": product },
    {
      "cart.$.quantity": quantity,
    },
    { new: true }
  ).lean();

export const deleteFromCartService = async (id: string, product: string) =>
  CustomerModel.findOneAndUpdate(
    { _id: id, "cart.product": product },
    {
      $pull: { cart: { product } },
    },
    { new: true }
  ).lean();

export const getCartService = async (_id: string) =>
  CustomerModel.findById({ _id }, { cart: 1, _id: 0 })
    .populate("cart.product")
    .exec();

export const emptyCartService = async (_id: string) =>
  CustomerModel.findByIdAndUpdate({ _id }, { $set: { cart: [] } });

export const customerCountService = async () =>
  (await CustomerModel.find().countDocuments()).toLocaleString();
