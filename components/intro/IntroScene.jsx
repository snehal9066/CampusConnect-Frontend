"use client";

import Background from "./Background";
import Particles from "./Particles";
import CampusBackground from "./CampusBackground";
import Students from "./Students";
import Features from "./Features";
import Connection from "./Connection";
import Logo from "./Logo";
import LoginCard from "./LoginCard";

export default function IntroScene() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">

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