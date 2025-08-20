import { FilterQuery, UpdateQuery } from "mongoose";
import AdminSessionModel, {
  AdminSessionDocument,
} from "@/app/lib/models/adminSession.model";
import { ACCESS_TOKEN_TTL, signJwt, verifyJwt } from "@/app/utils/jwt.util";
import { get } from "lodash";
import { findAdmin } from "./admin.service";

export const createSession = async (adminId: string, userAgent: string) => {
  const session = await AdminSessionModel.create({
    admin: adminId,
    userAgent,
  });
  return session.toJSON();
};

export const findSessions = (query: FilterQuery<AdminSessionDocument>) => {
  return AdminSessionModel.find(query).lean();
};

export const updateSessions = (
  query: FilterQuery<AdminSessionDocument>,
  update: UpdateQuery<AdminSessionDocument>
) => AdminSessionModel.updateOne(query, update);

export const reissueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJwt(refreshToken);
  const decodedId = get(decoded, "session");
  console.log(decoded);
  if (!decoded || !decodedId) return false;
  const session = await AdminSessionModel.findById(decodedId);
  if (!session || !session.valid) return false;

  const admin = await findAdmin({ _id: session?.admin });

  if (!admin) return false;
  const accessToken = signJwt(
    { ...admin, session: session._id },
    { expiresIn: ACCESS_TOKEN_TTL }
  );

  return accessToken;
};
