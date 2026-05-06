/* In-page animation storyboard — 4 states on a sample webpage */

const FakeWebpage = ({ children, label, stateNumber }) => (
  <div style={{
    position: "relative",
    width: "100%",
    height: "100%",
    background: "#FFFFFF",
    fontFamily: "Georgia, serif",
    color: "#1F1F1F",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  }}>
    {/* Browser chrome */}
    <div style={{
      background: "#EDECE8",
      borderBottom: "1px solid #D5D2CB",
      padding: "8px 12px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexShrink: 0,
    }}>
      <div style={{ display: "flex", gap: 6 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
      </div>
      <div style={{
        flex: 1, marginLeft: 8,
        padding: "4px 10px",
        background: "#FFFFFF",
        border: "1px solid #D5D2CB",
        borderRadius: 6,
        fontFamily: "system-ui, sans-serif",
        fontSize: 11,
        color: "#7A7670",
      }}>
        🔒 nytimes.com/2026/05/article
      </div>
      <div style={{
        fontFamily: "'Special Elite', monospace",
        fontSize: 11,
        color: "#1B1A24",
        background: "#E8B547",
        padding: "3px 8px",
        borderRadius: 4,
        border: "1.5px solid #1B1A24",
        transform: "rotate(-1deg)",
        whiteSpace: "nowrap",
      }}>
        ◆ thief armed
      </div>
    </div>

    {/* Page content */}
    <div style={{
      flex: 1,
      padding: "28px 60px 28px",
      position: "relative",
      overflow: "hidden",
    }}>
      {children}
    </div>

    {/* Step label — bottom strip */}
    <div style={{
      position: "absolute",
      bottom: 14, left: 14,
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "#1B1A24",
      color: "#F5EFE2",
      padding: "6px 12px 6px 6px",
      borderRadius: 999,
      border: "1.5px solid #E8B547",
      boxShadow: "3px 3px 0 #2A2620",
      zIndex: 50,
    }}>
      <div style={{
        width: 26, height: 26,
        borderRadius: "50%",
        background: "#E8B547",
        color: "#1B1A24",
        display: "grid", placeItems: "center",
        fontFamily: "'Special Elite', monospace",
        fontSize: 13, fontWeight: 700,
      }}>{stateNumber}</div>
      <div style={{ fontFamily: "'Caveat', cursive", fontSize: 18, lineHeight: 1, paddingRight: 6 }}>
        {label}
      </div>
    </div>
  </div>
);

const ArticleHeader = () => (
  <>
    <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, color: "#9A968F", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>
      Opinion · The Daily
    </div>
    <h1 style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: 30, lineHeight: 1.15,
      margin: "0 0 10px",
      color: "#1F1F1F",
      fontWeight: 800,
    }}>
      The Quiet Joy of Watching Things Disappear
    </h1>
    <div style={{ fontSize: 12, color: "#7A7670", marginBottom: 16, fontFamily: "system-ui, sans-serif" }}>
      By M. Halverson · 8 min read · May 4, 2026
    </div>
  </>
);

// The selectable text — varies by state
const Paragraph = ({ children, style = {} }) => (
  <p style={{
    fontSize: 15,
    lineHeight: 1.65,
    margin: "0 0 14px",
    color: "#1F1F1F",
    ...style,
  }}>{children}</p>
);

// Highlighted selection wrapper
const Selection = ({ children, faded = false }) => (
  <span style={{
    background: faded ? "rgba(180, 200, 255, 0.25)" : "rgba(180, 200, 255, 0.65)",
    color: faded ? "#9A968F" : "#1F1F1F",
    textDecoration: faded ? "line-through" : "none",
    textDecorationColor: faded ? "#B8B5AF" : "transparent",
    textDecorationThickness: faded ? 1.5 : 0,
    padding: "1px 0",
    boxShadow: faded ? "none" : "0 0 0 1px rgba(80, 110, 180, 0.3)",
    transition: "all 200ms",
  }}>{children}</span>
);

// Hand-drawn speech bubble carrying text
const SpeechBubble = ({ text, width = 200 }) => (
  <div style={{ position: "relative", width, fontFamily: "'Caveat', cursive" }}>
    <svg viewBox={`0 0 ${width} 78`} width={width} height={78} style={{ display: "block", overflow: "visible" }}>
      <path
        d={`M 8 6 Q 4 6 4 14 L 4 52 Q 4 60 12 60 L ${width * 0.45} 60 L ${width * 0.5} 74 L ${width * 0.55} 60 L ${width - 8} 60 Q ${width - 4} 60 ${width - 4} 52 L ${width - 4} 14 Q ${width - 4} 6 ${width - 12} 6 Z`}
        fill="#FFFEF8"
        stroke="#2A2620"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d={`M 10 12 Q 8 12 8 18 L 8 50`}
        fill="none" stroke="#2A2620" strokeWidth="0.8" opacity="0.4"
      />
    </svg>
    <div style={{
      position: "absolute", inset: "8px 14px 22px 14px",
      fontSize: 15,
      color: "#2A2620",
      lineHeight: 1.15,
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      textOverflow: "ellipsis",
    }}>
      "{text}"
    </div>
  </div>
);

