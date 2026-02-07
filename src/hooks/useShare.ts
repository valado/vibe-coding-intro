import { useState } from 'react';

export function useShare() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const text = `The Practical Guide to Vibe Coding`;
    const url = window.location.origin;

    try {
      if (navigator.share) {
        await navigator.share({ title: text, url });
      } else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail
    }
  };

  return { share, copied };
}
