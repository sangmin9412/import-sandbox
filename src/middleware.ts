import { type NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const response = NextResponse.next();

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/main", request.url));
  }

  // 이미지 캐시 설정
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) || pathname.startsWith("/_next/image")) {
    response.headers.set("Cache-Control", "public, max-age=86400, must-revalidate");
    return response;
  }

  // 폰트 캐시 설정
  if (pathname.match(/\.(woff|woff2|ttf|otf|eot)$/i) || pathname.startsWith("/_next/image")) {
    response.headers.set("Cache-Control", "public, max-age=86400, must-revalidate");
    return response;
  }

  // 응답에 커스텀 헤더 추가
  response.headers.set("x-current-path", pathname);

  return response;
}

export const config = {
  matcher: [
    // Static assets and images
    "/:path*.jpg",
    "/:path*.jpeg",
    "/:path*.png",
    "/:path*.gif",
    "/:path*.webp",
    "/:path*.svg",
    // 폰트 파일 매칭
    "/:path*.woff",
    "/:path*.woff2",
    "/:path*.ttf",
    "/:path*.otf",
    "/:path*.eot",
    // Next.js 이미지 최적화 경로
    "/_next/image:path*",
    // 기존 라우팅
    "/",
    // API 라우트 제외
    "/((?!api|_next/static|favicon.ico).*)"
  ]
};
