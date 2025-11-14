"use client";

import { useEffect, useState } from "react";

const blogs = [
  {
    title: "Essential Steps After Hospital Discharge",
    desc: "A complete checklist to follow after being discharged from the hospital to ensure proper healing.",
  },
  {
    title: "How to Care For Surgical Wounds",
    desc: "Learn the right way to clean, bandage, and monitor wounds for fast healing.",
  },
  {
    title: "Identifying Early Signs of Infection",
    desc: "Recognize redness, swelling, and fever early to prevent complications.",
  },
  {
    title: "Post-Surgery Diet Recommendations",
    desc: "Foods that speed up your healing process and improve overall recovery.",
  },
  {
    title: "Managing Medications After Discharge",
    desc: "Tips to remember doses, track pills, and avoid dangerous interactions.",
  },
];

export default function BlogCarousel() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % blogs.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white py-16 px-6 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#2B1C43]">Health Blogs</h2>
        <p className="text-[#6A557A] mt-2">
          Useful tips and guides to support your recovery.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative w-full max-w-4xl mx-auto">
        <div
          className="flex transition-all duration-700"
          style={{
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {blogs.map((blog, i) => (
            <div
              key={i}
              className="min-w-full flex justify-center"
            >
              <div className="bg-[#FDE6F2] shadow-lg rounded-2xl p-8 w-full md:w-2/3">
                <h3 className="text-2xl font-semibold text-[#FF5DB1] mb-3">
                  {blog.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {blog.desc}
                </p>

                <button className="bg-[#FF5DB1] text-white px-6 py-2 rounded-full font-medium hover:bg-[#ff4aa6] transition">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-6 gap-2">
          {blogs.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                index === i ? "bg-[#FF5DB1]" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-10 text-sm text-[#8c7898] text-center">
        © 2025 PostCare Tracker. All Rights Reserved.
      </p>
    </section>
  );
}
