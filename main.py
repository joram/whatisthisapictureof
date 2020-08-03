#!/usr/bin/env python3
import os
from flask import Flask, send_from_directory, request
import boto3
from flask_cors import CORS, cross_origin
from predict import figure_out_image_tags
import tempfile

app = Flask(__name__, static_url_path='/', static_folder="./build/")
cors = CORS(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def static_files(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')


@cross_origin()
@app.route('/upload', methods=['POST'])
def upload():
    path, content, filename = temp_image()
    upload_file_to_s3(content, filename)
    tags = figure_out_image_tags(path)
    return {"tags": tags}


# ---- helpers ----


def temp_image():
    file = request.files['file']
    content = file.read()

    # write temp file
    _, path = tempfile.mkstemp(suffix=".jpg")
    with open(path, 'wb') as f:
        f.write(content)
    return path, content, file.filename


s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("AWS_KEY"),
    aws_secret_access_key=os.environ.get("AWS_SECRET")
)


def upload_file_to_s3(content, filename, acl="public-read"):
    bucket_name = os.environ.get("BUCKET_NAME")
    try:
        s3.put_object(Body=content, Bucket=bucket_name, Key=filename)
    except Exception as e:
        print("Something Happened: ", e)
        return e

if __name__ == "__main__":
    app.run(debug=True, port=int(os.environ.get("PORT", "5000")))

