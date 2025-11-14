"use client";

import { useRouter } from "next/navigation";
import Footer from "./components/Footer";

export default function HomePage() {
  const router = useRouter();

  return (
    <section className="w-full bg-white pt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Side Text */}
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-bold text-[#2B1C43] leading-tight">
            <span className="text-[#66033d]">Healing Made Simple </span>
          </h1>

          <p className="mt-6 text-lg text-gray-700 max-w-lg">
            Your Companion in Every Stage Of Recovery
          </p>

          <div className="flex flex-col items-start">
            <button
              className="
    mt-8 
    bg-gradient-to-r from-[#f091c2] to-[#66033d]
    text-white 
    px-8 py-3 
    rounded-full text-lg font-semibold 
    shadow-md 
    hover:opacity-90 
    transition
  "
              onClick={() => router.push("/upload-summary")}
            >
              Upload Discharge Summary
            </button>

            <button
              className="
    mt-4 
    bg-gradient-to-r from-[#f091c2] to-[#66033d]
    text-white 
    px-8 py-3 
    rounded-full text-lg font-semibold 
    shadow-md 
    hover:opacity-90 
    transition
  "
              onClick={() => router.push("/upload-image")}
            >
              Track Wound Recovery
            </button>
          </div>
        </div>

        {/* Right Side Lottie Animation */}
        <div className="flex-1 flex justify-end mt-12 md:mt-0">
          <dotlottie-wc
            src="https://lottie.host/25a7ca8d-4051-4751-9f70-00ac5dc5e13b/AzyTJsX9eh.lottie"
            style={{ width: "600px", height: "600px" }}
            autoplay
            loop
          ></dotlottie-wc>
        </div>
      </div>

      

      <Footer />
    </section>
  );
}
