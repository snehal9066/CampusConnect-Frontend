"use client";

import Background from "./Background";
import Particles from "./Particles";
import CampusBackground from "./CampusBackground";
import Students from "./Students";
import Features from "./Features";
import Connection from "./Connection";
import Logo from "./Logo";
import LoginCard from "./LoginCard";
import IntroOverlay from "./IntroOverlay";
"use client";

import { useState, useEffect } from "react";
import Background from "./Background";
import Particles from "./Particles";
import CampusBackground from "./CampusBackground";
import Students from "./Students";
import Features from "./Features";
import Connection from "./Connection";
import Logo from "./Logo";
import LoginCard from "./LoginCard";
import IntroOverlay from "./IntroOverlay";

export default function IntroScene() {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {showOverlay && <IntroOverlay />}
      {/* Scene 1 - Animated Background */}
      <Background />

      {/* Scene 2 - Floating Particles */}
      <Particles />

      {/* Scene 3 - Campus */}
      <CampusBackground />

      {/* Scene 4 - Students */}
      <Students />

      {/* Scene 5 - Features */}
      <Features />

      {/* Scene 6 - Connection */}
      <Connection />

      {/* Scene 7 - Logo */}
      <Logo />

      {/* Scene 8 - Login Card */}
      <LoginCard />
    </main>
  );
}