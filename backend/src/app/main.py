from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from prometheus_fastapi_instrumentator import Instrumentator
from .database import Base, engine, get_db
from .models import Inspection

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Inspection Platform")

Instrumentator().instrument(app).expose(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "AI Inspection Platform API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/inspections")
def create_inspection(
    image_name: str,
    db: Session = Depends(get_db),
):
    inspection = Inspection(
        image_name=image_name,
        status="pending",
    )

    db.add(inspection)
    db.commit()
    db.refresh(inspection)

    return inspection


@app.get("/inspections")
def get_inspections(db: Session = Depends(get_db)):
    return db.query(Inspection).all()