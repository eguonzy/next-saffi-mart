import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  verifyJwt,
} from "../utils/jwt.util";
import { reissueAccessToken } from "@/app/services/adminSession.service";
import logger from "../utils/logger";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AdminDocument } from "../lib/models/Admin";
const deserializeAdmin = async (): Promise<AdminDocument | NextResponse> => {
  const cookieStore = await cookies();
  if (!cookieStore) logger.error("No cookie store found");
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY);
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY);
  if (!accessToken)
    return NextResponse.json(
      { error: "No access token found" },
      { status: 401 }
    );
  const { decoded, expired } = verifyJwt(accessToken.value);

  if (decoded) return decoded;

  if (expired && refreshToken) {
    const newAccessToken = await reissueAccessToken({
      refreshToken: refreshToken.value,
    });

    if (newAccessToken) {
      cookieStore.set(ACCESS_TOKEN_KEY, newAccessToken, {
        httpOnly: true,
        secure: true,
      });
    }

    const result = verifyJwt(newAccessToken as string);
    return result.decoded;
  }
  return NextResponse.json({ error: "Invalid access token" }, { status: 401 });
};

export default deserializeAdmin;
