/* Roster of 6 thieves — same ink-line storybook style as Rascal.
   Each is an SVG component on a 200×180 viewBox. */

// Common ink stroke
const INK = "#2A2620";
const PAPER = "#F5EFE2";
const AMBER = "#E8743C";
const MUSTARD = "#E8B547";

// 1) RASCAL — the raccoon-goblin (idle pose lifted from creature.jsx)
const Rascal = ({ width = 120, style = {} }) => (
  <svg viewBox="0 0 200 180" width={width} style={{ overflow: "visible", ...style }} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="168" rx="48" ry="5" fill={INK} opacity="0.18" />
    {/* tail */}
    <g transform="rotate(-8 145 120)">
      <path d="M135 120 Q175 95 178 75 Q180 60 168 55 Q156 52 150 65 Q145 78 138 90 Q130 105 130 118 Z" fill="#8B8275" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M165 62 Q172 65 173 72 Q172 78 165 78 Q158 76 160 70 Q162 63 165 62 Z" fill={INK} />
      <path d="M152 84 Q160 86 161 92 Q159 98 152 98 Q145 96 147 90 Q149 84 152 84 Z" fill={INK} />
      <path d="M140 105 Q147 107 148 113 Q146 118 140 117 Q134 115 135 110 Q137 105 140 105 Z" fill={INK} />
    </g>
    {/* body */}
    <path d="M62 130 Q55 100 68 78 Q82 56 102 56 Q124 56 138 78 Q150 100 142 132 Q138 152 122 158 Q100 162 80 158 Q66 152 62 130 Z" fill="#A8A095" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
    <path d="M82 118 Q80 138 90 152 Q102 156 114 152 Q124 138 122 118 Q100 110 82 118 Z" fill={PAPER} stroke={INK} strokeWidth="1.8" />
    {/* legs */}
    <path d="M78 152 Q74 168 80 174 Q90 176 94 168 Q94 158 92 152 Z" fill="#A8A095" stroke={INK} strokeWidth="2.2" />
    <path d="M76 170 Q86 176 96 172 L96 176 Q86 180 75 176 Z" fill={AMBER} stroke={INK} strokeWidth="2" />
    <path d="M110 152 Q108 168 116 174 Q126 176 128 168 Q128 158 124 152 Z" fill="#A8A095" stroke={INK} strokeWidth="2.2" />
    <path d="M108 170 Q118 176 130 172 L130 176 Q118 180 107 176 Z" fill={AMBER} stroke={INK} strokeWidth="2" />
    {/* ears */}
    <path d="M72 68 Q66 50 76 46 Q84 50 84 64 Z" fill="#A8A095" stroke={INK} strokeWidth="2.4" />
    <path d="M74 60 Q72 52 78 50 Q82 54 82 62 Z" fill={AMBER} />
    <path d="M128 68 Q134 50 124 46 Q116 50 116 64 Z" fill="#A8A095" stroke={INK} strokeWidth="2.4" />
    <path d="M126 60 Q128 52 122 50 Q118 54 118 62 Z" fill={AMBER} />
    {/* head */}
    <path d="M68 86 Q62 64 80 56 Q100 50 120 56 Q138 64 132 86 Q128 104 116 110 Q100 114 84 110 Q72 104 68 86 Z" fill="#A8A095" stroke={INK} strokeWidth="2.6" />
    {/* mask */}
    <path d="M70 80 Q74 74 84 74 Q92 76 100 76 Q108 76 116 74 Q126 74 130 80 Q128 92 116 94 Q100 96 84 94 Q72 92 70 80 Z" fill={INK} />
    <circle cx="86" cy="84" r="6.2" fill={PAPER} />
    <circle cx="114" cy="84" r="6.2" fill={PAPER} />
    <circle cx="87.5" cy="85.5" r="3.2" fill={INK} />
    <circle cx="115.5" cy="85.5" r="3.2" fill={INK} />
    <circle cx="88.6" cy="84.4" r="1.1" fill={PAPER} />
    <circle cx="116.6" cy="84.4" r="1.1" fill={PAPER} />
    <path d="M92 96 Q100 102 108 96 Q108 106 100 108 Q92 106 92 96 Z" fill={PAPER} stroke={INK} strokeWidth="2" />
    <path d="M97 99 Q100 102 103 99 Q103 102 100 103 Q97 102 97 99 Z" fill={INK} />
    <path d="M96 104 Q100 107 104 104" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
    {/* sack */}
    <g transform="translate(50 130)">
      <path d="M0 14 Q-4 38 8 46 Q22 50 32 46 Q40 38 36 14 Q34 4 28 4 L8 4 Q2 4 0 14 Z" fill="#C9A878" stroke={INK} strokeWidth="2.4" />
      <path d="M4 8 Q18 4 32 8" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="28" r="7" fill={MUSTARD} stroke={INK} strokeWidth="1.6" />
      <text x="20" y="32" textAnchor="middle" fontFamily="Special Elite, monospace" fontSize="10" fill={INK} fontWeight="700">$</text>
    </g>
  </svg>
);

