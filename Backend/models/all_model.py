# models/all_model.py

import enum
from sqlalchemy import (
    Column, Integer, String, Float, Date, Enum,
    ForeignKey, DateTime, Text, Numeric, Boolean
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy import Enum as SQLAlchemyEnum
# IMPORTANT: Import the single, shared Base object from your database file
from database.postgresConn import Base


# --- MODELS ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    reset_token = Column(String, nullable=True)         # Stores the 6-digit OTP
    reset_token_expiry = Column(DateTime, nullable=True) # Stores Expiration Time
    created_at = Column(DateTime(timezone=True), server_default=func.now())
