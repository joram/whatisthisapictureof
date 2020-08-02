import os
from sqlalchemy import create_engine

DB_URI = os.environ['SQLALCHEMY_DATABASE_URI']
engine = create_engine(DB_URI)