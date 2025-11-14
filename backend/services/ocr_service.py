import pytesseract
from PIL import Image
import fitz  # PyMuPDF

def extract_text(file_path):
    if file_path.endswith(".pdf"):
        text = ""
        pdf = fitz.open(file_path)
        for page in pdf:
            text += page.get_text()
        return text

    else:
        img = Image.open(file_path)
        return pytesseract.image_to_string(img)
