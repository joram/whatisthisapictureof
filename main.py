#!/usr/bin/env python3
import os
from flask import Flask, send_from_directory, request, redirect
import boto3, botocore
from predict import figure_out_image_tags
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename


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
    file = request.files['file']
    filename = secure_filename(file.filename)
    output = upload_file_to_s3(file)
    return '{"foo": "bar"}'


# ---- helpers ----


s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("AWS_KEY"),
    aws_secret_access_key=os.environ.get("AWS_SECRET")
)


def upload_file_to_s3(file, acl="public-read"):
    bucket_name = os.environ.get("BUCKET_NAME")
    try:

        s3.upload_fileobj(
            file,
            bucket_name,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return e


app.run(debug=True, port=int(os.environ.get("PORT", "5000")))

