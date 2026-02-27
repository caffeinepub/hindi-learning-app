export function usePronounce() {
  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "hi-IN";
    utt.rate = 0.8;
    window.speechSynthesis.speak(utt);
  };

  return { speak };
}
