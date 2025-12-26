import React from "react";

// Existing imports (keep yours as-is)
import Hero from "./Hero";
import Stats from "./Stats";
import PopularCourses from "./PopularCourses";
import LearningPaths from "./LearningPaths";
import Footer from "./Footer";

// ✅ NEW: Placement section import
import PlacementSection from "./PlacementSection";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Stats */}
      <Stats />

      {/* Popular Courses */}
      <PopularCourses />

      {/* Learning Paths */}
      <LearningPaths />

      {/* ✅ Career / Placement Support Section */}
      <PlacementSection />

      {/* Footer */}
      <Footer />
    </>
  );
}
