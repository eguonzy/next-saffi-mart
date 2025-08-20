import { Edit, ExternalLink, Trash } from "lucide-react";
import Image from "next/image";
export function ProductTable({ onEditProduct }) {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: "$149.99",
      inventory: 45,
      sales: 256,
      status: "In Stock",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Electronics",
      price: "$299.99",
      inventory: 32,
      sales: 189,
      status: "In Stock",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
    },
    {
      id: 3,
      name: "Running Shoes",
      category: "Footwear",
      price: "$129.99",
      inventory: 78,
      sales: 312,
      status: "In Stock",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
    },
    {
      id: 4,
      name: "Laptop Bag",
      category: "Accessories",
      price: "$59.99",
      inventory: 12,
      sales: 94,
      status: "Low Stock",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80",
    },
    {
      id: 5,
      name: "Coffee Maker",
      category: "Home",
      price: "$89.99",
      inventory: 0,
      sales: 156,
      status: "Out of Stock",
      image:
        "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=200&q=80",
    },
  ];
  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div>
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Inventory
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Sales
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium  uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-md object-cover"
                      src={product.image}
                      width={200}
                      height={200}
                      alt={product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium ">{product.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm ">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm ">
                {product.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm ">
                {product.inventory}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm ">
                {product.sales}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    product.status
                  )}`}
                >
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => onEditProduct(product)}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-50">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50">
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
        <div className="text-sm ">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">5</span> of{" "}
          <span className="font-medium">25</span> products
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
