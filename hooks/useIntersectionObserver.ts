import { useEffect, useRef, useState } from "react";

export default function useIntersectionObserver(option = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const callback = (entries: any[], observer: any) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        return;
      }

      setIsVisible(false);
    };

    const observer = new IntersectionObserver(callback, option);
    if (ref.current) {
      observer.observe(ref.current as Element);
    }
  }, [ref.current]);

  return {
    isVisible,
    ref,
  };
}
