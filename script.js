const intro = document.querySelector("#intro-parallax");
const appTiles = [...document.querySelectorAll(".app-tile")];
const faceShell = document.querySelector(".face-shell");

const tryonSection = document.querySelector("#tryon-parallax");
const outfitLayer = document.querySelector("#outfit-layer");
const outfitLabel = document.querySelector("#outfit-label");
const progressFill = document.querySelector("#progress-fill");

const outfits = [
  {
    name: "Frame 01 · Streetwear Hoodie",
    bg: "linear-gradient(180deg, #7a6359, #3f312d)",
    shadow: "0 0 35px rgba(190, 138, 114, 0.35)",
  },
  {
    name: "Frame 02 · Minimal Blazer",
    bg: "linear-gradient(180deg, #b6b9c5, #6f7382)",
    shadow: "0 0 35px rgba(172, 179, 198, 0.4)",
  },
  {
    name: "Frame 03 · Urban Bomber",
    bg: "linear-gradient(180deg, #4f7fa2, #2b4a63)",
    shadow: "0 0 35px rgba(97, 150, 187, 0.45)",
  },
  {
    name: "Frame 04 · Wedding Ethnic",
    bg: "linear-gradient(180deg, #7c2946, #411628)",
    shadow: "0 0 35px rgba(154, 77, 109, 0.45)",
  },
  {
    name: "Frame 05 · Luxury Monochrome",
    bg: "linear-gradient(180deg, #626262, #1f1f1f)",
    shadow: "0 0 35px rgba(188, 188, 188, 0.35)",
  },
  {
    name: "Frame 06 · Sports Active",
    bg: "linear-gradient(180deg, #3b7d4d, #21482d)",
    shadow: "0 0 35px rgba(81, 168, 106, 0.42)",
  },
  {
    name: "Frame 07 · Retro Denim",
    bg: "linear-gradient(180deg, #4d6b8f, #23354c)",
    shadow: "0 0 35px rgba(101, 145, 193, 0.4)",
  },
  {
    name: "Frame 08 · Party Metallic",
    bg: "linear-gradient(180deg, #b59573, #6f5a44)",
    shadow: "0 0 35px rgba(206, 168, 130, 0.43)",
  },
  {
    name: "Frame 09 · Winter Layered",
    bg: "linear-gradient(180deg, #b9a59b, #6b5f59)",
    shadow: "0 0 35px rgba(207, 181, 168, 0.36)",
  },
  {
    name: "Frame 10 · Signature Founder Fit",
    bg: "linear-gradient(180deg, #5e3f71, #2e1f39)",
    shadow: "0 0 35px rgba(133, 95, 167, 0.42)",
  },
];

function setOutfit(frameIndex) {
  const outfit = outfits[frameIndex] ?? outfits[0];
  outfitLayer.style.background = outfit.bg;
  outfitLayer.style.boxShadow = outfit.shadow;
  outfitLabel.textContent = outfit.name;
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function onScroll() {
  const y = window.scrollY;

  const introTop = intro.offsetTop;
  const introH = intro.offsetHeight - window.innerHeight;
  const pIntro = clamp01((y - introTop) / Math.max(1, introH));

  faceShell.style.transform = `translate(-50%, -50%) scale(${1 - pIntro * 0.25}) rotate(${pIntro * -4}deg)`;
  faceShell.style.opacity = `${1 - pIntro * 1.4}`;

  appTiles.forEach((tile, index) => {
    const baseX = parseFloat(tile.style.getPropertyValue("--x"));
    const baseY = parseFloat(tile.style.getPropertyValue("--y"));
    const z = parseFloat(tile.style.getPropertyValue("--z"));
    const storm = Math.sin(pIntro * 30 + index) * 14 * (0.4 + z);
    const spiral = pIntro * 150 * (index % 2 ? 1 : -1);
    const driftY = pIntro * 95 + Math.cos(pIntro * 18 + index) * 8;

    tile.style.transform = `translate(calc(-50% + ${baseX}vw + ${storm + spiral}px), calc(-50% + ${baseY}vh + ${driftY}px)) rotate(${storm * 0.9}deg)`;
    tile.style.opacity = `${1 - pIntro * 0.95}`;
  });

  const tryTop = tryonSection.offsetTop;
  const tryRange = tryonSection.offsetHeight - window.innerHeight;
  const pTry = clamp01((y - tryTop) / Math.max(1, tryRange));

  progressFill.style.width = `${pTry * 100}%`;
  const frame = Math.min(outfits.length - 1, Math.floor(pTry * outfits.length));
  setOutfit(frame);
}

setOutfit(0);
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();
