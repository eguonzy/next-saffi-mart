import dbConnect from "@/app/lib/db";
import { getProductsByQuery } from "@/app/services/product.service";
import logger from "@/app/utils/logger";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ query: string }> }
) {
  const resolvedParams = await params;
  const query = resolvedParams.query;
  try {
    await dbConnect();

    const products = await getProductsByQuery(query ?? undefined); // Assuming this function fetches all products
    return NextResponse.json({ products });
  } catch (error) {
    logger.error("Error fetching products:" + error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
