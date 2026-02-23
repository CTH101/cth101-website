from fastapi import FastAPI, UploadFile, File, Form, Body
import subprocess
import json
import shutil
import os
from fastapi.middleware.cors import CORSMiddleware
from auth import authenticate_user, create_access_token, register_user
from security import verify_token
from fastapi import Depends


app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "temp_logs"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def root():
    return {"message": "LogGuard API running"}


# ---------------- LOGIN API ----------------
@app.post("/login")
async def login(email: str = Body(...), password: str = Body(...)):

    user = authenticate_user(email, password)

    if not user:
        return {"error": "invalid credentials"}

    token = create_access_token({"sub": user["email"]})

    return {"access_token": token}

@app.post("/register")
async def register(email: str = Body(...), password: str = Body(...)):

    success = register_user(email, password)

    if not success:
        return {"error": "User already exists"}

    return {"message": "User registered successfully"}




# ---------------- ANALYZE API ----------------
@app.post("/analyze")
async def analyze_log(
    user: str = Depends(verify_token),
    log_type: str = Form(...),
    file: UploadFile = File(...)
):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    subprocess.run([
        "python",
        "../cyber_tools-main/loghawk2/main.py",
        "--log-type",
        log_type,
        "--file",
        file_path
    ])

    report_path = "../cyber_tools-main/loghawk2/report.json"

    if os.path.exists(report_path):
        with open(report_path) as f:
            data = json.load(f)
        return data

    return {"error": "report not generated"}
