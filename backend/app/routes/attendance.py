from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Attendance
from ..schemas import AttendanceCreate

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("")
def mark_attendance(data: AttendanceCreate, db: Session = Depends(get_db)):
    obj = Attendance(**data.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.get("/{employee_id}")
def get_attendance(employee_id: str, db: Session = Depends(get_db)):
    return db.query(Attendance).filter(Attendance.employee_id == employee_id).all()
