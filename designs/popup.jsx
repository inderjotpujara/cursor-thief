/* Cursor Thief — Extension popup (~320px wide) */

const Popup = ({ enabled: enabledProp, siteEnabled: siteEnabledProp, stealing: stealingProp, site = "nytimes.com", stealCount = 142, character = "rascal" }) => {
  const roster = window.ROSTER || [];
  const sel = roster.find(r => r.id === character) || roster[0] || { Component: window.Creature || (() => null), name: "Rascal" };
  const [enabled, setEnabled] = React.useState(enabledProp ?? true);
  const [siteEnabled, setSiteEnabled] = React.useState(siteEnabledProp ?? true);

  React.useEffect(() => { if (enabledProp !== undefined) setEnabled(enabledProp); }, [enabledProp]);
  React.useEffect(() => { if (siteEnabledProp !== undefined) setSiteEnabled(siteEnabledProp); }, [siteEnabledProp]);

  const stealing = stealingProp ?? false;
  const active = enabled && siteEnabled;

  return (
    <div style={{
      width: 320,
      background: "#1B1A24",
      color: "#F5EFE2",
      fontFamily: "'Nunito', sans-serif",
      borderRadius: 14,
      overflow: "hidden",
      border: "1.5px solid #2A2620",
      boxShadow: "0 18px 40px -12px rgba(0,0,0,0.55), 0 0 0 1px rgba(232,116,60,0.08)",
      position: "relative",
    }}>
      {/* paper-grain noise */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none",
        backgroundImage: "radial-gradient(#F5EFE2 1px, transparent 1px)",
        backgroundSize: "3px 3px",
      }} />

      {/* HEADER */}
      <div style={{
        position: "relative",
        padding: "18px 18px 14px",
        background: "linear-gradient(180deg, #25232F 0%, #1B1A24 100%)",
        borderBottom: "1px dashed rgba(245,239,226,0.12)",
      }}>
        {/* faint stars */}
        <svg width="100%" height="14" style={{ position: "absolute", top: 6, left: 0, opacity: 0.4 }}>
          <circle cx="40" cy="6" r="1" fill="#E8B547" />
          <circle cx="120" cy="9" r="0.8" fill="#E8B547" />
          <circle cx="200" cy="4" r="1.2" fill="#E8B547" />
          <circle cx="270" cy="8" r="0.9" fill="#E8B547" />
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Mascot circle */}
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #3A3645, #1B1A24)",
            border: "2px solid #E8B547",
            display: "grid", placeItems: "center",
            boxShadow: "0 0 0 4px rgba(232,181,71,0.08), inset 0 0 12px rgba(0,0,0,0.4)",
            flexShrink: 0,
            overflow: "hidden",
          }}>
            <div style={{ transform: "translateY(4px) scale(0.9)" }}>
              {sel && sel.Component ? <sel.Component width={64} /> : <Creature width={64} pose="idle" />}
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Special Elite', monospace",
              fontSize: 22,
              letterSpacing: "0.5px",
              color: "#F5EFE2",
              lineHeight: 1,
              textShadow: "1px 1px 0 #2A2620",
            }}>
              Cursor Thief
            </div>
            <div style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 16,
              color: "#E8B547",
              marginTop: 2,
              lineHeight: 1,
            }}>
              ~ {sel.name || "a tiny menace"} on duty ~
            </div>
          </div>

          {/* version stamp */}
          <div style={{
            fontFamily: "'Special Elite', monospace",
            fontSize: 9,
            color: "#8B8275",
            border: "1px solid #3A3645",
            padding: "3px 6px",
            borderRadius: 3,
            transform: "rotate(3deg)",
            letterSpacing: "0.5px",
          }}>
            v0.4
          </div>
        </div>
      </div>

      {/* STATUS PILL */}
      <div style={{ padding: "14px 18px 0" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 12px",
          borderRadius: 10,
          background: stealing ? "rgba(232,116,60,0.12)" : active ? "rgba(92,110,74,0.14)" : "rgba(139,130,117,0.10)",
          border: `1px solid ${stealing ? "#E8743C" : active ? "#5C6E4A" : "#3A3645"}`,
        }}>
          <span style={{
            position: "relative",
            width: 10, height: 10, borderRadius: "50%",
            background: stealing ? "#E8743C" : active ? "#7A9560" : "#8B8275",
            boxShadow: stealing ? "0 0 10px #E8743C" : active ? "0 0 8px #7A9560" : "none",
          }}>
            {stealing && <span style={{
              position: "absolute", inset: -4, borderRadius: "50%",
              border: "2px solid #E8743C", opacity: 0.5,
              animation: "pulse 1.2s ease-out infinite",
            }} />}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#F5EFE2" }}>
              {stealing ? "Currently stealing..." : active ? "Ready to steal..." : "Snoozing"}
            </div>
            <div style={{ fontSize: 11, color: "#8B8275", marginTop: 1 }}>
              {stealing ? "highlight what you've selected" : active ? "select any text on the page" : "thief is taking a nap"}
            </div>
          </div>
          {stealing && (
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: 18, color: "#E8743C" }}>
              shhh!
            </div>
          )}
        </div>
      </div>

      {/* TOGGLES */}
      <div style={{ padding: "14px 18px 4px", display: "flex", flexDirection: "column", gap: 10 }}>
        <ToggleRow
          label="Thief enabled"
          sub="globally, everywhere"
          icon="🌍"
          on={enabled}
          onChange={setEnabled}
        />
        <ToggleRow
          label={`Active on ${site}`}
          sub={enabled ? "this site only" : "(parent toggle is off)"}
          icon="📍"
          on={siteEnabled}
          disabled={!enabled}
          onChange={setSiteEnabled}
        />
      </div>

      {/* DIVIDER with scribble */}
      <div style={{ padding: "8px 18px" }}>
        <svg viewBox="0 0 280 6" width="100%" height="6" preserveAspectRatio="none">
          <path d="M0 3 Q20 1 40 3 T80 3 T120 3 T160 3 T200 3 T240 3 T280 3"
            fill="none" stroke="#3A3645" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* STATS */}
      <div style={{ padding: "0 18px 14px", display: "flex", gap: 8 }}>
        <Stat number={stealCount} label="texts pilfered" big />
        <Stat number="2.1s" label="avg. heist" />
        <Stat number="0" label="never lost" />
      </div>

      {/* FOOTER */}
      <div style={{
        padding: "10px 18px",
        background: "#15141C",
        borderTop: "1px dashed rgba(245,239,226,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 11,
        color: "#8B8275",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: "#E8B547" }}>made with</span>
          <span style={{ color: "#E8743C" }}>♥</span>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: "#E8B547" }}>and mischief</span>
        </div>
        <a href="#" style={{ color: "#8B8275", textDecoration: "underline", textUnderlineOffset: 2 }}>
          settings
        </a>
      </div>

      <style>{`
        @keyframes pulse {
          0%   { transform: scale(0.6); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const ToggleRow = ({ label, sub, icon, on, onChange, disabled = false }) => (
  <button
    onClick={() => !disabled && onChange(!on)}
    disabled={disabled}
    style={{
      all: "unset",
      cursor: disabled ? "not-allowed" : "pointer",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 12px",
      borderRadius: 10,
      background: "rgba(245,239,226,0.03)",
      border: "1px solid rgba(245,239,226,0.06)",
      opacity: disabled ? 0.5 : 1,
      transition: "background 150ms",
    }}
  >
    <span style={{
      width: 28, height: 28, borderRadius: 7,
      background: "#2A2834",
      display: "grid", placeItems: "center",
      fontSize: 14,
      border: "1px solid rgba(245,239,226,0.06)",
    }}>{icon}</span>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#F5EFE2" }}>{label}</div>
      <div style={{ fontSize: 11, color: "#8B8275", marginTop: 1 }}>{sub}</div>
    </div>
    {/* chunky hand-drawn-ish toggle */}
    <div style={{
      position: "relative",
      width: 42, height: 24,
      borderRadius: 12,
      background: on ? "#E8743C" : "#2A2834",
      border: `1.5px solid ${on ? "#2A2620" : "#3A3645"}`,
      transition: "background 200ms",
      boxShadow: on ? "inset 0 1px 2px rgba(0,0,0,0.3)" : "none",
    }}>
      <div style={{
        position: "absolute",
        top: 1.5, left: on ? 20 : 1.5,
        width: 18, height: 18,
        borderRadius: "50%",
        background: "#F5EFE2",
        border: "1.5px solid #2A2620",
        transition: "left 200ms cubic-bezier(.6,.2,.3,1.4)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
      }} />
    </div>
  </button>
);

const Stat = ({ number, label, big = false }) => (
  <div style={{
    flex: big ? 1.4 : 1,
    padding: "8px 10px",
    borderRadius: 8,
    background: "rgba(245,239,226,0.03)",
    border: "1px dashed rgba(245,239,226,0.10)",
    textAlign: "center",
  }}>
    <div style={{
      fontFamily: "'Special Elite', monospace",
      fontSize: big ? 22 : 16,
      color: "#E8B547",
      lineHeight: 1,
    }}>{number}</div>
    <div style={{
      fontFamily: "'Caveat', cursive",
      fontSize: 13,
      color: "#8B8275",
      marginTop: 4,
      lineHeight: 1,
    }}>{label}</div>
  </div>
);

window.Popup = Popup;
