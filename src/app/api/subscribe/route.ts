import { NextRequest, NextResponse } from "next/server";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 이메일 형식 유효성 검증 함수
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // 이메일이 제공되지 않은 경우
    if (!email) {
      return NextResponse.json(
        {
          email: null,
          success: false,
          message: "이메일이 필요합니다."
        },
        { status: 400 }
      );
    }

    // 이메일이 문자열이 아닌 경우
    if (typeof email !== "string") {
      return NextResponse.json(
        {
          email: email,
          success: false,
          message: "이메일은 문자열이어야 합니다."
        },
        { status: 400 }
      );
    }

    // 이메일 형식 유효성 검증
    const isValid = isValidEmail(email.trim());

    if (isValid) {
      await sleep(1000);
      return NextResponse.json(
        {
          email: email.trim(),
          success: true,
          message: "구독 신청이 완료되었습니다."
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          email: email.trim(),
          success: false,
          message: "유효하지 않은 이메일 형식입니다."
        },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      {
        email: null,
        success: false,
        message: "서버 오류가 발생했습니다."
      },
      { status: 500 }
    );
  }
}
