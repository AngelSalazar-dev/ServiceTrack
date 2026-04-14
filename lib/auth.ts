import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from './prisma';

// JWT Secret validation - fail fast in production
const JWT_SECRET_STRING = process.env.JWT_SECRET;

if (!JWT_SECRET_STRING && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable is required in production');
}

const JWT_SECRET = new TextEncoder().encode(
  JWT_SECRET_STRING || 'dev-secret-do-not-use-in-production'
);

const SALT_ROUNDS = 10;
const COOKIE_NAME = 'session';
const JWT_EXPIRATION = '30d';

// ==========================================
// Password hashing
// ==========================================

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ==========================================
// JWT operations
// ==========================================

export async function signJWT(userId: string, email: string): Promise<string> {
  return new SignJWT({ userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(JWT_SECRET);
}

export async function verifyJWT(token: string): Promise<{ userId: string; email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}

// ==========================================
// Session cookie management
// ==========================================

export function setSessionCookie(token: string, response: NextResponse) {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

// ==========================================
// Get current user from request
// ==========================================

export async function getCurrentUser(): Promise<{ id: string; name: string; email: string; congregation: string | null; createdAt: string } | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  const payload = await verifyJWT(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      name: true,
      email: true,
      congregation: true,
      createdAt: true,
    },
  });

  if (!user) return null;

  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
  };
}

// ==========================================
// Auth helpers
// ==========================================

export async function createUser(name: string, email: string, password: string, congregation?: string) {
  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase().trim(),
      password: passwordHash,
      congregation: congregation || null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      congregation: true,
      createdAt: true,
    },
  });

  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });

  if (!user) {
    return { error: 'Invalid email or password' };
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return { error: 'Invalid email or password' };
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      congregation: user.congregation,
      createdAt: user.createdAt.toISOString(),
    },
  };
}
