import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  verifyJwt,
} from "../utils/jwt.util";
import { reissueAccessToken } from "@/app/services/merchantSession.service";
import { cookies } from "next/headers";
const deserializeMerchant = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_KEY);
    const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY);
    if (!accessToken)
      return Response.json({ error: "No access token", status: 401 });
    const { decoded, expired } = verifyJwt(accessToken.value);

    if (decoded) {
      return decoded;
    }

    if (expired && refreshToken) {
      const newAccessToken = await reissueAccessToken({
        refreshToken: refreshToken.value,
      });

      if (newAccessToken) {
        cookieStore.set(ACCESS_TOKEN_KEY, newAccessToken);
      }

      const result = verifyJwt(newAccessToken as string);
      return result.decoded;
    }
    return Response.json({ error: "Unauthorized", status: 401 });
  } catch (error) {
    return Response.json({ error: error, status: 500 });
  }
};

export default deserializeMerchant;
