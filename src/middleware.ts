import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Get the encrypted token from the cookies
  const encryptedToken = request.cookies.get("authToken")?.value || "";

  // Decrypt the token
  const decryptedToken = CryptoJS.AES.decrypt(
    encryptedToken,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY || ""
  ).toString(CryptoJS.enc.Utf8);

  const isTokenValid = decodeToken(decryptedToken);

  if (!isTokenValid) {
    // If token is invalid and it's an API route, respond with JSON
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { error: "Unauthorized access. Token is missing or invalid." },
        { status: 401 }
      );
    }

    // If the token is invalid and user already on the sign-in page,
    // For non-API routes, redirect to sign-in
    if (pathname !== "/sign-in") {
      const loginUrl = new NextURL("/sign-in", origin);
      return NextResponse.redirect(loginUrl);
    }
  } else {
    // If token is valid and trying to access sign-in, redirect to dashboard
    if (pathname === "/sign-in") {
      const dashboardUrl = new NextURL("/dashboard", origin);
      return NextResponse.redirect(dashboardUrl);
    }

    // Perform authorization checks
    const userInfo = getUserInfoFromToken(decryptedToken);
    const isAuthorized = authorizeUser(userInfo, pathname);

    if (!isAuthorized) {
      // If it's an API route, respond with JSON indicating access denied
      if (pathname.startsWith("/api")) {
        return NextResponse.json(
          { error: "Access denied. You don't have the required permissions." },
          { status: 403 }
        );
      }

      // Handle unauthorized access (e.g., redirect to access denied page)
      // For non-API routes, redirect to access denied page
      const errorUrl = new NextURL("/access-denied", origin);
      return NextResponse.redirect(errorUrl);
    }
  }

  // If the user is authorized, it allows the request to proceed by returning NextResponse.next()
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", // Protect dashboard route and sub-routes
    "/sign-in", // Protect sign-in route
    "/sign-up", // Protect sign-up route
    "/api/user/:path*", // Protect user-related API routes
    "/api/admin/:path*", // Protect admin-related API routes
    // Add more API or page routes to protect as needed
  ],
};

// function to decode token validity
function decodeToken(token: string): boolean {
  try {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;

    if (!decodedToken || !decodedToken.exp) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
  } catch (err) {
    console.error("Token decoding error:", err);
    return false;
  }
}

// function to get the user information from the token
function getUserInfoFromToken(token: string) {
  const tokenData = jwt.decode(token) as { sub: string; authorities: string[] };

  return {
    email: tokenData?.sub,
    authorities: tokenData?.authorities,
  };
}

// function to check if user has access to the requested path
function authorizeUser(
  userInfo: { email: string; authorities: string[] },
  requestedPath: string
): boolean {
  // Define roles required for specific paths
  const roleRequiredForPath: { [key: string]: string[] } = {
    "/dashboard": ["ADMIN"],
    "/api/user": ["USER", "ADMIN"],
    "/api/admin": ["ADMIN"],
    "/api/tasks": ["USER", "ADMIN"],
    // Add more paths and roles as needed
  };

  const rolesRequired = roleRequiredForPath[requestedPath];

  if (rolesRequired) {
    // Check if user has any of the required roles
    return rolesRequired.some((role) => userInfo.authorities.includes(role));
  }

  // Default to true if no specific roles are required for the path
  return true;
}

/*
? Step 0: When user will login then user's credentials will be stored in cookies
? Step 1: Create middeware.ts file
? Step 2: Access the credentials
? Step 3 Check Credential Validity
? Step 4: Redirect user based on token validity
? Step 5: Role-based Access (USER, CUSTOMER, ADMIN, etc)
*/