// === STATE 1 ===
const State1 = () => (
  <FakeWebpage label="user selects text" stateNumber={1}>
    <ArticleHeader />
    <Paragraph>
      In the late afternoon, when the light goes amber and the windows turn into mirrors, I find a strange comfort in losing things on purpose.
    </Paragraph>
    <Paragraph>
      <Selection>The smallest pleasures are often borrowed — a passing word, a half-heard joke, a pebble pocketed and forgotten by Tuesday.</Selection> They never really belong to us, and that's the point.
    </Paragraph>
    <Paragraph style={{ color: "#7A7670" }}>
      Continue reading →
    </Paragraph>

    {/* Cursor */}
    <div style={{
      position: "absolute",
      left: 380, top: 222,
      pointerEvents: "none",
    }}>
      <svg width="22" height="28" viewBox="0 0 22 28">
        <path d="M2 2 L2 22 L8 18 L11 26 L14 25 L11 17 L18 17 Z"
          fill="#FFFFFF" stroke="#1F1F1F" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  </FakeWebpage>
);

// === STATE 2 ===
const State2 = () => (
  <FakeWebpage label="creature scurries in" stateNumber={2}>
    <ArticleHeader />
    <Paragraph>
      In the late afternoon, when the light goes amber and the windows turn into mirrors, I find a strange comfort in losing things on purpose.
    </Paragraph>
    <Paragraph>
      <Selection>The smallest pleasures are often borrowed — a passing word, a half-heard joke, a pebble pocketed and forgotten by Tuesday.</Selection> They never really belong to us, and that's the point.
    </Paragraph>
    <Paragraph style={{ color: "#7A7670" }}>
      Continue reading →
    </Paragraph>

    {/* Creature scurrying in from right */}
    <div style={{
      position: "absolute",
      right: 30,
      top: 200,
      transform: "rotate(-4deg)",
    }}>
      <Creature width={88} pose="run" flip />
    </div>

    {/* Dust trail behind */}
    <svg style={{ position: "absolute", right: 110, top: 250 }} width="80" height="40">
      <ellipse cx="20" cy="20" rx="14" ry="6" fill="#D5D2CB" opacity="0.5" />
      <ellipse cx="40" cy="22" rx="10" ry="4" fill="#D5D2CB" opacity="0.4" />
      <ellipse cx="58" cy="20" rx="6" ry="3" fill="#D5D2CB" opacity="0.3" />
      <path d="M5 12 Q10 10 15 14" fill="none" stroke="#7A7670" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M28 8 Q34 6 40 12" fill="none" stroke="#7A7670" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>

    {/* Surprised marks above selection */}
    <div style={{
      position: "absolute",
      left: 380, top: 200,
      fontFamily: "'Caveat', cursive",
      fontSize: 22,
      color: "#E8743C",
      transform: "rotate(-8deg)",
      fontWeight: 700,
    }}>!?</div>
  </FakeWebpage>
);

