// hooks/use-outside-click.ts
import { useEffect } from "react";

export function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) {
  useEffect(() => {
    function handle(ev: MouseEvent | TouchEvent) {
      const target = ev.target as Node | null;
      if (!ref.current) return;
      if (!target) return;
      if (!ref.current.contains(target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handle);
    document.addEventListener("touchstart", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("touchstart", handle);
    };
  }, [ref, callback]);
}
