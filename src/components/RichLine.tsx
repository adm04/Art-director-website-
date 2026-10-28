export type Segment = { t: string; serif?: boolean };

/** Renders a line of display type where some words are set in the italic serif. */
export function RichLine({ parts }: { parts: Segment[] }) {
  return (
    <>
      {parts.map((p, i) =>
        p.serif ? (
          <span key={i} className="serif">
            {p.t}
          </span>
        ) : (
          <span key={i}>{p.t}</span>
        ),
      )}
    </>
  );
}
