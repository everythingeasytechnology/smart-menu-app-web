export function VegMark({ veg = true, size = 14 }: { veg?: boolean; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-[3px] border"
      style={{
        width: size,
        height: size,
        borderColor: veg ? "var(--veg)" : "var(--nonveg)",
      }}
      aria-label={veg ? "Vegetarian" : "Non vegetarian"}
    >
      <span
        className="rounded-full"
        style={{
          width: size / 2.4,
          height: size / 2.4,
          background: veg ? "var(--veg)" : "var(--nonveg)",
        }}
      />
    </span>
  );
}