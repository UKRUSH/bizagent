"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";
import styles from "./home.module.css";

/**
 * Decorative background video for the homepage hero. Muted and silent, so it carries no
 * information; the poster shows until it plays and for visitors who prefer reduced motion.
 *
 * - Autoplay starts from script only when reduced motion isn't requested.
 * - A visible pause/play button meets WCAG 2.2.2 for moving content longer than 5 seconds.
 * - Playback stops while the hero is scrolled out of view, and when Next.js hides the page
 *   with Activity (display: none doesn't stop media), and resumes unless the visitor paused.
 */
const POSTER = "/media/hero-lab-poster.webp";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByVisitor = useRef(false);
  const [playing, setPlaying] = useState(false);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.muted = true;
    const resume = () => {
      if (!pausedByVisitor.current) video.play().catch(() => undefined);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) resume();
      else video.pause();
    });
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByVisitor.current = false;
      video.muted = true;
      video.play().catch(() => undefined);
    } else {
      pausedByVisitor.current = true;
      video.pause();
    }
  }

  return (
    <>
      {/* The poster doubles as a blurred fill around the zoomed-out video. */}
      <div
        className={styles.heroMedia}
        aria-hidden="true"
        style={{ "--hero-poster": `url(${POSTER})` } as CSSProperties}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          disablePictureInPicture
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src="/media/hero-lab-480.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/media/hero-lab-720.mp4" type="video/mp4" />
        </video>
      </div>
      <button
        type="button"
        className={styles.videoToggle}
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        title={playing ? "Pause background video" : "Play background video"}
      >
        {playing ? <PauseIcon width={18} height={18} /> : <PlayIcon width={18} height={18} />}
      </button>
    </>
  );
}
