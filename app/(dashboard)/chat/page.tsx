'use client';

import * as React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LangContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Send,
  MessageCircle,
  Sparkles,
  Bot,
  User,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  MoreHorizontal,
  InfinityIcon,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  updatedAt: string;
  createdAt: string;
  messageCount: number;
  lastMessage: string;
  title?: string;
}

export default function ChatPage() {
  const { user } = useAuth();
  const { tr, lang } = useLang();
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [conversationHistory, setConversationHistory] = React.useState<any[]>([]);
  const [activeConversationId, setActiveConversationId] = React.useState<string | null>(null);
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [menuOpenId, setMenuOpenId] = React.useState<string | null>(null);
  const [editingConvId, setEditingConvId] = React.useState<string | null>(null);
  const [editTitle, setEditTitle] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const SUGGESTED_QUESTIONS = [
    { icon: '💬', question: tr('chat_suggest_1') },
    { icon: '🔄', question: tr('chat_suggest_2') },
    { icon: '📖', question: tr('chat_suggest_3') },
    { icon: '👥', question: tr('chat_suggest_4') },
    { icon: '🌐', question: tr('chat_suggest_5') },
    { icon: '💪', question: tr('chat_suggest_6') },
  ];

  React.useEffect(() => {
    loadConversations();
  }, []);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadConversations = async () => {
    try {
      const response = await fetch('/api/chat/conversations?action=list', { credentials: 'include' });
      if (response.status === 401) return;
      if (response.ok) {
        const data = await response.json();
        const convs = data.conversations || [];
        setConversations(convs);
        if (!activeConversationId && convs.length > 0 && convs[0].id) {
          loadConversation(convs[0].id);
        }
      }
    } catch (error) {
      // Silently handle errors
    }
  };

  const loadConversation = async (convId: string) => {
    try {
      const response = await fetch(`/api/chat/conversations?action=load&conversationId=${convId}`, { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        const loadedMessages = (data.messages || []).map((m: any) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          timestamp: m.timestamp instanceof Date ? m.timestamp : new Date(m.timestamp),
        }));
        setMessages(loadedMessages);
        setActiveConversationId(convId);
        setConversationHistory(loadedMessages.map((m: ChatMessage) => ({ role: m.role, content: m.content })));
        setMenuOpenId(null);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const startNewConversation = () => {
    setMessages([]);
    setActiveConversationId(null);
    setConversationHistory([]);
    setInput('');
  };

  const deleteConversation = async (convId: string) => {
    if (!confirm(tr('logs_delete'))) return;
    try {
      const response = await fetch(`/api/chat/conversations?action=delete&conversationId=${convId}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        if (activeConversationId === convId) startNewConversation();
        loadConversations();
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const startRename = (conv: Conversation) => {
    setEditingConvId(conv.id);
    setEditTitle(conv.title || conv.lastMessage || 'Conversation');
    setMenuOpenId(null);
  };

  const saveRename = async () => {
    if (!editingConvId || !editTitle.trim()) { setEditingConvId(null); return; }
    try {
      const response = await fetch('/api/chat/conversations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ conversationId: editingConvId, title: editTitle.trim() }),
      });
      if (response.ok) {
        setEditingConvId(null);
        setEditTitle('');
        loadConversations();
      }
    } catch (error) {
      console.error('Error renaming conversation:', error);
    }
  };

  const sendMessage = async (messageContent?: string) => {
    const content = messageContent || input;
    if (!content.trim() || isLoading) return;
    setIsLoading(true);
    const userMessage = content.trim();
    setInput('');

    setMessages((prev) => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }]);

    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory.slice(-10),
          conversationId: activeConversationId,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || errData.error || `Error ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message, timestamp: new Date() }]);
      if (data.conversation) setConversationHistory(data.conversation);
      if (data.conversationId) {
        setActiveConversationId(data.conversationId);
        loadConversations();
      }
    } catch (error) {
      console.error('[CHAT UI] Error:', error);
      let errorMessage = `❌ ${tr('chat_error_message') || 'Error processing message'}`;
      if (error && typeof error === 'object' && 'message' in error) {
        const msg = (error as Error).message;
        if (msg.includes('API')) errorMessage = `🔧 ${tr('chat_api_error') || 'AI API not configured'}`;
        else errorMessage = `❌ ${msg}`;
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: errorMessage, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimeAgo = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60) return tr('dash_today') || 'Today';
    if (diff < 3600) return `${Math.floor(diff / 60)}min`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] gap-4 transition-colors duration-300">
        {/* Sidebar - conversation history */}
        {showSidebar && (
          <Card className="w-full md:w-72 flex-shrink-0 flex flex-col border-border shadow-md">
            <CardHeader className="pb-3 pt-4 px-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  {tr('chat_conversations') || (lang === 'en' ? 'History' : 'Historial')}
                </CardTitle>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={startNewConversation}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setShowSidebar(false)}>
                    <PanelLeftClose className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto px-2 pb-3">
              {conversations.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-8">No conversations yet</p>
              ) : (
                <div className="space-y-1">
                  {conversations
                    .filter(c => c.id && c.id.trim() !== '')
                    .map((conv, i) => (
                    <div
                      key={`conv-${i}-${conv.id}`}
                      className={`group flex items-start gap-2 p-3 rounded-xl cursor-pointer transition-all relative ${
                        activeConversationId === conv.id
                          ? 'bg-primary/10 border border-primary/20'
                          : 'hover:bg-accent border border-transparent'
                      }`}
                      onClick={() => loadConversation(conv.id)}
                    >
                      <MessageCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${activeConversationId === conv.id ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div className="flex-1 min-w-0">
                        {editingConvId === conv.id ? (
                          <div onClick={(e) => e.stopPropagation()}>
                            <input
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              onKeyDown={(e) => { if (e.key === 'Enter') saveRename(); if (e.key === 'Escape') setEditingConvId(null); }}
                              onBlur={saveRename}
                              autoFocus
                              className="w-full text-xs font-semibold bg-background border border-primary rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                        ) : (
                          <>
                            <p className="text-xs font-semibold truncate">{conv.title || conv.lastMessage || 'Conversation'}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{formatTimeAgo(conv.updatedAt)}{conv.messageCount ? ` · ${conv.messageCount} msgs` : ''}</p>
                          </>
                        )}
                      </div>
                      <div className="relative flex-shrink-0">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); e.preventDefault(); setMenuOpenId((menuOpenId === conv.id && conv.id) ? null : conv.id); }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-accent rounded transition-all"
                        >
                          <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        {menuOpenId === conv.id && (
                          <div className="absolute right-0 top-7 bg-card border border-border rounded-lg shadow-lg py-1 w-36 z-50">
                            <button
                              onClick={(e) => { e.stopPropagation(); startRename(conv); }}
                              className="w-full text-left px-3 py-1.5 text-xs hover:bg-accent flex items-center gap-2"
                            >
                              ✏️ Rename
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id); }}
                              className="w-full text-left px-3 py-1.5 text-xs hover:bg-destructive/10 text-destructive flex items-center gap-2"
                            >
                              🗑️ {tr('logs_delete')}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {!showSidebar && (
            <Button size="sm" variant="ghost" className="self-start mb-2" onClick={() => setShowSidebar(true)}>
              <PanelLeftOpen className="h-4 w-4 mr-1" /> {tr('all_items') || 'Conversations'}
            </Button>
          )}
          <div className="max-w-4xl mx-auto w-full space-y-4 pb-24">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight flex items-center gap-4">
                  <Sparkles className="h-10 w-10 text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.3)]" />
                  {tr('chat_asistant_name') || 'ServiceTrack AI'}
                </h1>
                <p className="text-lg text-muted-foreground font-medium mt-1">{tr('chat_welcome_subtitle')}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-emerald-600 dark:text-emerald-500">∞</div>
                <div className="text-xs text-muted-foreground font-bold uppercase">{tr('chat_limit_unlimited')}</div>
              </div>
            </div>

            {/* Chat Card */}
            <Card className="shadow-2xl border-primary/10 min-h-[500px] flex flex-col overflow-hidden">
              <CardHeader className="border-b bg-accent/30 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-3 text-xl font-black">
                  <Bot className="h-6 w-6 text-primary" />
                  {activeConversationId
                    ? (conversations.find(c => c.id === activeConversationId)?.title || 'Conversation')
                    : (tr('chat_asistant_name') || 'ServiceTrack AI')}
                </CardTitle>
                <CardDescription>{tr('chat_welcome_subtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <div className="max-h-[calc(100vh-380px)] overflow-y-auto p-4 space-y-6">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-6">
                      <div className="text-center space-y-3">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg">
                          <Sparkles className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold">{tr('chat_welcome_title')} 🤖</h3>
                        <p className="text-sm text-muted-foreground max-w-md">{tr('chat_welcome_subtitle')}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-2xl px-4">
                        {SUGGESTED_QUESTIONS.map((sq) => (
                          <button
                            key={sq.question}
                            onClick={() => sendMessage(sq.question)}
                            disabled={isLoading}
                            className="flex items-center gap-3 p-3 rounded-xl border bg-card hover:bg-accent transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="text-xl">{sq.icon}</span>
                            <span className="text-xs font-medium leading-tight">{sq.question}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id || `${message.role}-${message.timestamp.getTime()}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'bg-accent border'
                        }`}>
                          <div className="flex items-start gap-2">
                            {message.role === 'assistant' && (
                              <div className="flex-shrink-0 mt-0.5">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                  <Bot className="h-3 w-3 text-white" />
                                </div>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              {message.role === 'user' ? (
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              ) : (
                                <div className="text-sm prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 dark:prose-invert">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                                </div>
                              )}
                              <div className={`text-[9px] mt-1.5 ${message.role === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                                {message.timestamp.toLocaleTimeString(lang === 'en' ? 'en-US' : 'es-ES', { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                            {message.role === 'user' && (
                              <div className="flex-shrink-0 mt-0.5">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                  <User className="h-3 w-3 text-primary" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-accent border rounded-2xl px-4 py-3 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                        <div className="flex gap-1 ml-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.15s]" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.3s]" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t p-4 bg-accent/30 backdrop-blur-xl rounded-b-xl">
                  <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-3">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={tr('chat_input_placeholder')}
                      disabled={isLoading}
                      className="flex-1 h-14 text-base rounded-2xl focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="h-14 w-14 rounded-2xl"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )}
                    </Button>
                  </form>
                  <div className="flex items-center justify-between mt-3 px-1">
                    <p className="text-[10px] font-medium text-muted-foreground flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" /> {tr('chat_asistant_name') || 'ServiceTrack AI'} {tr('chat_api_error')?.includes('temporarily') ? '' : '— based on jw.org'}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-muted-foreground">
                      <InfinityIcon className="h-3 w-3" /> {tr('chat_limit_unlimited')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
