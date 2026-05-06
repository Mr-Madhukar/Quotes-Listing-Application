/**
 * Copy text to clipboard with fallback
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
};

/**
 * Generate Twitter/X share URL for a quote
 */
export const getTwitterShareUrl = (content, author) => {
  const text = encodeURIComponent(`"${content}" — ${author}`);
  return `https://twitter.com/intent/tweet?text=${text}`;
};

/**
 * Truncate text to a certain length
 */
export const truncateText = (text, maxLength = 120) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '…';
};
