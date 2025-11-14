"use client";


import { useRouter } from "next/navigation";

type SummaryProps = {
  data: any; // consider typing it properly later
};

export default function Summary({ data }: SummaryProps) {
  if (!data) {
    return <div>No summary data available.</div>;
  }

  const { patient_id, analysis } = data;
  const router = useRouter();


  return (
  <div className="flex flex-col items-center bg-white py-8 px-4 w-full min-h-screen pt-30">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1C43] mb-4 text-center">
      Your <span className="text-[#FF5DB1]">Summary</span> is Ready
    </h1>

    <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 text-center max-w-full sm:max-w-xl">
      Based on your discharge summary, here is a simplified analysis.
    </p>

    <div className="bg-white w-full max-w-4xl shadow-xl rounded-2xl p-6 sm:p-8 border border-[#f7c2dd] overflow-auto max-h-[80vh]">
      <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold text-[#FF5DB1] mb-4">
        📄 Patient Summary
      </h2>
      <div className="space-y-4 text-gray-700">
        <div>
          <h3 className="font-semibold text-[#2B1C43]">Patient Name</h3>
          <p className="text-gray-600">John Doe</p>
        </div>

        {/* Diagnosis */}
        {analysis?.diagnosis && analysis.diagnosis.length > 0 && (
          <div>
            <h3 className="font-semibold text-[#2B1C43]">Diagnosis</h3>
            <ul className="list-disc ml-5 text-gray-600">
              {analysis.diagnosis.map((d: any, idx: number) => (
                <li key={idx}>
                  {d.name} ({d.provisional_diagnosis})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Medicines */}
        {analysis?.medicines && analysis.medicines.length > 0 && (
          <div>
            <h3 className="font-semibold text-[#2B1C43]">Medications</h3>
            <ul className="list-disc ml-5 text-gray-600">
              {analysis.medicines.map((med: any, idx: number) => (
                <li key={idx}>
                  {med.name} - {med.dosage}, {med.frequency}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Diet Plan */}
        {analysis?.diet_plan?.summary && (
          <div>
            <h3 className="font-semibold text-[#2B1C43]">Diet Plan</h3>
            <p className="text-gray-600">{analysis.diet_plan.summary}</p>
          </div>
        )}

        {/* Follow-up */}
        {analysis?.follow_up_instructions && (
          <div>
            <h3 className="font-semibold text-[#2B1C43]">Follow-up</h3>
            <p className="text-gray-600">{analysis.follow_up_instructions}</p>
          </div>
        )}
      </div>
    </div>

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
              Upload Again Summary
            </button>
  </div>
);

}
