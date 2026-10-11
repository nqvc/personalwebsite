/**
 * Original line illustrations used where no real photograph exists yet.
 * They are deliberately abstract and labelled as illustrations so they are
 * never mistaken for documentation of an actual build.
 * All strokes use currentColor / CSS variables, so they work in both themes.
 */

const r2 = (n: number) => Math.round(n * 100) / 100;

export function Phyllotaxis({ className }: { className?: string }) {
  const cx = 300;
  const cy = 300;
  const golden = (137.508 * Math.PI) / 180;
  const seeds = Array.from({ length: 380 }, (_, i) => {
    const r = 12.4 * Math.sqrt(i + 1);
    const a = i * golden;
    return { x: r2(cx + r * Math.cos(a)), y: r2(cy + r * Math.sin(a)), s: r2(1.1 + i / 170) };
  }).filter((p) => Math.hypot(p.x - cx, p.y - cy) < 232);

  const ticks = Array.from({ length: 72 }, (_, i) => {
    const a = (i * 5 * Math.PI) / 180;
    const inner = i % 6 === 0 ? 262 : 268;
    return {
      x1: r2(cx + inner * Math.cos(a)),
      y1: r2(cy + inner * Math.sin(a)),
      x2: r2(cx + 274 * Math.cos(a)),
      y2: r2(cy + 274 * Math.sin(a)),
    };
  });

  return (
    <svg viewBox="0 0 600 600" className={className} role="img" aria-labelledby="phyllo-title">
      <title id="phyllo-title">
        Line drawing of a phyllotaxis spiral — the golden-angle pattern sunflowers use to pack their seeds — inside a measured ring.
      </title>
      <g fill="none" stroke="var(--line)" strokeWidth="1">
        <circle cx={cx} cy={cy} r="274" />
        <circle cx={cx} cy={cy} r="240" strokeDasharray="2 5" />
        <line x1="0" y1={cy} x2="600" y2={cy} strokeDasharray="1 6" />
        <line x1={cx} y1="0" x2={cx} y2="600" strokeDasharray="1 6" />
        {ticks.map((t, i) => (
          <line key={i} {...t} />
        ))}
      </g>
      <g fill="currentColor">
        {seeds.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.s} opacity={0.35 + (i % 13) / 26} />
        ))}
      </g>
      <g fill="none" stroke="var(--accent)" strokeWidth="1.2">
        <path d={`M ${cx} ${cy} L ${r2(cx + 274 * Math.cos(-0.42))} ${r2(cy + 274 * Math.sin(-0.42))}`} />
        <path d={`M ${cx + 60} ${cy} A 60 60 0 0 0 ${r2(cx + 60 * Math.cos(-0.42))} ${r2(cy + 60 * Math.sin(-0.42))}`} />
      </g>
      <g className="svg-mono" fill="var(--muted)">
        <text x={cx + 68} y={cy - 10}>137.5°</text>
        <text x="16" y="590">FIG. 00 — GOLDEN-ANGLE PACKING</text>
      </g>
    </svg>
  );
}

function Frame({ children, label, title }: { children: React.ReactNode; label: string; title: string }) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label={title} preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id={`grid-${label.replace(/\W/g, "")}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="var(--line)" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="480" height="360" fill={`url(#grid-${label.replace(/\W/g, "")})`} />
      {children}
      <text x="14" y="348" className="svg-mono" fill="var(--muted)">
        {label}
      </text>
    </svg>
  );
}

