import { useState, useRef, useEffect } from "react";
import { Scale, X, Send, Loader2, ChevronDown, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "¿Qué es un guardrail y cómo se activa?",
  "¿Qué sistemas son de alto riesgo según el AI Act?",
  "¿Cómo interpreto una no conformidad mayor en auditoría?",
  "¿Qué significa TST válido en un certificado de evidencia?",
  "¿Qué obligaciones impone el AI Act art. 14 sobre supervisión humana?",
  "¿Cómo actúo si se activa GRL-001?",
];

// Detect if we're running in development (Vite dev server) or production (Flask)
const API_BASE = import.meta.env.DEV
  ? "http://localhost:8080"
  : "";

export function HarveyChat() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hola, soy **Harvey**, tu asistente jurídico y regulatorio para el AIMS Console.\n\nPuedo ayudarte a interpretar la normativa aplicable (AI Act, MiFID II, RGPD, AML...), entender los guardrails, gestionar incidentes o navegar por cualquier módulo del sistema.\n\n¿En qué puedo ayudarte?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && !minimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, minimized]);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, minimized]);

  const sendMessage = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userText },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "No se ha podido obtener respuesta. Inténtalo de nuevo.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Error de conexión con Harvey. Verifica que el servidor está activo e inténtalo de nuevo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split("\n")
      .map((line, i) => {
        // Bold
        line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        // Italic
        line = line.replace(/\*(.*?)\*/g, "<em>$1</em>");
        // Inline code
        line = line.replace(/`(.*?)`/g, '<code class="bg-[hsl(var(--g-surface-subtle))] px-1 rounded text-xs font-mono">$1</code>');
        return `<span key="${i}">${line}</span>`;
      })
      .join("<br />");
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] shadow-lg hover:shadow-xl hover:border-[hsl(var(--g-border-strong))] transition-all duration-200 group"
          aria-label="Abrir asistente Harvey"
        >
          <div className="w-7 h-7 rounded-full bg-[hsl(var(--sidebar-accent))] flex items-center justify-center flex-shrink-0">
            <Scale className="h-4 w-4 text-[hsl(var(--sidebar-foreground))]" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs font-semibold text-[hsl(var(--g-text-primary))] leading-tight">Harvey</span>
            <span className="text-[10px] text-[hsl(var(--g-text-secondary))] leading-tight">Asistente jurídico IA</span>
          </div>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          className={cn(
            "fixed bottom-6 right-6 z-50 flex flex-col bg-[hsl(var(--g-surface-base))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-lg)] shadow-2xl transition-all duration-200",
            minimized ? "w-72 h-14" : "w-[400px] h-[580px]"
          )}
          role="dialog"
          aria-label="Asistente Harvey"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[hsl(var(--g-border-default))] bg-[hsl(var(--g-surface-card))] rounded-t-[var(--g-radius-lg)] flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[hsl(var(--sidebar-accent))] flex items-center justify-center flex-shrink-0">
                <Scale className="h-4 w-4 text-[hsl(var(--sidebar-foreground))]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[hsl(var(--g-text-primary))] leading-tight">Harvey</p>
                <p className="text-[10px] text-[hsl(var(--g-text-secondary))] leading-tight">Asistente jurídico · AIMS Console</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized(!minimized)}
                className="p-1.5 rounded hover:bg-[hsl(var(--g-surface-hover))] text-[hsl(var(--g-text-secondary))] transition-colors"
                aria-label={minimized ? "Expandir" : "Minimizar"}
              >
                {minimized ? <ChevronDown className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded hover:bg-[hsl(var(--g-surface-hover))] text-[hsl(var(--g-text-secondary))] transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-garrigues">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-[hsl(var(--sidebar-accent))] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                        <Scale className="h-3.5 w-3.5 text-[hsl(var(--sidebar-foreground))]" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[85%] rounded-[var(--g-radius-md)] px-3 py-2 text-sm leading-relaxed",
                        msg.role === "user"
                          ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-foreground))]"
                          : "bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] text-[hsl(var(--g-text-primary))]"
                      )}
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                    />
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="w-6 h-6 rounded-full bg-[hsl(var(--sidebar-accent))] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                      <Scale className="h-3.5 w-3.5 text-[hsl(var(--sidebar-foreground))]" />
                    </div>
                    <div className="bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] px-3 py-2 flex items-center gap-2">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-[hsl(var(--g-text-secondary))]" />
                      <span className="text-xs text-[hsl(var(--g-text-secondary))]">Harvey está analizando...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested questions (only when only the initial message) */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-col gap-1.5">
                  <p className="text-[10px] text-[hsl(var(--g-text-secondary))] uppercase tracking-wider mb-1">Preguntas frecuentes</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-xs px-2.5 py-1.5 rounded-full bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] text-[hsl(var(--g-text-secondary))] hover:border-[hsl(var(--g-border-strong))] hover:text-[hsl(var(--g-text-primary))] transition-colors text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-3 border-t border-[hsl(var(--g-border-default))] flex-shrink-0">
                <div className="flex items-end gap-2 bg-[hsl(var(--g-surface-card))] border border-[hsl(var(--g-border-default))] rounded-[var(--g-radius-md)] px-3 py-2 focus-within:border-[hsl(var(--g-border-strong))] transition-colors">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Pregunta sobre normativa, guardrails, incidentes..."
                    className="flex-1 bg-transparent text-sm text-[hsl(var(--g-text-primary))] placeholder:text-[hsl(var(--g-text-secondary))] resize-none outline-none min-h-[20px] max-h-[80px] leading-5"
                    rows={1}
                    disabled={loading}
                    aria-label="Mensaje para Harvey"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || loading}
                    className="flex-shrink-0 p-1.5 rounded-[var(--g-radius-sm)] bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-foreground))] hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                    aria-label="Enviar mensaje"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-[hsl(var(--g-text-secondary))] mt-1.5 text-center">
                  Harvey · Asistente jurídico IA · No sustituye asesoramiento profesional
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
