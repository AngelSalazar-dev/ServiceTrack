import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET - Fetch a single log
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const log = await prisma.log.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!log) {
      return NextResponse.json(
        { error: 'Log not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      log: {
        ...log,
        date: log.date.toISOString().split('T')[0],
        createdAt: log.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('[LOG GET] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update a log entry
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Verify ownership
    const existingLog = await prisma.log.findFirst({
      where: { id: params.id, userId: user.id },
    });

    if (!existingLog) {
      return NextResponse.json(
        { error: 'Log not found' },
        { status: 404 }
      );
    }

    const log = await prisma.log.update({
      where: { id: params.id },
      data: {
        ...(body.date ? { date: new Date(body.date) } : {}),
        ...(body.hours !== undefined ? { hours: body.hours } : {}),
        ...(body.returnVisits !== undefined ? { returnVisits: body.returnVisits } : {}),
        ...(body.bibleStudies !== undefined ? { bibleStudies: body.bibleStudies } : {}),
        ...(body.notes !== undefined ? { notes: body.notes } : {}),
      },
    });

    return NextResponse.json({
      log: {
        ...log,
        date: log.date.toISOString().split('T')[0],
        createdAt: log.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('[LOG PUT] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a log entry
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify ownership
    const existingLog = await prisma.log.findFirst({
      where: { id: params.id, userId: user.id },
    });

    if (!existingLog) {
      return NextResponse.json(
        { error: 'Log not found' },
        { status: 404 }
      );
    }

    await prisma.log.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Log deleted successfully' });
  } catch (error) {
    console.error('[LOG DELETE] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
