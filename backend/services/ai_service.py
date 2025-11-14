import requests
import json
from transformers import pipeline
from PIL import Image
import io
import os
from dotenv import load_dotenv

# Load model once when the service starts
model = pipeline(
    task="image-classification",
    model="google/vit-base-patch16-224",
    token=os.getenv("HUGGING_FACE_TOKEN")
)


def analyze_document(text):
    

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
{text}
"""

    # Call Ollama
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "medllama2",
            "prompt": prompt,
            "stream": False,
            "format": "json",
            "options": {
                "temperature": 0,
                "num_ctx": 8192
            }
        }
    )
    print(text, "text from ocr")
    # Extract raw text
    raw_output = response.json().get("response", "")

    # PARSE JSON SAFELY
    try:
        parsed_json = json.loads(raw_output)
        return parsed_json  # ← THIS IS WHAT YOU WANT
    except json.JSONDecodeError:
        return {"error": "Invalid JSON returned by model", "raw": raw_output}



def analyze_wound(image_bytes: bytes):
    """Analyze wound from uploaded image bytes."""

    # Convert uploaded bytes → PIL image (works for JPG/PNG)
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # Run predictions
    predictions = model(image)

    # Top prediction
    top = predictions[0]
    label = top["label"]
    score = float(top["score"])

    # Generate wound observations (generic but useful)
    healing_score = round(score * 100, 2)

    if score > 0.8:
        infection_risk = "low"
    elif score > 0.5:
        infection_risk = "moderate"
    else:
        infection_risk = "high"

    return {
        "predicted_label": label,
        "confidence": score,
        "infection_risk": infection_risk,
        "healing_score": healing_score,
        "observations": {
            "redness": "mild" if score > 0.6 else "visible",
            "swelling": "minimal" if score > 0.6 else "present"
        },
        "suggestions": [
            "Clean wound with saline water",
            "Apply antibacterial ointment",
            "Keep the area dry",
            "Monitor for increased redness or pus"
        ]
    }
