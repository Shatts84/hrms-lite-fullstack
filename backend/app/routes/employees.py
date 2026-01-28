from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Employee
from ..schemas import EmployeeCreate

router = APIRouter(prefix="/employees", tags=["Employees"])

# =========================
# CREATE
# =========================
@router.post("")
def add_employee(emp: EmployeeCreate, db: Session = Depends(get_db)):

    if db.query(Employee).filter(Employee.employee_id == emp.employee_id).first():
        raise HTTPException(409, "Employee ID already exists")

    if db.query(Employee).filter(Employee.email == emp.email).first():
        raise HTTPException(409, "Email already exists")

    data = emp.dict()

    obj = Employee(
        employee_id=data["employee_id"],
        name=data["full_name"],          # 🔥 mapping
        email=data["email"],
        department=data["department"],
    )

    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


# =========================
# READ
# =========================
@router.get("")
def list_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()


# =========================
# UPDATE
# =========================
@router.put("/{employee_id}")
def update_employee(employee_id: str, emp: EmployeeCreate, db: Session = Depends(get_db)):

    obj = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not obj:
        raise HTTPException(404, "Employee not found")

    data = emp.dict()

    obj.name = data["full_name"]        # 🔥 mapping
    obj.email = data["email"]
    obj.department = data["department"]


    db.commit()
    db.refresh(obj)
    return obj


# =========================
# DELETE
# =========================
@router.delete("/{employee_id}")
def delete_employee(employee_id: str, db: Session = Depends(get_db)):

    emp = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not emp:
        raise HTTPException(404, "Employee not found")

    db.delete(emp)
    db.commit()
    return {"message": "Employee deleted successfully"}
