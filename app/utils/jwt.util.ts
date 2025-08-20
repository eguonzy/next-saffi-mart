import jwt from "jsonwebtoken";

export const REFRESH_TOKEN_TTL = "1y";
export const ACCESS_TOKEN_TTL = "5d";
export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;
export const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAte5f6tEgi8NSZfP0q6Sz
TkLV0+AOTJOsZVYmi6eMDLfzjA5j0SDeOBdY1ULnb8qA7asw4vnHs+rgYupr7/as
NkLoqqaVkFaiS2xDX2KUpGqsJO/x7vz++sILnaV2BONAs7p368+hWVGaucJ95JeU
VTY+PkeEPQDh8s09EQIXC4W7P9R/Y6ogXpVvsWEeM6lCqdacfmYMvDSkG8hIEJgR
IGyBeefTBlrFJ7b2MWlxpFKYYdL1c8CnEnGM6DjWw+pM8baDa2jQNzgN/tTOh9jE
sfoh4AubxH+2cTaiut/h0vVwjor+CYODxrwG9qVM9oKKzgex2cYD+t1opOGOI/9y
DrOXYMJNTHv4ccfNkkCu3DY0PifLlJZn5YVXd5ZwL872R8K/gcaEPni4jnxSN7Zw
NEg1FCznsw3bfNfk3Y4wdN8C3G5F1YeMhs1/u4inY7NpvRzSKGc2DTSYCFxvRCQF
z5HlZx7C/uua7nRQMO7PWs4YNzZzU9s5pww0FL2hROUGSD4858hPVbrg7UPeCcFE
EPzb9MdEUHBZ86CZA5p9SgonhuekkWYvt+It4++XJRhrv1BvmKy6riHip8Z3vbZt
eZylU8naSS0BXmKXPf3uuEN55a03AaZoK3weNk6Zl3mJpqqd7WpOSG8CLzsWs23N
DLVGNeWBH7P6A6bbwRFQ0e0CAwEAAQ==
-----END PUBLIC KEY-----`;

export const signJwt = (
  object: object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(object, PRIVATE_KEY, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY);
    return {
      decoded,
      valid: true,
      expired: false,
    };
  } catch (error: unknown) {
    return {
      valid: false,
      expired:
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        (error as { message: string }).message === "jwt expired",
      decoded: null,
    };
  }
};
