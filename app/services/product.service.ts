import { FilterQuery } from "mongoose";
import ProductModel, {
  ProductDocument,
  ProductInput,
} from "@/app/lib/models/Product";
import BrandModel from "@/app/lib/models/Brand";

import CategoryModel from "@/app/lib/models/Category";
import MerchantModel from "@/app/lib/models/Merchant";

export const createProduct = async (input: ProductInput) => {
  const categoryName = (await CategoryModel.findById(input.category))?.name;
  const brandName = (await BrandModel.findById(input.brand))?.name;
  const merchantName = (await MerchantModel.findById(input.merchant))
    ?.businessName;
  return ProductModel.create({
    ...input,
    categoryName,
    brandName,
    merchantName,
  });
};
//done
export const getProductById = async (id: string) =>
  ProductModel.findById(id)
    .populate("merchant")
    .populate("category")
    .populate("brand")
    .lean()
    .exec();
//done
export const getProductByIdForCustomer = async (id: string) =>
  ProductModel.findByIdAndUpdate(
    id,
    { $inc: { views: 1 }, $addToSet: { uniqueViews: id } },
    { new: true }
  );

//done
export const getProductsByQuery = async (queryString: string|undefined) => {
  let query = {};

  if (queryString) {
    const regex = new RegExp(queryString, "i");
    query = { title: regex };
  }
  return ProductModel.find(query)
    .populate("merchant")
    .populate("category")
    .populate("brand")
    .lean();
};

export const getProductsByBrandId = async (id: string, page: number) => {
  const pageSize = 20;
  return ProductModel.find({ brand: id })
    .populate("merchant")
    .populate("category")
    .populate("brand")
    .skip(pageSize * (page - 1))
    .limit(pageSize);
};

export const getProductsByCategoryId = async (id: string, page: number) => {
  const pageSize = 20;
  return ProductModel.find({ category: id })
    .populate("merchant")
    .populate("category")
    .populate("brand")
    .skip(pageSize * (page - 1))
    .limit(pageSize);
};

//done
export const getProductsForSearchPage = async (
  queryString: string,
  //  sort: { field: string; order: number },
  category?: string,
  brand?: string
) => {
  const regexQuery = { $regex: queryString, $options: "i" };
  let query: FilterQuery<ProductDocument> = {
    $or: [
      { title: regexQuery },
      {
        categoryName: regexQuery,
      },
      { brandName: regexQuery },
      { tags: regexQuery },
    ],
  };
  if (brand && category) query = { $and: [{ category }, query, { brand }] };
  if (category) query = { $and: [{ category }, query] };
  if (brand) query = { $and: [{ brand }, query] };

  return ProductModel.find(query)
    .populate("merchant")
    .populate("category")
    .populate("brand");
};
