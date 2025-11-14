"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Summary from "../components/Summary";

export default function UploadSummary() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<any>(null);

  const handleGetSummary = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file); // just the file now

      // Append patient_id in the query string
      const patientId = "12345"; // replace with actual patient ID
      const url = `http://127.0.0.1:8000/document/analyze?patient_id=${encodeURIComponent(patientId)}`;

      const res = await fetch(url, {
        method: "POST",
        body: formData, // only file in the body
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to upload file: ${errorText}`);
      }

      const data = await res.json();
      console.log("API Response:", data);

       setSummaryData(data);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (summaryData) {
    return <Summary data={summaryData} />;
  }



  return (
    <div className="min-h-screen flex items-center justify-center px-20 bg-white">
      {/* LEFT SIDE */}
      <div className="flex flex-col items-start max-w-xl space-y-6">
        <h2 className="text-4xl font-bold text-[#2B1C43] leading-snug">
          {file
            ? "Great! Now click Get Summary"
            : "Please upload your discharge summary"}
        </h2>

        <p className="text-gray-600 text-lg">
          Upload your discharge summary below and I’ll help you understand it by
          creating a clear and simple summary.
        </p>

        {/* File Input */}
        <label
          className="cursor-pointer bg-[#FDE6F2] border-2 border-[#FF5DB1] 
          rounded-xl px-8 py-4 shadow hover:bg-[#ffcae4] transition-all duration-300"
        >
          <span className="text-[#FF5DB1] font-semibold text-lg">
            Choose PDF File
          </span>

          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) setFile(e.target.files[0]);
            }}
          />
        </label>

        {file && (
          <div className="text-[#2B1C43] font-medium">📄 {file.name}</div>
        )}

        {file && (
          <button
            className="bg-[#FF5DB1] text-white px-8 py-3 rounded-full 
              text-lg font-semibold shadow-md hover:bg-[#ff4aa6] transition"
            onClick={handleGetSummary}
            disabled={loading}
          >
            {loading ? "Processing..." : "Get Summary →"}
          </button>
        )}
      </div>

      {/* RIGHT SIDE */}
      <dotlottie-wc
        src="https://lottie.host/3021a2f8-9c9c-4d29-adb5-7aaf00aaba80/AnRgDtQVS6.lottie"
        class="w-[600px] h-[600px]"
        autoplay
        loop
      ></dotlottie-wc>
    </div>
  );
}
