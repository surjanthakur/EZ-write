from sqlmodel import SQLModel


class User(SQLModel, table="true"):
    pass
