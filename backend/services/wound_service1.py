from transformers import pipeline
# model = pipeline("image-classification", model="google/vit-base-patch16-224")

model = pipeline(
    "image-classification",
    model="caden/wound-severity-mobilenet",
    top_k=5
)

# def analyze_wound(image_path):
#     predictions = model(image_path)
    
    # # Basic interpretation logic
    # return {
    #     "infection_risk": "low" if predictions[0]["score"] > 0.7 else "moderate",
    #     "observations": {
    #         "redness": "mild",
    #         "swelling": "none"
    #     },
    #     "suggestions": [
    #         "Keep wound clean and dry",
    #         "Apply antiseptic ointment",
    #         "Avoid touching the area"
    #     ]
    # }

def analyze_wound(image_path):
    predictions = model(image_path)

    result = {
        "infection_risk": None,
        "observations": {
            "redness": None,
            "swelling": None
        },
        "suggestions": []
    }

    for pred in predictions:
        label = pred["label"].lower()
        score = pred["score"]

        # Handle infection
        if "infect" in label:
            result["infection_risk"] = "high" if "infected" in label else "low"

        # Handle redness
        if "redness" in label:
            result["observations"]["redness"] = label.replace("redness_", "")

        # Handle swelling
        if "swelling" in label:
            result["observations"]["swelling"] = label.replace("swelling_", "")

    # Suggestions based on actual model result
    if result["infection_risk"] == "high":
        result["suggestions"].append("Consult a doctor immediately.")
        result["suggestions"].append("Start antibiotic dressing if advised.")
    else:
        result["suggestions"].append("Keep wound clean and dry.")
        result["suggestions"].append("Apply antiseptic ointment daily.")

    return result
