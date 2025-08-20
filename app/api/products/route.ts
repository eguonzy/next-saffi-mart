import { getProductsByQuery } from "@/app/services/product.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = new URL(request.url).searchParams.get("query");
    const products = await getProductsByQuery(query ?? undefined); // Assuming this function fetches all products
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
