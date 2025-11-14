"use client";

export default function SummaryPage() {
  return (
    <div className="flex flex-col items-center bg-white py-16 px-6">
      
      {/* Title */}
      <h1 className="text-4xl font-bold text-[#2B1C43] mb-4 text-center">
        Your <span className="text-[#FF5DB1]">Summary</span> is Ready
      </h1>

      <p className="text-gray-600 mb-10 text-lg text-center max-w-xl">
        Based on your discharge summary, here is a simplified analysis to help
        you track your recovery easily.
      </p>

      {/* Summary Card */}
      <div className="bg-white w-full max-w-3xl shadow-xl rounded-2xl p-8 border border-[#f7c2dd]">
        
        <h2 className="text-2xl font-semibold text-[#FF5DB1] mb-4">
          📄 Patient Summary
        </h2>

        <div className="space-y-4 text-gray-700">

          <div>
            <h3 className="font-semibold text-[#2B1C43]">Patient Name</h3>
            <p className="text-gray-600">John Doe</p>
          </div>

          <div>
            <h3 className="font-semibold text-[#2B1C43]">Diagnosis</h3>
            <p className="text-gray-600">
              Acute post-operative wound with mild inflammation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#2B1C43]">Medications</h3>
            <ul className="list-disc ml-5 text-gray-600">
              <li>Paracetamol 500mg – Twice a day</li>
              <li>Antibiotic course – 5 days</li>
              <li>Dressing ointment – Once a day</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#2B1C43]">Discharge Advice</h3>
            <p className="text-gray-600">
              Keep the wound dry, avoid heavy lifting, and follow proper dressing
              instructions daily.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#2B1C43]">Follow-up</h3>
            <p className="text-gray-600">Visit after 7 days or earlier if pain increases.</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        className="mt-10 bg-[#FF5DB1] text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-[#ff4aa6] transition"
        onClick={() => (window.location.href = "/upload-image")}
      >
        Upload Wound Image →
      </button>
    </div>
  );
}
