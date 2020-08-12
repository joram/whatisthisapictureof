import React, {Component} from 'react';
import Gallery from 'react-grid-gallery';


class ImagesPage extends Component {
    render() {
        let images = []
        this.props.images.forEach(image => {
            let tagStrings = image.tags.split(",")
            let tags = []
            tagStrings.forEach(t => {
                tags.push({value:t, title:t})
            })

            images.push({
                src: image.s3_path,
                thumbnail: image.s3_path,
                tags: tags,
                caption: image.id
            })
        })
        images.sort(function (a, b) { return 0.5 - Math.random() })
        return <Gallery images={images}/>
    }
}

export default ImagesPage;