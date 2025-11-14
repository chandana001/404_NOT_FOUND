import os
import uuid
from fastapi import APIRouter, UploadFile, File
from backend.services.ocr_service import extract_text
from backend.services.ai_service import analyze_document

router = APIRouter()

UPLOAD_DIR = "uploads/documents"

@router.post("/analyze")
async def analyze_document_api(patient_id: str, file: UploadFile = File(...)):
    os.makedirs(f"{UPLOAD_DIR}/{patient_id}", exist_ok=True)

    file_ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{file_ext}"
    filepath = f"{UPLOAD_DIR}/{patient_id}/{filename}"

    with open(filepath, "wb") as f:
        f.write(await file.read())

    text = extract_text(filepath)
    analysis = analyze_document(text)

    return {
        "status": "success",
        "patient_id": patient_id,
        "file_path": filepath,
        "analysis": analysis
    }


