export function usePronounce() {
  const speak = (text: string, rate = 0.8) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "hi-IN";
    utt.rate = rate;
    window.speechSynthesis.speak(utt);
  };

  return { speak };
}
