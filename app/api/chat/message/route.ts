import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const SYSTEM_PROMPT = `You are ServiceTrack AI, a helpful assistant designed to help users track their productivity and achieve their activity goals. Your purpose is to provide practical advice and tips for time management, goal setting, and effective communication.

Guidelines:
- Provide practical, actionable advice for productivity and efficiency
- Be encouraging and uplifting
- Focus on: time management, setting and reaching goals, effective communication, persistence, organizing tasks, public speaking tips, and professional development
- Keep responses concise but helpful
- Respond in the same language the user writes in (English or Spanish)
- Do NOT provide medical, legal, or financial advice
- Always encourage users to organize their activities to maximize their impact.`;

export async function POST(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { message, conversationHistory = [], conversationId } = body;

  if (!message || !message.trim()) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  if (!GEMINI_API_KEY) {
    console.error('[CHAT] GEMINI_API_KEY not configured');
    return NextResponse.json({ error: 'AI service not configured' }, { status: 500 });
  }

  try {
    // Determine or create conversation
    let activeConvId = conversationId;

    if (!activeConvId) {
      // Create new conversation
      const newConv = await prisma.chatConversation.create({
        data: {
          userId: user.id,
          title: message.substring(0, 50),
        },
      });
      activeConvId = newConv.id;
    }

    // Save user message
    const userMsgId = crypto.randomUUID();
    await prisma.chatMessage.create({
      data: {
        id: userMsgId,
        userId: user.id,
        role: 'user',
        content: message,
        conversationId: activeConvId,
      },
    });

    // Build conversation history for Gemini
    const messages: Array<{ role: string; parts: Array<{ text: string }> }> = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      ...conversationHistory.map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    // Call Gemini API
    console.log('[CHAT] Calling Gemini API...');
    const geminiResponse = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json().catch(() => ({}));
      console.error('[CHAT] Gemini API Error:', geminiResponse.status, JSON.stringify(errorData));
      throw new Error(`Gemini API error: ${errorData?.error?.message || geminiResponse.statusText || 'Unknown error'}`);
    }

    const geminiData = await geminiResponse.json();
    console.log('[CHAT] Gemini response received');

    // Extract response
    let assistantMessage = '';
    if (geminiData.candidates && geminiData.candidates.length > 0) {
      const candidate = geminiData.candidates[0];
      if (candidate.content?.parts?.[0]?.text) {
        assistantMessage = candidate.content.parts[0].text;
      } else if (candidate.finishReason === 'SAFETY') {
        assistantMessage = '⚠️ Tu mensaje fue bloqueado por las políticas de seguridad. Por favor reformula tu pregunta.';
      } else if (candidate.finishReason === 'MAX_TOKENS') {
        assistantMessage = '⚠️ La respuesta fue demasiado larga. Intenta hacer una pregunta más específica.';
      } else {
        assistantMessage = 'Lo siento, no pude generar una respuesta.';
      }
    } else {
      assistantMessage = 'Lo siento, ocurrió un error al procesar tu mensaje.';
    }

    // Save assistant response
    const assistantMsgId = crypto.randomUUID();
    await prisma.chatMessage.create({
      data: {
        id: assistantMsgId,
        userId: user.id,
        role: 'assistant',
        content: assistantMessage,
        conversationId: activeConvId,
      },
    });

    // Update conversation timestamp
    await prisma.chatConversation.update({
      where: { id: activeConvId },
      data: { updatedAt: new Date() },
    });

    // Build updated conversation history
    const updatedHistory = [
      ...conversationHistory,
      { role: 'user', content: message },
      { role: 'assistant', content: assistantMessage },
    ];

    return NextResponse.json({
      message: assistantMessage,
      conversation: updatedHistory,
      conversationId: activeConvId,
    });
  } catch (error: any) {
    console.error('[CHAT] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process message' },
      { status: 500 }
    );
  }
}
