import React, {Component} from 'react';
import ImagesPage from "./imagesPage";


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
        return <ImagesPage images={this.state.images} />
    }
}

export default AllUploadedImages;