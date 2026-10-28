import { forwardRef } from "react";

// The reference ruler skips 1100.
const MARKS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200];

type Props = { labelFirst?: boolean; className?: string };

export const Ruler = forwardRef<HTMLDivElement, Props>(function Ruler({ labelFirst = false, className = "" }, ref) {
  return (
    <div ref={ref} className={`ruler ${className}`} aria-hidden="true">
      {MARKS.map((m) => (
        <div key={m} className="ruler-item">
          {labelFirst ? (
            <>
              <span>{m} px</span>
              <span>|</span>
            </>
          ) : (
            <>
              <span>|</span>
              <span>{m} px</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
});
