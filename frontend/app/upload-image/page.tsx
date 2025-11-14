"use client";

import { useState } from "react";

export default function WoundRecovery() {
  const [tasks, setTasks] = useState([
    "Change dressing",
    "Take medication",
    "Upload wound photo",
  ]);
  const [alerts, setAlerts] = useState(["No alerts"]);
  const [file, setFile] = useState<File | null>(null);
  const [backendData, setBackendData] = useState<any>(null); // store API response

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/wound/analyze-wound", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const result = await response.json();
      setBackendData(result.data);
    } catch (error) {
      console.error(error);
      alert("Failed to upload file.");
    }
  };

  return (
    <div className="min-h-screen bg-white md:p-10 mt-20 font-sans">

      {/* Title */}
      <h1 className="text-3xl text-[#66033d] font-semibold mb-6">Wound Recovery</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-r from-[#f091c2] to-[#66033d] text-white rounded-xl p-6 flex flex-col justify-center">
          <p className="text-lg font-semibold">
            {backendData ? backendData.predicted_label : "Day 5"}
          </p>
          <p className="text-sm">
            {backendData
              ? `Confidence: ${(backendData.confidence * 100).toFixed(1)}%`
              : "Post-Op"}
          </p>
        </div>
        <div className="bg-white border rounded-xl p-6 flex flex-col justify-center">
          <p className="text-sm text-gray-600 mb-2">Healing Progress</p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-[#f091c2] to-[#66033d] h-4 rounded-full"
              style={{
                width: `${backendData ? backendData.healing_score : 60}%`,
              }}
            />
          </div>
          <p className="text-right text-sm text-gray-600 mt-1">
            {backendData ? backendData.healing_score.toFixed(1) : 60}%
          </p>
        </div>
      </div>

      {/* Tasks and Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-[#66033d] mb-3">Tasks Today</h2>
          <ul className="list-disc ml-5 text-gray-700">
            {tasks.map((task, idx) => (
              <li key={idx}>{task}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-[#66033d] mb-3">Alerts</h2>
          <ul className="list-disc ml-5 text-gray-700">
            {alerts.map((alert, idx) => (
              <li key={idx}>{alert}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white border rounded-xl p-6 flex flex-col md:flex-row items-center gap-4 mb-6">
        <label className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
            className="hidden"
          />
          <div className="border p-2 rounded-md w-full text-[#66033d] cursor-pointer text-center md:text-left">
            {file ? file.name : "Choose file"}
          </div>
        </label>
        <button
          className="bg-gradient-to-r from-[#f091c2] to-[#66033d] text-white px-6 py-2 rounded-md hover:opacity-90 transition"
          onClick={handleUpload}
        >
          UPLOAD
        </button>
      </div>


      {/* Backend Analysis */}
      {backendData && (
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-[#66033d] mb-3">Analysis</h2>
          <div className="text-gray-700 space-y-2">
            <p><strong>Predicted Label:</strong> {backendData.predicted_label}</p>
            <p><strong>Infection Risk:</strong> {backendData.infection_risk}</p>
            <p><strong>Healing Score:</strong> {backendData.healing_score.toFixed(1)}</p>
            <p><strong>Observations:</strong></p>
            <ul className="list-disc ml-5">
              {Object.entries(backendData.observations).map(([key, value], idx) => (
                <li key={idx}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </li>
              ))}
            </ul>
            <p><strong>Suggestions:</strong></p>
            <ul className="list-disc ml-5">
              {backendData.suggestions.map((s: string, idx: number) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
