import { NextRequest, NextResponse } from "next/server";
// import { cookies, headers } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    // const cookieStore = cookies();
    // const token = cookieStore.get("token");

    // const headersList = headers();
    // const referer = headersList.get("referer");

    const token = req.cookies.get("token"); // Cookies
    const requestHeaders = new Headers(req.headers); // Headers
    const searchParams = req.nextUrl.searchParams; // Query Params URL
    const query = searchParams.get("id");
    // const resBody = await req.json(); // Raw Body
    // const formData = await req.formData(); // Form Data body
    // const name = formData.get("name");
    // const email = formData.get("email");

    return NextResponse.json(
      {
        token: token || "No Token",
        headers: requestHeaders,
        query: query || "No Query",

        message: "Hello Next.js With Middleware Practice!",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
