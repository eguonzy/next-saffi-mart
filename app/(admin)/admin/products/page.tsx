"use client";
import { ProductDocument } from "@/app/lib/models/Product";
import React, { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import { ProductTable } from "@/Components/ProductTable";
import { BestSellersSection } from "@/Components/BestSellersSection";
import { ProductEditModal } from "@/Components/ProductEditModal";
export default function Products() {
  const [products, setProducts] = React.useState<ProductDocument[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // "all" or "bestsellers"
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsEditModalOpen(true);
  };
  const handleGetProducts = async () => {
    try {
      const req = await fetch("/api/products");
      if (req.ok) {
        const res = await req.json();
        console.log(res);
        setProducts(res.products);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  useEffect(() => {
    handleGetProducts();
  }, []);
  return (
    <div className="space-y-6 p-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Products</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>
      <div className=" rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "all"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Products
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "bestsellers"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("bestsellers")}
          >
            Best Sellers
          </button>
        </div>
        {activeTab === "all" ? (
          <ProductTable onEditProduct={handleEditProduct} />
        ) : (
          <BestSellersSection onEditProduct={handleEditProduct} />
        )}
      </div>
      {isEditModalOpen && (
        <ProductEditModal
          product={currentProduct}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
