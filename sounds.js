/** Sons infantis via Web Audio API (sem arquivos externos) */
const Sounds = (() => {
  let ctx = null;

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, duration, type = "sine", gain = 0.12, when = 0) {
    const c = ensure();
    if (!c) return;
    const t0 = c.currentTime + when;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(g);
    g.connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }

  return {
    unlock() {
      ensure();
    },
    tap() {
      tone(660, 0.06, "triangle", 0.06);
    },
    strokeOk() {
      tone(523, 0.09, "sine", 0.1);
      tone(784, 0.12, "sine", 0.08, 0.07);
    },
    success() {
      tone(523, 0.12, "triangle", 0.1);
      tone(659, 0.12, "triangle", 0.1, 0.1);
      tone(784, 0.14, "triangle", 0.1, 0.2);
      tone(1046, 0.22, "sine", 0.09, 0.32);
    },
    error() {
      tone(220, 0.14, "square", 0.05);
      tone(180, 0.18, "square", 0.04, 0.08);
    },
    hint() {
      tone(880, 0.08, "sine", 0.07);
      tone(988, 0.1, "sine", 0.06, 0.09);
    },
  };
})();
