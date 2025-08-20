import CategoryModel, { CategoryInput } from "@/app/lib/models/Category";

export const createCategory = async (category: CategoryInput) => {
  return CategoryModel.create(category);
};