export function TrackerVisual() {
  const sun = [0.15, 0.3, 0.5, 0.7, 0.85].map((t) => {
    const a = Math.PI * (1 - t);
    return { x: r2(240 + 170 * Math.cos(a)), y: r2(250 - 150 * Math.sin(a)) };
  });
  return (
    <Frame label="ILLUSTRATION — SUN PATH & TRACKING, NOT THE ACTUAL BUILD" title="Schematic illustration of the sun's daily arc above a panel that tilts to follow it">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <line x1="40" y1="250" x2="440" y2="250" />
        <path d="M 70 250 A 170 150 0 0 1 410 250" strokeDasharray="3 5" stroke="var(--muted)" />
        {sun.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={i === 3 ? 11 : 5} fill={i === 3 ? "var(--accent)" : "var(--bg)"} stroke={i === 3 ? "var(--accent)" : "currentColor"} />
        ))}
        <g transform="translate(240 250) rotate(-24)">
          <rect x="-58" y="-6" width="116" height="6" fill="var(--bg)" />
          <line x1="0" y1="-6" x2="0" y2="-80" strokeDasharray="2 4" stroke="var(--accent)" />
        </g>
        <line x1="240" y1="250" x2="240" y2="300" />
        <line x1="222" y1="300" x2="258" y2="300" />
        <path d="M 240 214 A 36 36 0 0 1 225 217" stroke="var(--accent-2)" />
      </g>
      <text x="252" y="212" className="svg-mono" fill="var(--muted)">θ(t)</text>
      <text x="28" y="40" className="svg-mono" fill="var(--muted)">E</text>
      <text x="440" y="40" className="svg-mono" fill="var(--muted)">W</text>
    </Frame>
  );
}

