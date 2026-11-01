export function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      className="arrow-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      style={down ? { transform: "rotate(135deg)" } : undefined}
    >
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}
