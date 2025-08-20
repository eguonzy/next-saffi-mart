import dbConnect from "@/app/lib/db";
import { getMerchants } from "@/app/services/merchant.service";
import logger from "@/app/utils/logger";
import { NextResponse } from "next/server";
import Product from "@/app/lib/models/Product";
import deserializeAdmin from "@/app/utils/deserializeAdmin";
import Admin from "@/app/lib/models/Admin";
export async function GET() {
  try {
    await dbConnect();
    const admin = await deserializeAdmin();
    logger.info(admin);
    const merchants = await getMerchants({}, 0, 90);
    return Response.json(merchants);
  } catch (error) {
    logger.error(`Error fetching merchants: ${error}`);
    return NextResponse.json(
      { error: "Failed to fetch merchants" },
      { status: 500 }
    );
  }
}
