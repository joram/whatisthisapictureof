import urllib.parse as urlparse
import os
import psycopg2
from psycopg2 import OperationalError
import uuid


def get_image_id():
    return f"img_{uuid.uuid4().hex}"


def create_connection():
    url = urlparse.urlparse(os.environ['DATABASE_URL'])
    dbname = url.path[1:]
    user = url.username
    password = url.password
    host = url.hostname
    port = url.port

    connection = None
    try:
        connection = psycopg2.connect(
            database=dbname,
            user=user,
            password=password,
            host=host,
            port=port,
        )
    except OperationalError as e:
        print(f"The error '{e}' occurred")
    return connection


def execute_query(connection, query, results=False):
    print(query.replace("\n", " "))
    connection.autocommit = True
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        if results:
            result = cursor.fetchall()
            return result
    except OperationalError as e:
        print(f"The error '{e}' occurred")


def create_table():
    create_images_table = """
        CREATE TABLE IF NOT EXISTS images (
          id TEXT PRIMARY KEY,
          s3_path TEXT NOT NULL,
          tags TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )"""
    connection = create_connection()
    execute_query(connection, create_images_table)


def remove_table():
    remove_images_table = "DROP TABLE images"
    connection = create_connection()
    execute_query(connection, remove_images_table)


def get_image(uid):
    select_image = f"SELECT * FROM images WHERE id='{uid}'"
    connection = create_connection()
    results = execute_query(connection, select_image, results=True)
    if len(results) == 0:
        return None

    (uid, s3_path, tags, created_at) = results[0]
    return {
        "id": uid,
        "s3_path": s3_path,
        "tags": tags,
        "created_at": created_at
    }


def insert_image(uid, s3_path, tags):
    insert_image = f"INSERT INTO images (id, s3_path, tags) VALUES ('{uid}', '{s3_path}', '{tags}');"
    connection = create_connection()
    execute_query(connection, insert_image)


def create_image(s3_path, tags):
    uid = get_image_id()
    insert_image(uid, s3_path, tags)
    return uid


def update_image_tags(uid, tags):
    insert_image = f"UPDATE images SET tags='{tags}' WHERE id='{uid}';"
    connection = create_connection()
    execute_query(connection, insert_image)
