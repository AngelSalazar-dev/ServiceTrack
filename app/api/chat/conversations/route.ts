import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const action = url.searchParams.get('action');
  const conversationId = url.searchParams.get('conversationId');

  if (action === 'list') {
    // List all conversations for the user
    try {
      const conversations = await prisma.$queryRaw`
        SELECT 
          c.id, 
          c.title, 
          c.updatedAt, 
          c.createdAt,
          COUNT(m.id) as messageCount,
          (SELECT m2.content FROM ChatMessage m2 WHERE m2.conversationId = c.id ORDER BY m2.createdAt DESC LIMIT 1) as lastMessage
        FROM ChatConversation c
        LEFT JOIN ChatMessage m ON m.conversationId = c.id
        WHERE c.userId = ${user.id}
        GROUP BY c.id
        ORDER BY c.updatedAt DESC
        LIMIT 50
      `;
      return NextResponse.json({ conversations });
    } catch (error) {
      console.error('[CHAT] Error listing conversations:', error);
      return NextResponse.json({ error: 'Failed to list conversations' }, { status: 500 });
    }
  }

  if (action === 'load' && conversationId) {
    // Load messages for a specific conversation
    try {
      const conv = await prisma.chatConversation.findFirst({
        where: { id: conversationId, userId: user.id },
      });
      if (!conv) {
        return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
      }

      const messages = await prisma.chatMessage.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
      });
      return NextResponse.json({ messages });
    } catch (error) {
      console.error('[CHAT] Error loading messages:', error);
      return NextResponse.json({ error: 'Failed to load messages' }, { status: 500 });
    }
  }

  if (action === 'delete' && conversationId) {
    // Delete a conversation and its messages
    try {
      await prisma.$transaction([
        prisma.chatMessage.deleteMany({ where: { conversationId } }),
        prisma.chatConversation.deleteMany({ where: { id: conversationId, userId: user.id } }),
      ]);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('[CHAT] Error deleting conversation:', error);
      return NextResponse.json({ error: 'Failed to delete conversation' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export async function PUT(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { conversationId, title } = body;

    if (!conversationId || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await prisma.chatConversation.updateMany({
      where: { id: conversationId, userId: user.id },
      data: { title },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[CHAT] Error updating conversation:', error);
    return NextResponse.json({ error: 'Failed to update conversation' }, { status: 500 });
  }
}
