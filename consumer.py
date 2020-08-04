from utils import get_message_from_sqs, download_to_tempfile
from predict import figure_out_image_tags
from db import get_image, update_image_tags


while True:
    image_id = get_message_from_sqs()
    if image_id is None:
        continue

    data = get_image(image_id)
    path = download_to_tempfile(data["s3_path"])
    tags = figure_out_image_tags(path)
    update_image_tags(image_id, ",".join(tags))