export function IrrigationVisual() {
  const stalks = Array.from({ length: 15 }, (_, i) => 50 + i * 27);
  return (
    <Frame label="ILLUSTRATION — FIELD, SOIL & MOISTURE, CONCEPTUAL" title="Conceptual illustration of wheat rows above soil layers with dashed moisture contours">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <line x1="30" y1="170" x2="450" y2="170" />
        {stalks.map((x, i) => (
          <g key={i}>
            <path d={`M ${x} 170 Q ${x - 3} 130 ${x + (i % 2 ? 4 : -2)} ${92 + (i % 3) * 6}`} />
            <path d={`M ${x + (i % 2 ? 4 : -2)} ${92 + (i % 3) * 6} l -3 -14 m 3 14 l 3 -15 m -3 15 l 0 -18`} stroke="var(--accent)" />
          </g>
        ))}
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M 30 ${205 + k * 32} C 140 ${190 + k * 34}, 300 ${225 + k * 30}, 450 ${200 + k * 34}`} strokeDasharray="4 5" stroke="var(--muted)" />
        ))}
        <path d="M 380 40 c -10 16 -14 24 -14 30 a 14 14 0 0 0 28 0 c 0 -6 -4 -14 -14 -30 z" stroke="var(--accent-2)" />
      </g>
      <text x="40" y="216" className="svg-mono" fill="var(--muted)">θ₁</text>
      <text x="40" y="250" className="svg-mono" fill="var(--muted)">θ₂</text>
      <text x="40" y="282" className="svg-mono" fill="var(--muted)">θ₃</text>
    </Frame>
  );
}

export function CodeVisual() {
  const lines = [
    [0, 120], [1, 210], [1, 160], [2, 240], [2, 90], [1, 180], [0, 0], [0, 140], [1, 250], [2, 200], [2, 130], [1, 70], [0, 0], [0, 190], [1, 150],
  ];
  return (
    <Frame label="ILLUSTRATION — STRUCTURE OF A SMALL PROGRAM" title="Abstract illustration of indented lines of source code">
      {lines.map(([indent, w], i) =>
        w ? (
          <g key={i}>
            <text x="34" y={42 + i * 19} className="svg-mono" fill="var(--muted)">{String(i + 1).padStart(2, "0")}</text>
            <rect x={70 + indent * 28} y={33 + i * 19} width={w} height="7" rx="1" fill={i % 5 === 1 ? "var(--accent)" : i % 7 === 3 ? "var(--accent-2)" : "currentColor"} opacity={i % 5 === 1 ? 0.9 : 0.55} />
          </g>
        ) : (
          <text key={i} x="34" y={42 + i * 19} className="svg-mono" fill="var(--muted)">{String(i + 1).padStart(2, "0")}</text>
        ),
      )}
    </Frame>
  );
}

export function CarbonVisual() {
  return (
    <Frame label="ILLUSTRATION — ENERGY & EMISSIONS, NO DATA SHOWN" title="Abstract illustration of the sun and a carbon dioxide molecule with empty chart axes">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="130" cy="120" r="34" stroke="var(--accent)" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * Math.PI) / 6;
          return <line key={i} x1={r2(130 + 44 * Math.cos(a))} y1={r2(120 + 44 * Math.sin(a))} x2={r2(130 + 58 * Math.cos(a))} y2={r2(120 + 58 * Math.sin(a))} stroke="var(--accent)" />;
        })}
        <circle cx="330" cy="120" r="16" />
        <circle cx="290" cy="120" r="12" />
        <circle cx="370" cy="120" r="12" />
        <line x1="302" y1="116" x2="314" y2="116" />
        <line x1="302" y1="124" x2="314" y2="124" />
        <line x1="346" y1="116" x2="358" y2="116" />
        <line x1="346" y1="124" x2="358" y2="124" />
        <line x1="60" y1="300" x2="430" y2="300" />
        <line x1="60" y1="300" x2="60" y2="200" />
        <path d="M 60 280 L 430 280" strokeDasharray="1 6" stroke="var(--muted)" />
      </g>
      <text x="320" y="124" className="svg-mono" fill="var(--muted)">C</text>
      <text x="74" y="214" className="svg-mono" fill="var(--muted)">data to be added</text>
    </Frame>
  );
}

export function SketchVisual() {
  return (
    <Frame label="ILLUSTRATION — SKETCHBOOK PLACEHOLDER" title="Loose line sketch suggesting a figure with a wing, as a placeholder for drawings">
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M 230 90 c -18 0 -26 16 -22 30 c 4 14 22 18 32 6 c 8 -10 4 -34 -10 -36" />
        <path d="M 226 128 c -6 30 -14 70 -10 120 M 242 130 c 8 34 12 74 8 118" />
        <path d="M 236 150 c 40 -40 110 -60 160 -40 c -30 10 -50 22 -64 40 c 20 -4 36 0 50 8 c -36 6 -66 18 -90 34" stroke="var(--accent-2)" />
        <path d="M 120 260 c 60 -8 180 -8 250 0" />
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={150 + i * 22} y1="270" x2={140 + i * 22} y2="290" stroke="var(--muted)" />
        ))}
      </g>
    </Frame>
  );
}

export function ViewfinderVisual() {
  return (
    <Frame label="PHOTOGRAPHY — PLACEHOLDER FRAME" title="A camera viewfinder frame with a rule-of-thirds grid, standing in for photographs">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M 60 50 h 30 M 60 50 v 30 M 420 50 h -30 M 420 50 v 30 M 60 310 h 30 M 60 310 v -30 M 420 310 h -30 M 420 310 v -30" strokeWidth="1.6" />
        <line x1="180" y1="60" x2="180" y2="300" stroke="var(--muted)" strokeDasharray="2 5" />
        <line x1="300" y1="60" x2="300" y2="300" stroke="var(--muted)" strokeDasharray="2 5" />
        <line x1="70" y1="137" x2="410" y2="137" stroke="var(--muted)" strokeDasharray="2 5" />
        <line x1="70" y1="223" x2="410" y2="223" stroke="var(--muted)" strokeDasharray="2 5" />
        <circle cx="300" cy="137" r="16" stroke="var(--accent)" />
        <path d="M 70 260 L 150 200 L 210 240 L 290 170 L 410 250" />
      </g>
    </Frame>
  );
}

export function IdeasVisual() {
  return (
    <Frame label="NOTES — INDEX CARD" title="An index card with ruled lines and a question mark">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="90" y="60" width="300" height="200" fill="var(--bg)" />
        <line x1="90" y1="100" x2="390" y2="100" stroke="var(--accent-2)" />
        {[130, 160, 190, 220].map((y) => (
          <line key={y} x1="104" y1={y} x2="376" y2={y} stroke="var(--line)" />
        ))}
        <path d="M 210 150 c 0 -24 40 -24 40 0 c 0 16 -20 16 -20 34 M 230 200 v 4" strokeWidth="2" stroke="var(--accent)" />
      </g>
    </Frame>
  );
}

export function GridVisual() {
  return <Frame label="IMAGE TO BE ADDED" title="Empty grid placeholder for an image to be added"><g /></Frame>;
}

const VISUALS: Record<string, () => React.ReactElement> = {
  tracker: TrackerVisual,
  irrigation: IrrigationVisual,
  code: CodeVisual,
  carbon: CarbonVisual,
  sketch: SketchVisual,
  photo: ViewfinderVisual,
  ideas: IdeasVisual,
  grid: GridVisual,
};

export function Visual({ name }: { name: string }) {
  const V = VISUALS[name] ?? GridVisual;
  return <V />;
}
