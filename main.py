from imageai.Prediction import ImagePrediction
import os
import pprint


def figure_out_image_tags(image_path, min_prob=10):
    execution_path = os.getcwd()
    prediction = ImagePrediction()
    prediction.setModelTypeAsResNet()
    prediction.setModelPath(os.path.join(execution_path, "resnet50_weights_tf_dim_ordering_tf_kernels.h5"))
    prediction.loadModel()

    predictions, percentage_probabilities = prediction.predictImage(image_path, result_count=10)

    tags = []
    for index in range(len(predictions)):
        name = predictions[index]
        prob = percentage_probabilities[index]
        if prob > min_prob:
            tags.append(name)
    return tags


if __name__ == '__main__':
    image_path = os.path.join(os.getcwd(), "example.jpg")
    print(figure_out_image_tags(image_path))

    image_path = os.path.join(os.getcwd(), "cat.jpg")
    print(figure_out_image_tags(image_path))
