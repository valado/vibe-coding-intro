import { useState } from 'react';

interface UseShareProps {
  title: string;
  slideNumber: number;
  totalSlides: number;
}

export function useShare({ title, slideNumber, totalSlides }: UseShareProps) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const cleanTitle = title.replace('\n', ' ');
    const text = `${cleanTitle} — The Practical Guide to Vibe Coding (Slide ${slideNumber + 1}/${totalSlides})`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Vibe Coding Guide', text });
      } else {
        await navigator.clipboard.writeText(text);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail
    }
  };

  return { share, copied };
}
