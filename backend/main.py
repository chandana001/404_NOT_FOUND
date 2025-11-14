from fastapi import FastAPI
from .routers import document, wound

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.include_router(document.router, prefix="/document")
app.include_router(wound.router, prefix="/wound")

allow_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