// === STATE 3 ===
const State3 = () => (
  <FakeWebpage label="off he goes!" stateNumber={3}>
    <ArticleHeader />
    <Paragraph>
      In the late afternoon, when the light goes amber and the windows turn into mirrors, I find a strange comfort in losing things on purpose.
    </Paragraph>
    <Paragraph>
      <Selection faded>The smallest pleasures are often borrowed — a passing word, a half-heard joke, a pebble pocketed and forgotten by Tuesday.</Selection> They never really belong to us, and that's the point.
    </Paragraph>
    <Paragraph style={{ color: "#7A7670" }}>
      Continue reading →
    </Paragraph>

    {/* Empty hole / poof where text was */}
    <svg style={{ position: "absolute", left: 200, top: 196 }} width="60" height="40">
      <path d="M5 25 Q8 18 14 22 Q12 12 20 16 Q24 8 30 14 Q38 10 38 20 Q46 18 44 26 Q50 30 42 34 Q40 40 32 36 Q26 42 22 34 Q14 38 12 32 Q4 32 5 25"
        fill="none" stroke="#9A968F" strokeWidth="1.5" strokeLinecap="round" />
    </svg>

    {/* Creature running off-screen LEFT carrying speech bubble */}
    <div style={{
      position: "absolute",
      left: -40,
      top: 130,
      display: "flex",
      alignItems: "flex-start",
      gap: 4,
    }}>
      {/* Speech bubble above creature */}
      <div style={{ marginTop: -10, marginLeft: 30 }}>
        <SpeechBubble text="The smallest pleasures are often borrowed — a passing word, a half-heard..." width={240} />
      </div>
    </div>

    <div style={{
      position: "absolute",
      left: -20,
      top: 196,
      transform: "rotate(6deg)",
    }}>
      <Creature width={92} pose="carry" />
    </div>

    {/* Dust trail behind (to the right) */}
    <svg style={{ position: "absolute", left: 70, top: 246 }} width="120" height="40">
      <ellipse cx="14" cy="20" rx="12" ry="5" fill="#D5D2CB" opacity="0.55" />
      <ellipse cx="40" cy="22" rx="14" ry="6" fill="#D5D2CB" opacity="0.45" />
      <ellipse cx="68" cy="22" rx="10" ry="4" fill="#D5D2CB" opacity="0.35" />
      <ellipse cx="92" cy="20" rx="7" ry="3" fill="#D5D2CB" opacity="0.25" />
      <path d="M22 10 Q28 8 34 12" fill="none" stroke="#7A7670" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M52 6 Q58 4 64 10" fill="none" stroke="#7A7670" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M84 12 Q90 10 96 14" fill="none" stroke="#7A7670" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>

    {/* Motion blur lines behind creature */}
    <svg style={{ position: "absolute", left: 80, top: 210 }} width="80" height="60">
      <line x1="0" y1="10" x2="40" y2="10" stroke="#E8743C" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="10" y1="28" x2="50" y2="28" stroke="#E8743C" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="0" y1="46" x2="36" y2="46" stroke="#E8743C" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  </FakeWebpage>
);

// === STATE 4 ===
const State4 = () => (
  <FakeWebpage label="returned, no harm done" stateNumber={4}>
    <ArticleHeader />
    <Paragraph>
      In the late afternoon, when the light goes amber and the windows turn into mirrors, I find a strange comfort in losing things on purpose.
    </Paragraph>
    <Paragraph>
      <Selection>The smallest pleasures are often borrowed — a passing word, a half-heard joke, a pebble pocketed and forgotten by Tuesday.</Selection> They never really belong to us, and that's the point.
    </Paragraph>
    <Paragraph style={{ color: "#7A7670" }}>
      Continue reading →
    </Paragraph>

    {/* Creature scurrying away to the right, smaller, sack empty-ish */}
    <div style={{
      position: "absolute",
      right: 20,
      top: 290,
      transform: "rotate(2deg)",
      opacity: 0.95,
    }}>
      <Creature width={68} pose="run" />
    </div>

    {/* Tiny "thanks!" handwritten note left behind near selection */}
    <div style={{
      position: "absolute",
      left: 540, top: 252,
      fontFamily: "'Caveat', cursive",
      fontSize: 20,
      color: "#E8743C",
      transform: "rotate(-6deg)",
      fontWeight: 700,
    }}>
      thx! ♥
      <svg width="40" height="20" style={{ display: "block", marginTop: -4 }}>
        <path d="M2 18 Q15 4 30 14 L26 10 M30 14 L24 16" fill="none" stroke="#E8743C" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>

    {/* Sparkles around restored selection */}
    <svg style={{ position: "absolute", left: 60, top: 188, pointerEvents: "none" }} width="500" height="50">
      {[
        [10, 10], [80, 6], [180, 12], [280, 4], [380, 10], [460, 8],
        [40, 38], [140, 36], [240, 40], [340, 36], [440, 40],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z"
            fill="#E8B547" opacity={0.7 - (i % 3) * 0.15} />
        </g>
      ))}
    </svg>

    {/* Dust trail behind departing creature */}
    <svg style={{ position: "absolute", right: 90, top: 326 }} width="80" height="30">
      <ellipse cx="14" cy="14" rx="10" ry="4" fill="#D5D2CB" opacity="0.4" />
      <ellipse cx="36" cy="16" rx="8" ry="3" fill="#D5D2CB" opacity="0.3" />
      <ellipse cx="56" cy="14" rx="5" ry="2" fill="#D5D2CB" opacity="0.2" />
    </svg>
  </FakeWebpage>
);

window.State1 = State1;
window.State2 = State2;
window.State3 = State3;
window.State4 = State4;
