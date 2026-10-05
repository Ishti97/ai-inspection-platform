from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class Inspection(Base):
    __tablename__ = "inspections"

    id: Mapped[int] = mapped_column(primary_key=True)
    image_name: Mapped[str] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(String(50))