import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Shuffle, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ALL_CHARACTERS, type HindiCharacter } from "../constants/hindi";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Colors defined as literals for Canvas API (cannot use CSS variables)
const CANVAS_GUIDE_COLOR = "rgba(196, 110, 55, 0.12)";
const CANVAS_STROKE_COLOR = "#3a2010";
const CANVAS_STROKE_COLOR_DARK = "#f5e6d0";

export function WritingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [characters] = useState<HindiCharacter[]>(() =>
    shuffle(ALL_CHARACTERS),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const currentChar = characters[currentIndex];

  useEffect(() => {
    setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Faint grid lines
    ctx.strokeStyle = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Center cross-hairs
    ctx.strokeStyle = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Guide character
    ctx.font = `bold ${Math.min(w, h) * 0.62}px 'Noto Sans Devanagari', sans-serif`;
    ctx.fillStyle = CANVAS_GUIDE_COLOR;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(currentChar.char, w / 2, h / 2);
  }, [currentChar, isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawGuide();
    });
    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, [drawGuide]);

  useEffect(() => {
    drawGuide();
    setHasDrawn(false);
  }, [drawGuide]);

  const getPos = (
    e: React.MouseEvent | React.TouchEvent,
  ): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      const touch = e.touches[0];
      if (!touch) return null;
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPos(e);
    if (!pos) return;
    setIsDrawing(true);
    lastPoint.current = pos;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? CANVAS_STROKE_COLOR_DARK : CANVAS_STROKE_COLOR;
    ctx.fill();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    if (!pos || !lastPoint.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = isDark ? CANVAS_STROKE_COLOR_DARK : CANVAS_STROKE_COLOR;
    ctx.lineWidth = 3.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    lastPoint.current = pos;
    if (!hasDrawn) setHasDrawn(true);
  };

  const stopDraw = () => {
    setIsDrawing(false);
    lastPoint.current = null;
  };

  const handleClear = () => {
    drawGuide();
    setHasDrawn(false);
  };

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(characters.length - 1, index));
    setCurrentIndex(clamped);
  };

  const goToShuffle = () => {
    const next = Math.floor(Math.random() * characters.length);
    setCurrentIndex(next);
  };

  return (
    <div className="min-h-screen pb-24 flex flex-col">
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <h1 className="font-display text-2xl text-foreground mb-1">
          Writing Practice
        </h1>
        <p className="text-sm text-muted-foreground">
          Trace the character on the canvas below
        </p>
      </div>

      {/* Character info */}
      <div className="px-5 mb-4">
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-4">
            <span className="font-devanagari text-5xl font-bold text-primary leading-none">
              {currentChar.char}
            </span>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {currentChar.transliteration}
              </p>
              <p className="text-xs text-muted-foreground">
                Character {currentIndex + 1} of {characters.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center
                text-muted-foreground hover:bg-muted/70 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={goToShuffle}
              className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center
                text-accent hover:bg-accent/25 transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(currentIndex + 1)}
              disabled={currentIndex === characters.length - 1}
              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center
                text-muted-foreground hover:bg-muted/70 disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-5 mb-3">
        <p className="text-xs text-muted-foreground text-center bg-muted/40 rounded-lg py-2 px-3">
          The faint character is your guide — draw on top to practice the stroke
          order
        </p>
      </div>

      {/* Canvas area */}
      <div className="px-5 flex-1">
        <div
          className="relative w-full rounded-2xl overflow-hidden border-2 border-border bg-card shadow-card"
          style={{ aspectRatio: "1 / 1" }}
        >
          <canvas
            ref={canvasRef}
            className="writing-canvas w-full h-full block"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={(e) => {
              e.preventDefault();
              startDraw(e);
            }}
            onTouchMove={(e) => {
              e.preventDefault();
              draw(e);
            }}
            onTouchEnd={stopDraw}
          />
          {!hasDrawn && (
            <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none">
              <span className="text-xs text-muted-foreground/50 bg-background/70 px-3 py-1.5 rounded-full">
                ✏️ Start drawing here
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="px-5 mt-4">
        <Button
          variant="outline"
          onClick={handleClear}
          className="w-full h-12 rounded-xl border-border text-muted-foreground hover:text-foreground gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Clear Canvas
        </Button>
      </div>
    </div>
  );
}
