"use client";
import { Header } from "@/Components/Header";
import Image from "next/image";
export default function Home() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const req = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!req.ok) {
        const error = await req.json();
        console.error("Login failed:", error);
        return;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return;
    }
    // Handle login logic here
  };
  return (
    <div className="p-5 h-full flex justify-center items-center">
      <div className="shadow-2xl border border-gray-800  p-5 w-2/6 rounded-md">
        <h2 className="text-center font-bold">LOGIN</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="shadow appearance-none border border-gray-600 rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="shadow appearance-none border border-gray-600 rounded w-full py-4 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
