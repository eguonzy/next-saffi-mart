import React from "react";
import {
  LayoutDashboard,
  Store,
  Users,
  ShoppingCart,
  CreditCard,
  Settings,
} from "lucide-react";
import Link from "next/link";
export function Sidebar() {
  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Overview",
      path: "/",
    },
    {
      icon: Store,
      label: "Merchants",
      path: "/merchants",
    },
    {
      icon: Users,
      label: "Customers",
      path: "/customers",
    },
    {
      icon: ShoppingCart,
      label: "Orders",
      path: "/orders",
    },
    {
      icon: CreditCard,
      label: "Transactions",
      path: "/transactions",
    },
  ];
  return (
    <div className="w-64 h-screen  border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center px-6 py-3 hover:bg-gray-50`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-6 border-t border-gray-200">
        <button className="flex items-center hover:text-gray-900">
          <Settings className="w-5 h-5 mr-3" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
