export function GapNote({ label, text }: { label: string; text: string }) {
  return (
    <p className="rounded-lg border border-line bg-paper-tint px-4 py-3 text-sm leading-6">
      <span className="font-semibold">{label}. </span>
      {text}
    </p>
  );
}
