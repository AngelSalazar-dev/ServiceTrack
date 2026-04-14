import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, signJWT, setSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const result = await authenticateUser(email, password);

    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      );
    }

    // Create JWT session
    const token = await signJWT(result.user.id, result.user.email);
    const response = NextResponse.json({
      user: result.user,
    });

    setSessionCookie(token, response);

    return response;
  } catch (error) {
    console.error('[AUTH LOGIN] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
