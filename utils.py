from flask import request
import boto3
import os
import requests
import shutil
import tempfile


def download_to_tempfile(url):
    r = requests.get(url, stream=True)
    _, path = tempfile.mkstemp(suffix=".jpg")
    if r.status_code == 200:
        with open(path, 'wb') as f:
            r.raw.decode_content = True
            shutil.copyfileobj(r.raw, f)
    return path


def get_temp_image_from_request():
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

sqs = boto3.resource(
    'sqs',
    aws_access_key_id=os.environ.get("AWS_KEY"),
    aws_secret_access_key=os.environ.get("AWS_SECRET"),
    region_name="ca-central-1"
)


def upload_file_to_s3(content, filename):
    bucket_name = os.environ.get("BUCKET_NAME")
    try:
        r = s3.put_object(Body=content, Bucket=bucket_name, Key=filename, ACL='public-read')
    except Exception as e:
        print("Something Happened: ", e)
        return e
    return os.path.join("https://s3.ca-central-1.amazonaws.com/", bucket_name, filename)


def put_message_on_sqs(msg):
    queue = sqs.get_queue_by_name(QueueName='whatisthisapictureof_tag_processing')
    queue.send_message(MessageBody=msg)


def get_message_from_sqs():
    queue = sqs.get_queue_by_name(QueueName='whatisthisapictureof_tag_processing')
    for message in queue.receive_messages(MaxNumberOfMessages=1, WaitTimeSeconds=20):
        message.delete()
        return message.body


