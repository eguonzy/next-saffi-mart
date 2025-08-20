import { FilterQuery, UpdateQuery } from "mongoose";
import MerchantSessionModel, {
  MerchantSessionDocument,
} from "@/app/lib/models/merchantSession.model";
import { get } from "lodash";
import { findMerchant } from "./merchant.service";
import { ACCESS_TOKEN_TTL, signJwt, verifyJwt } from "@/app/utils/jwt.util";

export const createSession = async (merchantId: string, userAgent: string) => {
  const session = await MerchantSessionModel.create({
    merchant: merchantId,
    userAgent,
  });
  return session.toJSON();
};

export const findSessions = (query: FilterQuery<MerchantSessionDocument>) => {
  return MerchantSessionModel.find(query).lean();
};

export const updateSessions = (
  query: FilterQuery<MerchantSessionDocument>,
  update: UpdateQuery<MerchantSessionDocument>
) => MerchantSessionModel.updateOne(query, update);

export const reissueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJwt(refreshToken);
  const decodedId = get(decoded, "session");
  console.log(decoded);
  if (!decoded || !decodedId) return false;
  const session = await MerchantSessionModel.findById(decodedId);
  if (!session || !session.valid) return false;

  const merchant = await findMerchant({ _id: session?.merchant });

  if (!merchant) return false;
  const accessToken = signJwt(
    { ...merchant, session: session._id },
    { expiresIn: ACCESS_TOKEN_TTL }
  );

  return accessToken;
};
