from imageai.Prediction import ImagePrediction
import os
import tempfile


def figure_out_image_tags(b_file, min_prob=10):

    # write temp file
    i, path = tempfile.mkstemp(suffix=".jpg")
    with open(path, 'wb') as f:
        f.write(b_file.read())

    # init predictor
    execution_path = os.getcwd()
    prediction = ImagePrediction()
    prediction.setModelTypeAsResNet()
    prediction.setModelPath(os.path.join(execution_path, "resnet50_weights_tf_dim_ordering_tf_kernels.h5"))
    prediction.loadModel()

    # likely tags
    tags = []
    predictions, percentage_probabilities = prediction.predictImage(path, result_count=10)
    for index in range(len(predictions)):
        name = predictions[index]
        prob = percentage_probabilities[index]
        if prob > min_prob:
            tags.append(name.replace("_", " "))

    return tags
