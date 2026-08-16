// Taylor's Version — GSAP layer. Loaded on demand; everything it adds is
// removable so the other themes stay untouched.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let active = false;
let cleanupFns = [];
let trailHandler = null;

const MARQUEE_TEXT = "IT’S BEEN A LONG TIME COMING ✦ PREP SEASON (D&P EDITION) ✦ ARE YOU READY FOR IT? ✦ 14 MEALS ✦ 90 MINUTES ✦ ";

function injectDecor() {
  if (!document.querySelector(".swift-marquee")) {
    const marquee = document.createElement("div");
    marquee.className = "swift-marquee";
    marquee.setAttribute("aria-hidden", "true");
    marquee.innerHTML = `<div class="swift-marquee-track"><span>${MARQUEE_TEXT}</span><span>${MARQUEE_TEXT}</span></div>`;
    document.querySelector(".hero").after(marquee);
  }
  if (!document.querySelector(".swift-gif")) {
    const gif = document.createElement("aside");
    gif.className = "swift-gif";
    gif.innerHTML = `
      <p class="swift-gif-kicker">TONIGHT, 90 MINUTES, ONE KITCHEN</p>
      <h3>…Ready for It?</h3>
      <img alt="Taylor Swift — Are you ready for it?" loading="lazy" width="498" height="498">
      <p class="swift-gif-note">the air fryer never misses</p>`;
    document.querySelector("#prep .section-heading").after(gif);
    gif.querySelector("img").src = "/ready-for-it.gif";
  }
  if (!document.querySelector(".swift-sparkles")) {
    const field = document.createElement("div");
    field.className = "swift-sparkles";
    field.setAttribute("aria-hidden", "true");
    field.innerHTML = Array.from({ length: 14 }, (_, i) => `<span style="left:${(i * 7.3) % 100}%;top:${(i * 13.7) % 100}%">✦</span>`).join("");
    document.body.append(field);
  }
}

function removeDecor() {
  document.querySelectorAll(".swift-marquee, .swift-gif, .swift-sparkles, .swift-trail").forEach(el => el.remove());
}

function splitHeroTitle() {
  const title = document.querySelector("#heroTitle");
  if (!title || title.querySelector(".swift-char")) return;
  title.innerHTML = title.textContent.split("").map(ch =>
    ch === " " ? " " : `<span class="swift-char">${ch}</span>`
  ).join("");
}

function unsplitHeroTitle() {
  const title = document.querySelector("#heroTitle");
  if (title && title.querySelector(".swift-char")) title.textContent = title.textContent;
}

function buildAnimations() {
  if (reduced) return;
  const ctx = gsap.context(() => {
    splitHeroTitle();
    gsap.from(".swift-char", { yPercent: 110, rotationX: -70, opacity: 0, duration: 0.9, ease: "back.out(1.6)", stagger: 0.028 });
    gsap.from(".hero-card", { y: 46, opacity: 0, rotation: 2.5, duration: 1.1, delay: 0.35, ease: "power3.out" });
    gsap.from(".hero-copy, .protein-note, .hero-actions", { y: 24, opacity: 0, duration: 0.8, delay: 0.5, stagger: 0.12, ease: "power2.out" });

    const track = document.querySelector(".swift-marquee-track");
    if (track) gsap.to(track, { xPercent: -50, ease: "none", duration: 22, repeat: -1 });

    document.querySelectorAll(".swift-sparkles span").forEach((s, i) => {
      gsap.to(s, { y: "random(-40,40)", x: "random(-30,30)", rotation: "random(-180,180)", opacity: "random(0.25,0.9)", duration: "random(2.5,5)", repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.2 });
    });

    gsap.utils.toArray(".section-heading").forEach(el => {
      gsap.from(el, { y: 56, opacity: 0, skewY: 2.5, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%" } });
    });
    gsap.utils.toArray(".day-card").forEach((el, i) => {
      gsap.from(el, { y: 60, opacity: 0, rotation: i % 2 ? 1.6 : -1.6, duration: 0.7, ease: "back.out(1.4)", scrollTrigger: { trigger: el, start: "top 92%" } });
    });
    gsap.utils.toArray(".component-card").forEach((el, i) => {
      gsap.from(el, { y: 44, opacity: 0, duration: 0.6, delay: (i % 5) * 0.08, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 94%" } });
    });
    gsap.utils.toArray(".prep-step").forEach((el, i) => {
      gsap.from(el, { x: i % 2 ? 60 : -60, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    const gif = document.querySelector(".swift-gif");
    if (gif) gsap.from(gif, { scale: 0.7, rotation: -6, opacity: 0, duration: 1.1, ease: "elastic.out(1, 0.55)", scrollTrigger: { trigger: gif, start: "top 85%" } });
    gsap.utils.toArray(".source-card, .aside-card").forEach(el => {
      gsap.from(el, { y: 34, opacity: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 94%" } });
    });
  });
  cleanupFns.push(() => ctx.revert());

  // Sparkle cursor trail — throttled, fine pointers only (on touch, pointermove
  // fires during scroll and rains glitter over the content).
  if (window.matchMedia("(pointer: coarse)").matches) return;
  let last = 0;
  trailHandler = event => {
    const now = performance.now();
    if (now - last < 90) return;
    last = now;
    const star = document.createElement("span");
    star.className = "swift-trail";
    star.textContent = "✦";
    star.style.left = `${event.clientX}px`;
    star.style.top = `${event.clientY}px`;
    document.body.append(star);
    gsap.to(star, { y: -26, opacity: 0, scale: 0.4, rotation: 120, duration: 0.9, ease: "power1.out", onComplete: () => star.remove() });
  };
  window.addEventListener("pointermove", trailHandler);
  cleanupFns.push(() => window.removeEventListener("pointermove", trailHandler));
}

export function enableSwift() {
  if (active) { refreshSwift(); return; }
  active = true;
  injectDecor();
  buildAnimations();
}

export function disableSwift() {
  if (!active) return;
  active = false;
  cleanupFns.forEach(fn => fn());
  cleanupFns = [];
  unsplitHeroTitle();
  removeDecor();
  ScrollTrigger.getAll().forEach(t => t.kill());
}

export function refreshSwift() {
  if (!active) return;
  cleanupFns.forEach(fn => fn());
  cleanupFns = [];
  ScrollTrigger.getAll().forEach(t => t.kill());
  unsplitHeroTitle();
  removeDecor();
  injectDecor();
  buildAnimations();
}
