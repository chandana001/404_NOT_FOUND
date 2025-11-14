import os
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.services.ai_service import analyze_wound

router = APIRouter()

UPLOAD_DIR = "uploads/wounds"

# @router.post("/analyze")
# async def analyze_wound_api(patient_id: str, file: UploadFile = File(...)):
#     os.makedirs(f"{UPLOAD_DIR}/{patient_id}", exist_ok=True)

#     filename = f"{uuid.uuid4()}.jpg"
#     filepath = f"{UPLOAD_DIR}/{patient_id}/{filename}"

#     with open(filepath, "wb") as f:
#         f.write(await file.read())

#     result = analyze_wound(filepath)

#     return {
#         "status": "success",
#         "patient_id": patient_id,
#         "file_path": filepath,
#         "wound_analysis": result
#     }

@router.post("/analyze-wound")
async def analyze_wound_endpoint(file: UploadFile = File(...)):
    # Ensure valid image format
    if not file.filename.lower().endswith((".jpg", ".jpeg", ".png")):
        raise HTTPException(status_code=400, detail="Invalid image format")

    # Read file bytes
    image_bytes = await file.read()

    # Run AI analysis
    result = analyze_wound(image_bytes)

    return {"status": "success", "data": result}
