import { FilterQuery, UpdateQuery } from "mongoose";
import CustomerSessionModel, {
  CustomerSessionDocument,
} from "@/app/lib/models/customerSession.model";
import { signJwt, verifyJwt } from "@/app/utils/jwt.util";
import { get } from "lodash";
import { findCustomer } from "./customer.service";
import { ACCESS_TOKEN_TTL } from "@/app/utils/jwt.util";

export const createSession = async (customerId: string, userAgent: string) => {
  const session = await CustomerSessionModel.create({
    customer: customerId,
    userAgent,
  });
  return session.toJSON();
};

export const findSessions = (query: FilterQuery<CustomerSessionDocument>) => {
  return CustomerSessionModel.find(query).lean();
};

export const updateSessions = (
  query: FilterQuery<CustomerSessionDocument>,
  update: UpdateQuery<CustomerSessionDocument>
) => CustomerSessionModel.updateOne(query, update);

export const reissueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJwt(refreshToken);
  const decodedId = get(decoded, "session");
  console.log(decoded);
  if (!decoded || !decodedId) return false;
  const session = await CustomerSessionModel.findById(decodedId);
  if (!session || !session.valid) return false;

  const customer = await findCustomer({ _id: session?.customer });

  if (!customer) return false;
  const accessToken = signJwt(
    { ...customer, session: session._id },
    { expiresIn: ACCESS_TOKEN_TTL }
  );

  return accessToken;
};
