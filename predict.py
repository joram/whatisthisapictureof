from imageai.Prediction import ImagePrediction
import os
import tempfile

prediction = None

def get_prediction():
    global prediction
    if prediction is not None:
        return prediction
    execution_path = os.getcwd()
    prediction = ImagePrediction()
    prediction.setModelTypeAsResNet()
    prediction.setModelPath(os.path.join(execution_path, "resnet50_weights_tf_dim_ordering_tf_kernels.h5"))
    prediction.loadModel(prediction_speed="normal")
    return prediction


def figure_out_image_tags(path, min_prob=10):
    tags = []
    predictions, percentage_probabilities = get_prediction().predictImage(path, result_count=10)
    for index in range(len(predictions)):
        name = predictions[index]
        prob = percentage_probabilities[index]
        if prob > min_prob:
            tags.append(name.replace("_", " "))
    return tags
