import React, {Component} from 'react';
import Gallery from 'react-grid-gallery';


class AllUploadedImages extends Component {
    state = {
        images: [],
    }

    constructor(props) {
        super(props);
        fetch(`https://www.whatisthisapictureof.com/api/v0/images`, {method: 'GET'})
            .then(body => body.json())
            .then(data => {
                let state = this.state;
                state.images = data.images
                this.setState(state)
            })
    }

    render() {
        let images = []
        this.state.images.forEach(image => {
            let tagStrings = image.tags.split(",")
            let tags = []
            tagStrings.forEach(t => {
                tags.push({value:t, title:t})
            })

            images.push({
                src: image.s3_path,
                thumbnail: image.s3_path,
                // thumbnailWidth: 320,
                // thumbnailHeight: 212,
                tags: tags,
                caption: image.id
            })
        })
        images.sort(function (a, b) { return 0.5 - Math.random() })
        return <Gallery images={images}/>
    }
}

export default AllUploadedImages;