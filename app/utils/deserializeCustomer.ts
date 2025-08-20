import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  verifyJwt,
} from "../utils/jwt.util";
import { reissueAccessToken } from "@/app/services/customerSession.service";
import { CustomerDocument } from "../lib/models/Customer";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const deserializeCustomer = async (): Promise<
  CustomerDocument | NextResponse
> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_KEY);
    const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY);
    if (!accessToken)
      return NextResponse.json(
        { error: "No access token found" },
        { status: 401 }
      );
    const { decoded, expired } = verifyJwt(accessToken.value);

    if (decoded) {
      return decoded;
    }

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

      const result = verifyJwt(newAccessToken);
      return result.decoded;
    }
    return NextResponse.json(
      { error: "No access token found" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export default deserializeCustomer;
