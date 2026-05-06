/* The Cursor Thief — a tiny raccoon-goblin with a burlap sack.
   Reusable SVG component, scales via width/height props. */

const Creature = ({ width = 120, pose = "idle", flip = false, sackFull = false, style = {} }) => {
  // pose: "idle" | "run" | "carry" | "drop"
  const transform = flip ? "scale(-1,1) translate(-200,0)" : "";

  return (
    <svg
      viewBox="0 0 200 180"
      width={width}
      style={{ overflow: "visible", ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={transform}>
        {/* shadow */}
        <ellipse cx="100" cy="168" rx="48" ry="5" fill="#2A2620" opacity="0.18" />

        {/* TAIL — striped, behind body */}
        <g transform={pose === "run" || pose === "carry" ? "rotate(-18 145 120)" : "rotate(-8 145 120)"}>
          <path
            d="M135 120 Q175 95 178 75 Q180 60 168 55 Q156 52 150 65 Q145 78 138 90 Q130 105 130 118 Z"
            fill="#8B8275"
            stroke="#2A2620"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path d="M165 62 Q172 65 173 72 Q172 78 165 78 Q158 76 160 70 Q162 63 165 62 Z" fill="#2A2620" />
          <path d="M152 84 Q160 86 161 92 Q159 98 152 98 Q145 96 147 90 Q149 84 152 84 Z" fill="#2A2620" />
          <path d="M140 105 Q147 107 148 113 Q146 118 140 117 Q134 115 135 110 Q137 105 140 105 Z" fill="#2A2620" />
          <path
            d="M168 55 Q176 56 178 62"
            fill="none"
            stroke="#F5EFE2"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>

        {/* BODY — pear-shaped, slightly wobbly */}
        <path
          d="M62 130 Q55 100 68 78 Q82 56 102 56 Q124 56 138 78 Q150 100 142 132 Q138 152 122 158 Q100 162 80 158 Q66 152 62 130 Z"
          fill="#A8A095"
          stroke="#2A2620"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />

        {/* belly patch */}
        <path
          d="M82 118 Q80 138 90 152 Q102 156 114 152 Q124 138 122 118 Q100 110 82 118 Z"
          fill="#F5EFE2"
          stroke="#2A2620"
          strokeWidth="1.8"
        />

        {/* LEGS — stripey socks */}
        {pose === "run" || pose === "carry" ? (
          <>
            {/* back leg planted */}
            <g>
              <path d="M78 152 Q72 164 75 172 Q82 175 90 170 Q92 160 90 152 Z"
                fill="#A8A095" stroke="#2A2620" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M73 168 Q82 174 92 170 L92 175 Q82 180 72 175 Z" fill="#E8743C" stroke="#2A2620" strokeWidth="2" />
              <line x1="76" y1="170" x2="89" y2="170" stroke="#2A2620" strokeWidth="1.2" />
            </g>
            {/* front leg lifted */}
            <g transform="translate(8 -10) rotate(20 110 160)">
              <path d="M108 150 Q112 162 118 168 Q126 168 128 158 Q126 150 120 148 Z"
                fill="#A8A095" stroke="#2A2620" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M114 164 Q124 168 132 162 L132 168 Q122 172 113 168 Z" fill="#E8743C" stroke="#2A2620" strokeWidth="2" />
            </g>
          </>
        ) : (
          <>
            <g>
              <path d="M78 152 Q74 168 80 174 Q90 176 94 168 Q94 158 92 152 Z"
                fill="#A8A095" stroke="#2A2620" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M76 170 Q86 176 96 172 L96 176 Q86 180 75 176 Z" fill="#E8743C" stroke="#2A2620" strokeWidth="2" />
              <line x1="79" y1="172" x2="93" y2="172" stroke="#2A2620" strokeWidth="1.2" />
            </g>
            <g>
              <path d="M110 152 Q108 168 116 174 Q126 176 128 168 Q128 158 124 152 Z"
                fill="#A8A095" stroke="#2A2620" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M108 170 Q118 176 130 172 L130 176 Q118 180 107 176 Z" fill="#E8743C" stroke="#2A2620" strokeWidth="2" />
              <line x1="111" y1="172" x2="127" y2="172" stroke="#2A2620" strokeWidth="1.2" />
            </g>
          </>
        )}

        {/* HEAD */}
        <g>
          {/* ears */}
          <path d="M72 68 Q66 50 76 46 Q84 50 84 64 Z" fill="#A8A095" stroke="#2A2620" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M74 60 Q72 52 78 50 Q82 54 82 62 Z" fill="#E8743C" />
          <path d="M128 68 Q134 50 124 46 Q116 50 116 64 Z" fill="#A8A095" stroke="#2A2620" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M126 60 Q128 52 122 50 Q118 54 118 62 Z" fill="#E8743C" />

          {/* head shape */}
          <path
            d="M68 86 Q62 64 80 56 Q100 50 120 56 Q138 64 132 86 Q128 104 116 110 Q100 114 84 110 Q72 104 68 86 Z"
            fill="#A8A095"
            stroke="#2A2620"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />

          {/* mask — bandit eye stripe */}
          <path
            d="M70 80 Q74 74 84 74 Q92 76 100 76 Q108 76 116 74 Q126 74 130 80 Q128 92 116 94 Q100 96 84 94 Q72 92 70 80 Z"
            fill="#2A2620"
          />

          {/* eyes — bigger, mischievous */}
          <circle cx="86" cy="84" r="6.2" fill="#F5EFE2" />
          <circle cx="114" cy="84" r="6.2" fill="#F5EFE2" />
          <circle cx="87.5" cy="85.5" r="3.2" fill="#2A2620" />
          <circle cx="115.5" cy="85.5" r="3.2" fill="#2A2620" />
          <circle cx="88.6" cy="84.4" r="1.1" fill="#F5EFE2" />
          <circle cx="116.6" cy="84.4" r="1.1" fill="#F5EFE2" />

          {/* snout */}
          <path
            d="M92 96 Q100 102 108 96 Q108 106 100 108 Q92 106 92 96 Z"
            fill="#F5EFE2"
            stroke="#2A2620"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M97 99 Q100 102 103 99 Q103 102 100 103 Q97 102 97 99 Z" fill="#2A2620" />
          {/* sneaky grin */}
          <path
            d={pose === "carry" ? "M94 104 Q100 110 108 104" : "M96 104 Q100 107 104 104"}
            fill="none"
            stroke="#2A2620"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {pose === "carry" && (
            <path d="M104 104 L106 108 L102 107 Z" fill="#F5EFE2" stroke="#2A2620" strokeWidth="1.2" />
          )}

          {/* whiskers */}
          <path d="M88 100 L78 98" stroke="#2A2620" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M88 102 L78 104" stroke="#2A2620" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M112 100 L122 98" stroke="#2A2620" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M112 102 L122 104" stroke="#2A2620" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* ARM holding sack (only when carrying) */}
        {pose === "carry" || pose === "drop" ? (
          <g>
            <path d="M132 112 Q150 116 158 124" fill="none" stroke="#2A2620" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M132 112 Q150 116 158 124" fill="none" stroke="#A8A095" strokeWidth="6" strokeLinecap="round" opacity="0" />
          </g>
        ) : (
          <path d="M130 118 Q138 124 138 134" fill="none" stroke="#2A2620" strokeWidth="2.2" strokeLinecap="round" />
        )}

        {/* SACK — burlap with $ patch (visible when carrying or always idle) */}
        {(pose === "carry" || pose === "idle" || pose === "drop") && (
          <g transform={
            pose === "carry" ? "translate(150 110)" :
            pose === "drop"  ? "translate(150 130)" :
                                "translate(50 130)"
          }>
            <path
              d="M0 14 Q-4 38 8 46 Q22 50 32 46 Q40 38 36 14 Q34 4 28 4 L8 4 Q2 4 0 14 Z"
              fill="#C9A878"
              stroke="#2A2620"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            {/* drawstring tie */}
            <path d="M4 8 Q18 4 32 8" fill="none" stroke="#2A2620" strokeWidth="2" strokeLinecap="round" />
            <path d="M14 4 Q18 -2 22 4" fill="none" stroke="#2A2620" strokeWidth="2" strokeLinecap="round" />
            {/* burlap weave */}
            <line x1="6" y1="20" x2="34" y2="20" stroke="#2A2620" strokeWidth="0.8" opacity="0.5" />
            <line x1="6" y1="28" x2="34" y2="28" stroke="#2A2620" strokeWidth="0.8" opacity="0.5" />
            <line x1="6" y1="36" x2="34" y2="36" stroke="#2A2620" strokeWidth="0.8" opacity="0.5" />
            <line x1="14" y1="14" x2="14" y2="44" stroke="#2A2620" strokeWidth="0.8" opacity="0.5" />
            <line x1="22" y1="14" x2="22" y2="44" stroke="#2A2620" strokeWidth="0.8" opacity="0.5" />
            <line x1="30" y1="14" x2="30" y2="44" stroke="#2A2620" strokeWidth="0.8" opacity="0.5" />
            {/* dollar patch */}
            <circle cx="20" cy="28" r="7" fill="#E8B547" stroke="#2A2620" strokeWidth="1.6" />
            <text x="20" y="32" textAnchor="middle" fontFamily="Special Elite, monospace" fontSize="10" fill="#2A2620" fontWeight="700">$</text>
          </g>
        )}

        {/* motion lines when running */}
        {(pose === "run" || pose === "carry") && (
          <g stroke="#2A2620" strokeWidth="2" strokeLinecap="round" opacity="0.6">
            <line x1="40" y1="100" x2="20" y2="100" />
            <line x1="44" y1="118" x2="22" y2="118" />
            <line x1="42" y1="136" x2="24" y2="136" />
          </g>
        )}
      </g>
    </svg>
  );
};

window.Creature = Creature;
