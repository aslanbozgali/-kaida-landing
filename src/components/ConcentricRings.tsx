export default function ConcentricRings({
  className = "",
  stroke = "rgba(255,255,255,0.08)",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {[40, 90, 140, 190, 240, 290].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke={stroke} strokeWidth="1" />
      ))}
    </svg>
  );
}
