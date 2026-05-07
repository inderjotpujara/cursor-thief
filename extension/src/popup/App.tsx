import { useState, useEffect, useCallback } from "react";
import browser from "webextension-polyfill";
import type { Settings, Stats, Message, CharacterId } from "../shared/types";
import { CHARACTERS, LINGER_PRESETS } from "../shared/types";
import { onStatsChanged } from "../shared/storage";
import { send } from "../shared/messages";
import { CreatureSVG } from "./CreatureSVG";
import { Picker } from "./Picker";

type View = "main" | "picker";

type AppState = {
  settings: Settings;
  stats: Stats;
  site: string;
};

// ── inner components ──────────────────────────────────────────────────────────

interface ToggleRowProps {
  label: string;
  sub: string;
  icon: string;
  on: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
}

function ToggleRow({ label, sub, icon, on, onChange, disabled = false }: ToggleRowProps) {
  return (
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
        width: "100%",
      }}
    >
      <span style={{
        width: 28,
        height: 28,
        borderRadius: 7,
        background: "#2A2834",
        display: "grid",
        placeItems: "center",
        fontSize: 14,
        border: "1px solid rgba(245,239,226,0.06)",
        flexShrink: 0,
      }}>
        {icon}
      </span>

      <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#F5EFE2" }}>{label}</div>
        <div style={{ fontSize: 11, color: "#8B8275", marginTop: 1 }}>{sub}</div>
      </div>

      {/* chunky hand-drawn-ish toggle */}
      <div style={{
        position: "relative",
        width: 42,
        height: 24,
        borderRadius: 12,
        background: on ? "#E8743C" : "#2A2834",
        border: `1.5px solid ${on ? "#2A2620" : "#3A3645"}`,
        transition: "background 200ms",
        boxShadow: on ? "inset 0 1px 2px rgba(0,0,0,0.3)" : "none",
        flexShrink: 0,
      }}>
        <div style={{
          position: "absolute",
          top: 1.5,
          left: on ? 20 : 1.5,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#F5EFE2",
          border: "1.5px solid #2A2620",
          transition: "left 200ms cubic-bezier(.6,.2,.3,1.4)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
        }} />
      </div>
    </button>
  );
}

interface LingerPickerProps {
  value: number;
  onChange: (next: number) => void;
}

function LingerPicker({ value, onChange }: LingerPickerProps) {
  return (
    <div style={{
      padding: "10px 12px",
      borderRadius: 10,
      background: "rgba(245,239,226,0.03)",
      border: "1px solid rgba(245,239,226,0.06)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 8,
      }}>
        <span style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          background: "#2A2834",
          display: "grid",
          placeItems: "center",
          fontSize: 14,
          border: "1px solid rgba(245,239,226,0.06)",
          flexShrink: 0,
        }}>
          ⏱
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#F5EFE2" }}>
            Reading time
          </div>
          <div style={{ fontSize: 11, color: "#8B8275", marginTop: 1 }}>
            how long the thief lingers post-steal
          </div>
        </div>
      </div>

      <div style={{
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
      }}>
        {LINGER_PRESETS.map(preset => {
          const isOn = value === preset.value;
          return (
            <button
              key={preset.value}
              onClick={() => onChange(preset.value)}
              style={{
                all: "unset",
                cursor: "pointer",
                flex: 1,
                minWidth: 50,
                textAlign: "center",
                padding: "5px 8px",
                borderRadius: 6,
                fontFamily: "'Caveat', cursive",
                fontSize: 14,
                lineHeight: 1.05,
                background: isOn ? "rgba(232,116,60,0.18)" : "rgba(245,239,226,0.04)",
                border: `1.5px solid ${isOn ? "#E8743C" : "rgba(245,239,226,0.10)"}`,
                color: isOn ? "#F5EFE2" : "#8B8275",
                fontWeight: isOn ? 700 : 500,
                transition: "all 120ms",
              }}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface StatProps {
  number: string | number;
  label: string;
  big?: boolean;
}

function Stat({ number, label, big = false }: StatProps) {
  return (
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
      }}>
        {number}
      </div>
      <div style={{
        fontFamily: "'Caveat', cursive",
        fontSize: 13,
        color: "#8B8275",
        marginTop: 4,
        lineHeight: 1,
      }}>
        {label}
      </div>
    </div>
  );
}

// ── loading skeleton ──────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div style={{
      width: 320,
      background: "#1B1A24",
      borderRadius: 14,
      border: "1.5px solid #2A2620",
      overflow: "hidden",
      padding: "18px",
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}>
      {[56, 24, 24, 32].map((h, i) => (
        <div key={i} style={{
          height: h,
          borderRadius: 8,
          background: "rgba(245,239,226,0.05)",
          animation: "pulse 1.4s ease-in-out infinite",
        }} />
      ))}
    </div>
  );
}

