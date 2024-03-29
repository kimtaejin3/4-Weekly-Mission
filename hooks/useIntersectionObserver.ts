import { useEffect, useRef, useState } from "react";

export default function useIntersectionObserver(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const instance = ref.current;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    }, options);

    if (instance) {
      observer.observe(instance);
    }

    return () => {
      observer.unobserve(instance as Element);
      observer.disconnect();
    };
  }, []);

  return {
    isVisible,
    ref,
  };
}
