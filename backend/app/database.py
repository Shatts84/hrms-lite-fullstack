from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# MySQL connection
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://root:root123@127.0.0.1:3306/hrms"
)

engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