// ── export helper ─────────────────────────────────────────────────────────────

function exportStats(stats: Stats): void {
  const now = new Date();
  const avgHeistMs = stats.stealCount > 0
    ? Math.round(stats.totalHeistMs / stats.stealCount)
    : 0;

  const payload = {
    version: "0.1.0",
    exportedAt: now.toISOString(),
    stealCount: stats.stealCount,
    totalHeistMs: stats.totalHeistMs,
    avgHeistMs,
    lastHeistAt: stats.lastHeistAt ?? null,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const pad = (n: number) => String(n).padStart(2, "0");
  const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const filename = `cursor-thief-stats-${dateStr}.json`;

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  // Revoke the object URL after a short delay to allow the download to start
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ── main view ─────────────────────────────────────────────────────────────────

interface MainViewProps {
  state: AppState;
  onToggleEnabled: () => void;
  onToggleSiteEnabled: () => void;
  onSetLinger: (ms: number) => void;
  onOpenPicker: () => void;
}

function MainView({ state, onToggleEnabled, onToggleSiteEnabled, onSetLinger, onOpenPicker }: MainViewProps) {
  const { settings, stats, site } = state;
  const { enabled, selectedCharacter } = settings;

  const siteEnabled = settings.perSiteOverrides[site] !== false;
  const active = enabled && siteEnabled;
  const characterMeta = CHARACTERS[selectedCharacter];

  const avg = stats.stealCount > 0
    ? (stats.totalHeistMs / stats.stealCount / 1000).toFixed(1) + "s"
    : "—";

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
        position: "absolute",
        inset: 0,
        opacity: 0.06,
        pointerEvents: "none",
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
          {/* Mascot circle — click to open picker */}
          <button
            onClick={onOpenPicker}
            style={{
              all: "unset",
              cursor: "pointer",
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "radial-gradient(circle at 30% 30%, #3A3645, #1B1A24)",
              border: "2px solid #E8B547",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 0 0 4px rgba(232,181,71,0.08), inset 0 0 12px rgba(0,0,0,0.4)",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <div style={{ transform: "translateY(4px) scale(0.9)" }}>
              <CreatureSVG id={selectedCharacter} pose="idle" width={64} />
            </div>
          </button>

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
              ~ {characterMeta.name} on duty ~
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
            flexShrink: 0,
          }}>
            v0.4
          </div>
        </div>
      </div>

      {/* STATUS PILL */}
      <div style={{ padding: "14px 18px 0" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          borderRadius: 10,
          background: active ? "rgba(92,110,74,0.14)" : "rgba(139,130,117,0.10)",
          border: `1px solid ${active ? "#5C6E4A" : "#3A3645"}`,
        }}>
          <span style={{
            position: "relative",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: active ? "#7A9560" : "#8B8275",
            boxShadow: active ? "0 0 8px #7A9560" : "none",
            flexShrink: 0,
          }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#F5EFE2" }}>
              {active ? "Ready to steal..." : "Snoozing"}
            </div>
            <div style={{ fontSize: 11, color: "#8B8275", marginTop: 1 }}>
              {active ? "select any text on the page" : "thief is taking a nap"}
            </div>
          </div>
        </div>
      </div>

      {/* TOGGLES */}
      <div style={{ padding: "14px 18px 4px", display: "flex", flexDirection: "column", gap: 10 }}>
        <ToggleRow
          label="Thief enabled"
          sub="globally, everywhere"
          icon="🌍"
          on={enabled}
          onChange={() => onToggleEnabled()}
        />
        <ToggleRow
          label={`Active on ${site}`}
          sub={enabled ? "this site only" : "(parent toggle is off)"}
          icon="📍"
          on={siteEnabled}
          disabled={!enabled}
          onChange={() => onToggleSiteEnabled()}
        />
        <LingerPicker
          value={settings.lingerMs}
          onChange={onSetLinger}
        />
      </div>

      {/* DIVIDER with scribble */}
      <div style={{ padding: "8px 18px" }}>
        <svg viewBox="0 0 280 6" width="100%" height="6" preserveAspectRatio="none">
          <path
            d="M0 3 Q20 1 40 3 T80 3 T120 3 T160 3 T200 3 T240 3 T280 3"
            fill="none"
            stroke="#3A3645"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      {/* STATS */}
      <div style={{ padding: "0 18px 14px", display: "flex", gap: 8 }}>
        <Stat number={stats.stealCount} label="texts pilfered" big />
        <Stat number={avg} label="avg. heist" />
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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => exportStats(stats)}
            style={{
              all: "unset",
              cursor: "pointer",
              color: "#8B8275",
              textDecoration: "underline",
              textUnderlineOffset: 2,
              fontSize: 11,
            }}
          >
            export stats
          </button>
          <span style={{ color: "#3A3645" }}>·</span>
          <button
            onClick={onOpenPicker}
            style={{
              all: "unset",
              cursor: "pointer",
              color: "#8B8275",
              textDecoration: "underline",
              textUnderlineOffset: 2,
              fontSize: 11,
            }}
          >
            settings
          </button>
        </div>
      </div>
    </div>
  );
}

// ── App root ──────────────────────────────────────────────────────────────────

export function App() {
  const [appState, setAppState] = useState<AppState | null>(null);
  const [view, setView] = useState<View>("main");

  // Load initial state from background
  useEffect(() => {
    send({ type: "GET_STATE" }).then((response) => {
      const msg = response as Message;
      if (msg.type === "STATE") {
        setAppState({ settings: msg.settings, stats: msg.stats, site: msg.site });
      }
    }).catch(console.error);
  }, []);

  // Subscribe to stats changes from storage
  useEffect(() => {
    return onStatsChanged((stats) => {
      setAppState((prev) => prev ? { ...prev, stats } : prev);
    });
  }, []);

  // Subscribe to settings changes from runtime messages
  useEffect(() => {
    const handler = (raw: unknown) => {
      const msg = raw as Message;
      if (msg.type === "SETTINGS_CHANGED") {
        setAppState((prev) => prev ? { ...prev, settings: msg.settings } : prev);
      }
    };
    browser.runtime.onMessage.addListener(handler);
    return () => browser.runtime.onMessage.removeListener(handler);
  }, []);

  const handleToggleEnabled = useCallback(() => {
    if (!appState) return;
    const next = !appState.settings.enabled;
    setAppState((prev) => prev
      ? { ...prev, settings: { ...prev.settings, enabled: next } }
      : prev
    );
    send({ type: "SET_ENABLED", value: next }).catch(console.error);
  }, [appState]);

  const handleToggleSiteEnabled = useCallback(() => {
    if (!appState) return;
    const { site, settings } = appState;
    const current = settings.perSiteOverrides[site] !== false;
    const next = !current;
    setAppState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        settings: {
          ...prev.settings,
          perSiteOverrides: { ...prev.settings.perSiteOverrides, [site]: next },
        },
      };
    });
    send({ type: "SET_SITE_ENABLED", hostname: site, value: next }).catch(console.error);
  }, [appState]);

  const handleSelectCharacter = useCallback((id: CharacterId) => {
    setAppState((prev) => prev
      ? { ...prev, settings: { ...prev.settings, selectedCharacter: id } }
      : prev
    );
    send({ type: "SET_CHARACTER", value: id }).catch(console.error);
  }, []);

  const handleSetLinger = useCallback((ms: number) => {
    setAppState((prev) => prev
      ? { ...prev, settings: { ...prev.settings, lingerMs: ms } }
      : prev
    );
    send({ type: "SET_LINGER", value: ms }).catch(console.error);
  }, []);

  if (!appState) {
    return <LoadingSkeleton />;
  }

  if (view === "picker") {
    return (
      <Picker
        selected={appState.settings.selectedCharacter}
        onSelect={handleSelectCharacter}
        onBack={() => setView("main")}
      />
    );
  }

  return (
    <MainView
      state={appState}
      onToggleEnabled={handleToggleEnabled}
      onToggleSiteEnabled={handleToggleSiteEnabled}
      onSetLinger={handleSetLinger}
      onOpenPicker={() => setView("picker")}
    />
  );
}
