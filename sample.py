import requests
import json

def analyze_document():
    discharge_text = """
Hospital Name: Sunrise Multi-Specialty Hospital
Patient Name: Ramesh Kumar
Age/Sex: 48/M
UHID: UHID-23984
Admission Date: 2025-02-10
Discharge Date: 2025-02-15
Consultant: Dr. A. Venkat, MD (General Medicine)

Chief Complaints:
- Fever since 3 days
- Body pains
- Mild cough

Provisional Diagnosis:
- Dengue Fever (NS1 Positive)

Final Diagnosis:
- Dengue Fever with Thrombocytopenia
"""

    prompt = f"""
You are a medical document parsing assistant.

STRICT RULES:
1. Output ONLY valid JSON.
2. Do NOT add comments, explanations, or natural language.
3. If any section is missing → return an empty array or null.
4. Follow this JSON structure exactly:

{{
  "diagnosis": [
      {{
          "name": "",
          "provisional_diagnosis": ""
      }}
  ],
  "medicines": [
      {{
          "name": "",
          "dosage": "",
          "frequency": ""
      }}
  ],
  "diet_plan": {{
      "summary": "",
      "recommendations": []
  }},
  "follow_up_instructions": "",
  "red_flags": []
}}

Extract from this document:
{discharge_text}
"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "medllama2",
            "prompt": prompt,
            "stream": False,
            "format": "json",        # ← VERY IMPORTANT
            "options": {
                "temperature": 0,    # ← deterministic
                "num_ctx": 8192
            }
        }
    )

    print("\n=== RAW RESPONSE ===")
    print(response.text)

    try:
        print("\n=== PARSED JSON ===")
        parsed = json.loads(response.json()["response"])
        print(json.dumps(parsed, indent=2))
    except Exception as e:
        print("\nJSON Parse Error:", e)

analyze_document()
