import { NextRequest, NextResponse } from 'next/server';
import { createUser, signJWT, setSessionCookie } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, congregation } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Create user
    const user = await createUser(name, email, password, congregation);

    // Create JWT session
    const token = await signJWT(user.id, user.email);
    const response = NextResponse.json({
      user,
      message: 'Account created successfully',
    }, { status: 201 });

    setSessionCookie(token, response);

    return response;
  } catch (error) {
    console.error('[AUTH REGISTER] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
