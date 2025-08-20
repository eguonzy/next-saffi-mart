import { TrendingUp, Edit } from "lucide-react";
export function BestSellersSection({ onEditProduct }) {
  const bestSellers = [
    {
      id: 3,
      name: "Running Shoes",
      category: "Footwear",
      price: "$129.99",
      sales: 312,
      revenue: "$40,559.88",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
    },
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: "$149.99",
      sales: 256,
      revenue: "$38,397.44",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Electronics",
      price: "$299.99",
      sales: 189,
      revenue: "$56,698.11",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
    },
    {
      id: 5,
      name: "Coffee Maker",
      category: "Home",
      price: "$89.99",
      sales: 156,
      revenue: "$14,038.44",
      image:
        "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=200&q=80",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {bestSellers.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow"
          >
            <div className="relative h-40">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                Best Seller
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>
              <div className="mt-3 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {product.sales} sold
                  </p>
                </div>
                <button
                  onClick={() => onEditProduct(product)}
                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <button className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
          View All Best Sellers
        </button>
      </div>
    </div>
  );
}
