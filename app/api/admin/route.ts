import { NextResponse, NextRequest } from "next/server";
import { cookies, headers } from "next/headers";
import { validatePassword } from "@/app/services/admin.service";
import { createSession } from "@/app/services/adminSession.service";
import {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_TTL,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_TTL,
  signJwt,
} from "@/app/utils/jwt.util";

import logger from "@/app/utils/logger";
import dbConnect from "@/app/lib/db";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const headersList = await headers();
    const { email, password } = await req.json();
    logger.info(`Login attempt for email: ${email} password: ${password}`);
    const cookieStore = await cookies();
    const admin = await validatePassword({ email, password });
    if (!admin)
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    const session = await createSession(
      admin._id,
      headersList.get("user-agent") || ""
    );
    const accessToken = signJwt(
      { ...admin, session: session._id },
      { expiresIn: ACCESS_TOKEN_TTL }
    );
    const refreshToken = signJwt(
      { ...admin, session: session._id },
      { expiresIn: REFRESH_TOKEN_TTL }
    );
    logger.info(cookieStore.get(ACCESS_TOKEN_KEY)?.toString());
    cookieStore.set(ACCESS_TOKEN_KEY, accessToken, {
      httpOnly: true,
      secure: true,
    });
    cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      secure: true,
    });
    cookieStore.set("id", admin._id.toString(), {
      httpOnly: true,
      secure: true,
    });
    logger.info(admin);
    return NextResponse.json(
      { accessToken, refreshToken, session, admin },
      { status: 200 }
    );
  } catch (error) {
    logger.info(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  //res.send({ accessToken, refreshToken, session, admin });
}

// export const GET = async () => {
//   const admin = NextResponse.
//   const adminSessions = await findSessions({
//     admin: admin._id,
//     valid: true,
//   });
//   res.set;
//   res.send(adminSessions);
// };

// export const deleteSessionsHandler = async (req: Request, res: Response) => {
//   logger.info(res.locals.admin);
//   const sessionId = res.locals.admin.session;
//   await updateSessions({ _id: sessionId }, { valid: false });
//   res.sendStatus(200);
// };
