import BrandModel, { BrandInput } from "@/app/lib/models/Brand";

export const createBrand = async (brand: BrandInput) => {
  return BrandModel.create(brand);
};

export const getBrands = async () => {
  try {
    return BrandModel.find().lean();
  } catch (error) {
    console.log(error);
  }
};