// 2) PIP — tiny mouse in trench coat + beret
const Pip = ({ width = 120, style = {} }) => (
  <svg viewBox="0 0 200 180" width={width} style={{ overflow: "visible", ...style }} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="168" rx="38" ry="4" fill={INK} opacity="0.18" />
    {/* tail — squiggly */}
    <path d="M138 150 Q160 152 168 140 Q172 128 158 130 Q168 122 178 130" fill="none" stroke="#D8B5A0" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M138 150 Q160 152 168 140 Q172 128 158 130 Q168 122 178 130" fill="none" stroke={INK} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    {/* trench coat body */}
    <path d="M70 132 Q66 96 78 84 Q100 78 122 84 Q134 96 130 132 Q132 158 122 162 Q100 165 78 162 Q68 158 70 132 Z" fill="#9B8266" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
    {/* lapels */}
    <path d="M86 90 L100 110 L86 122 Z" fill="#7A6450" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    <path d="M114 90 L100 110 L114 122 Z" fill="#7A6450" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    {/* belt */}
    <rect x="68" y="138" width="64" height="6" fill="#5C4A38" stroke={INK} strokeWidth="1.8" />
    <rect x="96" y="136" width="8" height="10" fill={MUSTARD} stroke={INK} strokeWidth="1.5" />
    {/* coat buttons */}
    <circle cx="100" cy="118" r="2" fill={INK} />
    <circle cx="100" cy="128" r="2" fill={INK} />
    {/* feet */}
    <ellipse cx="84" cy="166" rx="9" ry="4" fill={INK} />
    <ellipse cx="116" cy="166" rx="9" ry="4" fill={INK} />
    {/* head — round, grey */}
    <circle cx="100" cy="68" r="30" fill="#B8A89A" stroke={INK} strokeWidth="2.6" />
    {/* big round ears */}
    <circle cx="78" cy="48" r="14" fill="#B8A89A" stroke={INK} strokeWidth="2.4" />
    <circle cx="78" cy="48" r="8" fill="#E8B5A8" />
    <circle cx="122" cy="48" r="14" fill="#B8A89A" stroke={INK} strokeWidth="2.4" />
    <circle cx="122" cy="48" r="8" fill="#E8B5A8" />
    {/* beret — tilted */}
    <g transform="rotate(-15 100 44)">
      <ellipse cx="100" cy="48" rx="32" ry="8" fill="#1B1A24" stroke={INK} strokeWidth="2.4" />
      <ellipse cx="100" cy="44" rx="26" ry="10" fill="#25232F" stroke={INK} strokeWidth="2.4" />
      <circle cx="120" cy="40" r="3" fill="#25232F" stroke={INK} strokeWidth="1.8" />
    </g>
    {/* eyes — beady, tiny */}
    <circle cx="90" cy="68" r="3" fill={INK} />
    <circle cx="110" cy="68" r="3" fill={INK} />
    <circle cx="90.6" cy="67.2" r="0.8" fill={PAPER} />
    <circle cx="110.6" cy="67.2" r="0.8" fill={PAPER} />
    {/* snout + nose */}
    <path d="M92 80 Q100 88 108 80 Q108 92 100 92 Q92 92 92 80 Z" fill={PAPER} stroke={INK} strokeWidth="1.8" />
    <ellipse cx="100" cy="82" rx="3" ry="2" fill="#E8743C" stroke={INK} strokeWidth="1" />
    {/* whiskers */}
    <line x1="92" y1="86" x2="78" y2="84" stroke={INK} strokeWidth="1" strokeLinecap="round" />
    <line x1="92" y1="88" x2="78" y2="90" stroke={INK} strokeWidth="1" strokeLinecap="round" />
    <line x1="108" y1="86" x2="122" y2="84" stroke={INK} strokeWidth="1" strokeLinecap="round" />
    <line x1="108" y1="88" x2="122" y2="90" stroke={INK} strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// 3) SLY — fox with round spectacles + briefcase
const Sly = ({ width = 120, style = {} }) => (
  <svg viewBox="0 0 200 180" width={width} style={{ overflow: "visible", ...style }} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="168" rx="44" ry="4.5" fill={INK} opacity="0.18" />
    {/* bushy tail */}
    <g transform="rotate(15 145 130)">
      <path d="M130 130 Q170 120 178 92 Q180 70 162 64 Q146 64 140 84 Q132 108 130 130 Z" fill="#D9763A" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M156 70 Q172 70 175 88 Q170 86 165 82 Q160 76 156 70 Z" fill={PAPER} stroke={INK} strokeWidth="2" />
    </g>
    {/* body */}
    <path d="M64 132 Q60 100 74 80 Q98 64 122 74 Q140 86 142 124 Q144 156 122 162 Q98 166 78 162 Q62 156 64 132 Z" fill="#D9763A" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
    {/* white belly */}
    <path d="M82 116 Q80 140 92 156 Q104 160 116 156 Q126 140 122 116 Q100 108 82 116 Z" fill={PAPER} stroke={INK} strokeWidth="1.8" />
    {/* legs/paws */}
    <path d="M82 158 Q80 172 90 174 Q98 174 98 162 Z" fill="#B85A28" stroke={INK} strokeWidth="2.2" />
    <path d="M104 162 Q104 174 114 174 Q122 174 120 158 Z" fill="#B85A28" stroke={INK} strokeWidth="2.2" />
    {/* briefcase in arm */}
    <g transform="translate(28 130) rotate(-8)">
      <rect x="0" y="0" width="32" height="22" rx="2" fill="#5C3A20" stroke={INK} strokeWidth="2.2" />
      <rect x="0" y="6" width="32" height="2" fill={INK} opacity="0.5" />
      <rect x="13" y="-4" width="6" height="6" fill="none" stroke={INK} strokeWidth="2" />
      <rect x="14" y="9" width="4" height="3" fill={MUSTARD} stroke={INK} strokeWidth="1.2" />
    </g>
    {/* ears — pointed */}
    <path d="M70 60 L78 30 L94 50 Z" fill="#D9763A" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M78 38 L82 50 L88 46 Z" fill={INK} />
    <path d="M130 60 L122 30 L106 50 Z" fill="#D9763A" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M122 38 L118 50 L112 46 Z" fill={INK} />
    {/* head — narrow, foxy */}
    <path d="M68 80 Q66 56 86 50 Q100 46 114 50 Q134 56 132 80 Q130 100 116 108 L100 116 L84 108 Q70 100 68 80 Z" fill="#D9763A" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
    {/* white muzzle/cheeks */}
    <path d="M82 90 Q80 104 92 112 L100 116 L108 112 Q120 104 118 90 Q100 96 82 90 Z" fill={PAPER} stroke={INK} strokeWidth="1.8" />
    {/* eyes behind glasses */}
    <circle cx="86" cy="78" r="2.5" fill={INK} />
    <circle cx="114" cy="78" r="2.5" fill={INK} />
    {/* round spectacles */}
    <circle cx="86" cy="78" r="9" fill="none" stroke={INK} strokeWidth="2.2" />
    <circle cx="114" cy="78" r="9" fill="none" stroke={INK} strokeWidth="2.2" />
    <line x1="95" y1="78" x2="105" y2="78" stroke={INK} strokeWidth="2.2" />
    <path d="M77 76 L70 73" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    <path d="M123 76 L130 73" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    {/* lens shine */}
    <path d="M82 73 Q80 76 81 80" fill="none" stroke={PAPER} strokeWidth="1.5" opacity="0.7" />
    <path d="M110 73 Q108 76 109 80" fill="none" stroke={PAPER} strokeWidth="1.5" opacity="0.7" />
    {/* nose */}
    <ellipse cx="100" cy="98" rx="4" ry="3" fill={INK} />
    {/* smug grin */}
    <path d="M90 108 Q100 114 110 108" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 4) GLOOP — round frog with sticky fingers + smug grin
const Gloop = ({ width = 120, style = {} }) => (
  <svg viewBox="0 0 200 180" width={width} style={{ overflow: "visible", ...style }} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="168" rx="52" ry="5" fill={INK} opacity="0.18" />
    {/* round body */}
    <ellipse cx="100" cy="118" rx="58" ry="48" fill="#7BA85A" stroke={INK} strokeWidth="2.6" />
    {/* belly */}
    <ellipse cx="100" cy="130" rx="38" ry="28" fill="#D8E4B0" stroke={INK} strokeWidth="1.8" />
    {/* spots */}
    <circle cx="58" cy="106" r="6" fill="#5C8240" stroke={INK} strokeWidth="1.4" />
    <circle cx="148" cy="116" r="5" fill="#5C8240" stroke={INK} strokeWidth="1.4" />
    <circle cx="72" cy="138" r="3.5" fill="#5C8240" />
    {/* legs splayed */}
    <g>
      <path d="M48 142 Q30 154 30 168 Q42 172 56 162 Q56 154 52 146 Z" fill="#7BA85A" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="32" cy="166" r="3.5" fill={PAPER} stroke={INK} strokeWidth="1.6" />
      <circle cx="40" cy="170" r="3.5" fill={PAPER} stroke={INK} strokeWidth="1.6" />
      <circle cx="48" cy="170" r="3.5" fill={PAPER} stroke={INK} strokeWidth="1.6" />
    </g>
    <g>
      <path d="M152 142 Q170 154 170 168 Q158 172 144 162 Q144 154 148 146 Z" fill="#7BA85A" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="168" cy="166" r="3.5" fill={PAPER} stroke={INK} strokeWidth="1.6" />
      <circle cx="160" cy="170" r="3.5" fill={PAPER} stroke={INK} strokeWidth="1.6" />
      <circle cx="152" cy="170" r="3.5" fill={PAPER} stroke={INK} strokeWidth="1.6" />
    </g>
    {/* sticky front hand reaching */}
    <g>
      <path d="M70 130 Q56 142 50 152" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="50" cy="152" r="6" fill="#7BA85A" stroke={INK} strokeWidth="2" />
      <circle cx="46" cy="156" r="3" fill={PAPER} stroke={INK} strokeWidth="1.4" />
      <circle cx="52" cy="158" r="3" fill={PAPER} stroke={INK} strokeWidth="1.4" />
      <circle cx="56" cy="153" r="3" fill={PAPER} stroke={INK} strokeWidth="1.4" />
    </g>
    {/* eye bumps on top */}
    <circle cx="78" cy="68" r="18" fill="#7BA85A" stroke={INK} strokeWidth="2.4" />
    <circle cx="122" cy="68" r="18" fill="#7BA85A" stroke={INK} strokeWidth="2.4" />
    <circle cx="78" cy="68" r="11" fill={PAPER} />
    <circle cx="122" cy="68" r="11" fill={PAPER} />
    {/* slit pupils */}
    <ellipse cx="80" cy="70" rx="3" ry="8" fill={INK} />
    <ellipse cx="120" cy="70" rx="3" ry="8" fill={INK} />
    <circle cx="82" cy="65" r="2" fill={PAPER} />
    <circle cx="122" cy="65" r="2" fill={PAPER} />
    {/* smug wide grin — closed mouth */}
    <path d="M62 110 Q100 142 138 110" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
    {/* upturned mouth corners */}
    <path d="M62 110 Q60 104 64 100" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M138 110 Q140 104 136 100" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
    {/* tiny tongue tip */}
    <path d="M96 124 Q100 130 104 124" fill="#E8743C" stroke={INK} strokeWidth="1.5" />
    {/* nostrils */}
    <circle cx="94" cy="92" r="1.6" fill={INK} />
    <circle cx="106" cy="92" r="1.6" fill={INK} />
  </svg>
);

// 5) SNATCH — magpie with monocle + satchel
const Snatch = ({ width = 120, style = {} }) => (
  <svg viewBox="0 0 200 180" width={width} style={{ overflow: "visible", ...style }} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="168" rx="36" ry="4" fill={INK} opacity="0.18" />
    {/* tail feathers */}
    <g>
      <path d="M138 130 Q170 130 178 152 Q168 156 156 150 Q146 142 138 130 Z" fill="#1B1A24" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M150 138 Q165 142 170 150" fill="none" stroke="#3A3645" strokeWidth="1.4" />
    </g>
    {/* body — black with white belly */}
    <path d="M62 110 Q58 80 80 68 Q100 60 120 68 Q142 80 138 116 Q140 150 116 158 Q100 162 84 158 Q60 150 62 110 Z" fill="#1B1A24" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
    {/* white belly patch */}
    <path d="M80 102 Q76 132 88 152 Q100 156 112 152 Q124 132 120 102 Q100 96 80 102 Z" fill={PAPER} stroke={INK} strokeWidth="2" />
    {/* wing — tucked, with iridescent shine */}
    <path d="M124 90 Q142 100 138 130 Q132 138 122 134 Q116 110 124 90 Z" fill="#25232F" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M128 100 Q138 108 134 124" fill="none" stroke="#5C6E4A" strokeWidth="1.8" opacity="0.8" />
    <path d="M130 96 Q136 104 132 116" fill="none" stroke="#3A6B6B" strokeWidth="1.4" opacity="0.7" />
    {/* legs — stick thin */}
    <line x1="88" y1="158" x2="86" y2="172" stroke={MUSTARD} strokeWidth="2.4" strokeLinecap="round" />
    <line x1="86" y1="172" x2="80" y2="173" stroke={MUSTARD} strokeWidth="2" strokeLinecap="round" />
    <line x1="86" y1="172" x2="92" y2="173" stroke={MUSTARD} strokeWidth="2" strokeLinecap="round" />
    <line x1="112" y1="158" x2="114" y2="172" stroke={MUSTARD} strokeWidth="2.4" strokeLinecap="round" />
    <line x1="114" y1="172" x2="108" y2="173" stroke={MUSTARD} strokeWidth="2" strokeLinecap="round" />
    <line x1="114" y1="172" x2="120" y2="173" stroke={MUSTARD} strokeWidth="2" strokeLinecap="round" />
    {/* satchel slung across */}
    <path d="M70 86 Q100 96 130 88" fill="none" stroke="#8B6240" strokeWidth="2.4" strokeLinecap="round" />
    <g transform="translate(58 110) rotate(-8)">
      <path d="M0 0 Q-2 16 4 22 Q14 24 20 22 Q26 16 24 0 Q22 -4 12 -4 Q2 -4 0 0 Z" fill="#8B6240" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M0 0 Q12 -8 24 0" fill="none" stroke={INK} strokeWidth="1.8" />
      <circle cx="12" cy="10" r="2.5" fill={MUSTARD} stroke={INK} strokeWidth="1.2" />
    </g>
    {/* head — round, black */}
    <circle cx="100" cy="62" r="26" fill="#1B1A24" stroke={INK} strokeWidth="2.6" />
    {/* white face patch */}
    <path d="M84 64 Q88 78 100 80 Q112 78 116 64 Q108 58 100 60 Q92 58 84 64 Z" fill={PAPER} stroke={INK} strokeWidth="1.8" />
    {/* beak — orange, pointy */}
    <path d="M96 74 L80 82 L96 80 Z" fill={MUSTARD} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    <line x1="80" y1="82" x2="96" y2="78" stroke={INK} strokeWidth="1.2" />
    {/* eye + monocle */}
    <circle cx="108" cy="60" r="3.2" fill={PAPER} />
    <circle cx="108" cy="60" r="1.8" fill={INK} />
    <circle cx="108" cy="60" r="9" fill="none" stroke={MUSTARD} strokeWidth="2.4" />
    <line x1="115" y1="66" x2="122" y2="78" stroke={MUSTARD} strokeWidth="1.8" strokeLinecap="round" />
    {/* other side eye — small dot */}
    <circle cx="92" cy="58" r="2" fill={PAPER} />
    <circle cx="92" cy="58" r="1" fill={INK} />
    {/* head feathers */}
    <path d="M92 38 L88 30 L96 36" fill="#1B1A24" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M104 36 L106 28 L110 38" fill="#1B1A24" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

// 6) FINGERS — tiny octopus, each arm holds a stolen item
const Fingers = ({ width = 120, style = {} }) => (
  <svg viewBox="0 0 200 180" width={width} style={{ overflow: "visible", ...style }} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="168" rx="54" ry="5" fill={INK} opacity="0.18" />
    {/* head/mantle — bulbous */}
    <path d="M58 90 Q54 50 100 46 Q146 50 142 90 Q142 110 130 116 Q100 122 70 116 Q58 110 58 90 Z" fill="#C97AAE" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
    {/* mantle highlight */}
    <path d="M70 60 Q72 50 86 50" fill="none" stroke={PAPER} strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
    {/* spots on mantle */}
    <circle cx="80" cy="76" r="3" fill="#A05A88" />
    <circle cx="118" cy="72" r="3" fill="#A05A88" />
    <circle cx="100" cy="62" r="2.5" fill="#A05A88" />
    {/* eyes — big, expressive */}
    <circle cx="84" cy="86" r="9" fill={PAPER} stroke={INK} strokeWidth="2.2" />
    <circle cx="116" cy="86" r="9" fill={PAPER} stroke={INK} strokeWidth="2.2" />
    <circle cx="86" cy="88" r="4.5" fill={INK} />
    <circle cx="118" cy="88" r="4.5" fill={INK} />
    <circle cx="87.5" cy="86.5" r="1.6" fill={PAPER} />
    <circle cx="119.5" cy="86.5" r="1.6" fill={PAPER} />
    {/* sneaky grin */}
    <path d="M88 108 Q100 116 112 108" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M112 108 L116 112 L110 112 Z" fill={PAPER} stroke={INK} strokeWidth="1.4" />

    {/* 8 ARMS, each curled, each holding a different swag */}
    {/* arm 1 — leftmost, holding a ring */}
    <g>
      <path d="M62 110 Q40 120 28 138 Q24 156 14 154" fill="none" stroke="#C97AAE" strokeWidth="9" strokeLinecap="round" />
      <path d="M62 110 Q40 120 28 138 Q24 156 14 154" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      {[34, 38, 42].map((y, i) => <circle key={i} cx={32 - i*4} cy={140 + i*4} r="2" fill={PAPER} stroke={INK} strokeWidth="1" />)}
      <circle cx="14" cy="154" r="6" fill="none" stroke={MUSTARD} strokeWidth="3" />
      <circle cx="13" cy="151" r="2" fill={MUSTARD} stroke={INK} strokeWidth="1" />
    </g>
    {/* arm 2 — holding a key */}
    <g>
      <path d="M68 116 Q56 140 60 168" fill="none" stroke="#C97AAE" strokeWidth="9" strokeLinecap="round" />
      <path d="M68 116 Q56 140 60 168" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <g transform="translate(60 168) rotate(-20)">
        <circle cx="0" cy="0" r="4" fill="none" stroke={MUSTARD} strokeWidth="2" />
        <line x1="3" y1="0" x2="14" y2="0" stroke={MUSTARD} strokeWidth="2" />
        <line x1="11" y1="0" x2="11" y2="3" stroke={MUSTARD} strokeWidth="2" />
        <line x1="14" y1="0" x2="14" y2="4" stroke={MUSTARD} strokeWidth="2" />
      </g>
    </g>
    {/* arm 3 — holding a coin */}
    <g>
      <path d="M84 120 Q82 144 88 168" fill="none" stroke="#C97AAE" strokeWidth="9" strokeLinecap="round" />
      <path d="M84 120 Q82 144 88 168" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="88" cy="170" r="6" fill={MUSTARD} stroke={INK} strokeWidth="1.8" />
      <text x="88" y="173" textAnchor="middle" fontFamily="Special Elite, monospace" fontSize="7" fill={INK} fontWeight="700">$</text>
    </g>
    {/* arm 4 — holding a watch (tucked center) */}
    <g>
      <path d="M100 122 Q102 140 110 158" fill="none" stroke="#C97AAE" strokeWidth="9" strokeLinecap="round" />
      <path d="M100 122 Q102 140 110 158" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="112" cy="160" r="6" fill={PAPER} stroke={INK} strokeWidth="1.8" />
      <line x1="112" y1="160" x2="112" y2="156" stroke={INK} strokeWidth="1.4" />
      <line x1="112" y1="160" x2="115" y2="160" stroke={INK} strokeWidth="1.4" />
      <line x1="112" y1="153" x2="112" y2="155" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
    </g>
    {/* arm 5 — holding a letter */}
    <g>
      <path d="M116 120 Q124 140 130 162" fill="none" stroke="#C97AAE" strokeWidth="9" strokeLinecap="round" />
      <path d="M116 120 Q124 140 130 162" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <g transform="translate(130 162) rotate(15)">
        <rect x="-6" y="-4" width="12" height="9" fill={PAPER} stroke={INK} strokeWidth="1.6" />
        <path d="M-6 -4 L0 1 L6 -4" fill="none" stroke={INK} strokeWidth="1.4" />
      </g>
    </g>
    {/* arm 6 — holding a gem */}
    <g>
      <path d="M132 116 Q150 138 156 158" fill="none" stroke="#C97AAE" strokeWidth="9" strokeLinecap="round" />
      <path d="M132 116 Q150 138 156 158" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <g transform="translate(156 158)">
        <path d="M-5 -2 L0 -7 L5 -2 L0 5 Z" fill="#5C9BB8" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M-5 -2 L5 -2" stroke={INK} strokeWidth="1" />
      </g>
    </g>
    {/* arm 7 — holding a question mark slip (text) */}
    <g>
      <path d="M140 110 Q160 122 174 138" fill="none" stroke="#C97AAE" strokeWidth="9" strokeLinecap="round" />
      <path d="M140 110 Q160 122 174 138" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <g transform="translate(174 138) rotate(10)">
        <rect x="-6" y="-7" width="12" height="14" fill={PAPER} stroke={INK} strokeWidth="1.6" />
        <line x1="-3" y1="-3" x2="3" y2="-3" stroke={INK} strokeWidth="1" />
        <line x1="-3" y1="0" x2="3" y2="0" stroke={INK} strokeWidth="1" />
        <line x1="-3" y1="3" x2="1" y2="3" stroke={INK} strokeWidth="1" />
      </g>
    </g>
    {/* arm 8 — empty curl, waving */}
    <g>
      <path d="M144 100 Q170 92 186 100 Q190 108 184 112" fill="none" stroke="#C97AAE" strokeWidth="9" strokeLinecap="round" />
      <path d="M144 100 Q170 92 186 100 Q190 108 184 112" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      {[0,1,2].map(i => <circle key={i} cx={172 + i*6} cy={98 - i} r="1.8" fill={PAPER} stroke={INK} strokeWidth="0.8" />)}
    </g>
  </svg>
);

const ROSTER = [
  { id: "rascal",  name: "Rascal",  tag: "the original menace",       Component: Rascal,  emoji: "🦝" },
  { id: "pip",     name: "Pip",     tag: "noir mouse, very hush-hush", Component: Pip,     emoji: "🐭" },
  { id: "sly",     name: "Sly",     tag: "reads what he steals",       Component: Sly,     emoji: "🦊" },
  { id: "gloop",   name: "Gloop",   tag: "sticky-fingered amphibian",  Component: Gloop,   emoji: "🐸" },
  { id: "snatch",  name: "Snatch",  tag: "shiny things only",          Component: Snatch,  emoji: "🐦" },
  { id: "fingers", name: "Fingers", tag: "eight grabs, zero conscience", Component: Fingers, emoji: "🐙" },
];

window.Rascal = Rascal;
window.Pip = Pip;
window.Sly = Sly;
window.Gloop = Gloop;
window.Snatch = Snatch;
window.Fingers = Fingers;
window.ROSTER = ROSTER;
