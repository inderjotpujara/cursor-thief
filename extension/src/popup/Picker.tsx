import type { CharacterId } from "../shared/types";
import { CHARACTER_IDS, CHARACTERS } from "../shared/types";
import { CreatureSVG } from "./CreatureSVG";

interface PickerProps {
  selected: CharacterId;
  onSelect: (id: CharacterId) => void;
  onBack: () => void;
}

export function Picker({ selected, onSelect, onBack }: PickerProps) {
  const selectedMeta = CHARACTERS[selected];

  return (
    <div style={{
      width: 320,
      background: "#1B1A24",
      color: "#F5EFE2",
      fontFamily: "'Nunito', sans-serif",
      borderRadius: 14,
      overflow: "hidden",
      border: "1.5px solid #2A2620",
      boxShadow: "0 18px 40px -12px rgba(0,0,0,0.55)",
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
        padding: "14px 18px 12px",
        background: "linear-gradient(180deg, #25232F 0%, #1B1A24 100%)",
        borderBottom: "1px dashed rgba(245,239,226,0.12)",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <button
          onClick={onBack}
          style={{
            all: "unset",
            cursor: "pointer",
            width: 24,
            height: 24,
            borderRadius: 6,
            background: "rgba(245,239,226,0.06)",
            display: "grid",
            placeItems: "center",
            fontSize: 14,
            color: "#8B8275",
            flexShrink: 0,
          }}
        >
          ←
        </button>

        <div style={{
          fontFamily: "'Special Elite', monospace",
          fontSize: 16,
          letterSpacing: "0.5px",
          flex: 1,
        }}>
          Pick your thief
        </div>

        <div style={{
          fontFamily: "'Caveat', cursive",
          fontSize: 14,
          color: "#E8B547",
          flexShrink: 0,
        }}>
          {CHARACTER_IDS.length} rogues
        </div>
      </div>

      {/* GRID */}
      <div style={{
        padding: "14px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
      }}>
        {CHARACTER_IDS.map((id) => {
          const meta = CHARACTERS[id];
          const isSelected = id === selected;

          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              style={{
                all: "unset",
                cursor: "pointer",
                position: "relative",
                padding: "10px 8px 8px",
                borderRadius: 10,
                background: isSelected ? "rgba(232,181,71,0.10)" : "rgba(245,239,226,0.03)",
                border: `1.5px solid ${isSelected ? "#E8B547" : "rgba(245,239,226,0.08)"}`,
                boxShadow: isSelected
                  ? "0 0 0 3px rgba(232,181,71,0.18), inset 0 0 12px rgba(232,181,71,0.08)"
                  : "none",
                transition: "all 150ms",
                textAlign: "center",
              }}
            >
              {/* selected check badge */}
              {isSelected && (
                <div style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#E8B547",
                  border: "1.5px solid #2A2620",
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "'Special Elite', monospace",
                  fontSize: 12,
                  color: "#2A2620",
                  fontWeight: 700,
                }}>
                  ✓
                </div>
              )}

              {/* creature */}
              <div style={{
                background: "radial-gradient(circle at 50% 60%, #2A2834 0%, #15141C 100%)",
                borderRadius: 8,
                padding: "8px 4px 4px",
                marginBottom: 6,
                height: 78,
                display: "grid",
                placeItems: "center",
                border: "1px solid rgba(245,239,226,0.05)",
                overflow: "hidden",
              }}>
                <CreatureSVG id={id} width={70} />
              </div>

              {/* name */}
              <div style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 22,
                lineHeight: 1,
                color: isSelected ? "#E8B547" : "#F5EFE2",
                fontWeight: 700,
              }}>
                {meta.name}
              </div>

              {/* personality tag */}
              <div style={{
                fontSize: 10,
                color: "#8B8275",
                marginTop: 3,
                lineHeight: 1.2,
                letterSpacing: "0.2px",
                fontStyle: "italic",
              }}>
                {meta.tag}
              </div>
            </button>
          );
        })}
      </div>

      {/* FOOTER — current pick */}
      <div style={{
        padding: "10px 14px",
        background: "#15141C",
        borderTop: "1px dashed rgba(245,239,226,0.08)",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <div style={{
          fontFamily: "'Caveat', cursive",
          fontSize: 15,
          color: "#8B8275",
        }}>
          on duty:
        </div>
        <div style={{
          fontFamily: "'Special Elite', monospace",
          fontSize: 13,
          color: "#E8743C",
          flex: 1,
        }}>
          {selectedMeta.name}
        </div>
        <button
          onClick={onBack}
          style={{
            all: "unset",
            cursor: "pointer",
            fontFamily: "'Special Elite', monospace",
            fontSize: 11,
            padding: "5px 10px",
            background: "#E8743C",
            color: "#1B1A24",
            borderRadius: 6,
            border: "1.5px solid #2A2620",
            fontWeight: 700,
          }}
        >
          save
        </button>
      </div>
    </div>
  );
}
