import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

export function QtyStepper({
  qty,
  onAdd,
  onRemove,
  compact = false,
}: {
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-3 items-center rounded-lg border border-border bg-card ${
        compact ? "h-8 w-[86px]" : "h-11 w-[110px]"
      }`}
    >
      <button
        type="button"
        onClick={onRemove}
        aria-label="Decrease quantity"
        className="flex h-full w-full items-center justify-center text-brand-green"
      >
        <MinusOutlined style={{ fontSize: compact ? 11 : 13 }} />
      </button>
      <span className={`flex h-full w-full items-center justify-center font-bold text-brand-green ${compact ? "text-sm" : "text-base"}`}>
        {qty}
      </span>
      <button
        type="button"
        onClick={onAdd}
        aria-label="Increase quantity"
        className="flex h-full w-full items-center justify-center text-brand-green"
      >
        <PlusOutlined style={{ fontSize: compact ? 11 : 13 }} />
      </button>
    </div>
  );
}