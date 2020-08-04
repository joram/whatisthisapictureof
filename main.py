#!/usr/bin/env python3
import os
from flask import Flask, send_from_directory, request
from flask_cors import CORS, cross_origin
from predict import figure_out_image_tags
from db import get_image, insert_image, get_image_id
from utils import get_temp_image_from_request, upload_file_to_s3, put_message_on_sqs


app = Flask(__name__, static_url_path='/', static_folder="./build/")
cors = CORS(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def static_files(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')


@cross_origin()
@app.route('/api/v0/image', methods=['POST'])
def upload_image():

    image_uid = get_image_id()
    path, content, filename = get_temp_image_from_request()
    uid_filename = f"{image_uid}{os.path.splitext(filename)[1]}"

    s3_path = upload_file_to_s3(content, uid_filename)

    # tags = figure_out_image_tags(path)
    tags = []
    insert_image(image_uid, s3_path, ",".join(tags))
    put_message_on_sqs(image_uid)

    return {"tags": tags, "id": image_uid}


@cross_origin()
@app.route('/api/v0/image/<string:uid>', methods=['GET'])
def get_image_info(uid):
    return get_image(uid)


if __name__ == "__main__":
    app.run(debug=True, port=int(os.environ.get("PORT", "5000")))

