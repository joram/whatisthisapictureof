import React, {Component} from 'react';
import TagCloud from "react-tag-cloud";
import ImagesPage from "./imagesPage";

class TagCloudPage extends Component {
    state = {
        tagWeights: {},
        maxCount: 0,
        images: {},
        selectedTag: null,
    }

    constructor(props) {
        super(props);
        fetch(`https://www.whatisthisapictureof.com/api/v0/images`, {method: 'GET'})
            .then(body => body.json())
            .then(data => {
                let state = this.state;
                state.maxCount = 0
                state.images = {}
                data.images.forEach(image => {
                    let tags = image.tags.split(",")
                    tags.forEach(tag => {
                        if(state.tagWeights[tag] === undefined){
                            state.tagWeights[tag] = 0
                        }
                        state.tagWeights[tag] += 1

                        if(state.images[tag] === undefined){
                            state.images[tag] = []
                        }
                        state.images[tag].push(image)

                        if(state.tagWeights[tag] > state.maxCount) {
                            state.maxCount = state.tagWeights[tag]
                        }

                    })
                })
                this.setState(state)
            })
    }

    showImages(tag) {
        let state = this.state
        state.selectedTag = tag
        this.setState(state)
    }

    showCloud() {
        let state = this.state
        state.selectedTag = null
        this.setState(state)

    }

    render() {
        if(this.state.selectedTag !== null){
            return <>
                <button onClick={this.showCloud.bind(this)}>back</button>
                <ImagesPage images={this.state.images[this.state.selectedTag]} />
            </>
        }

        let tags = []
        Object.keys(this.state.tagWeights).forEach(tag => {
            let weight = this.state.tagWeights[tag]
            let fontSize = 50*weight/this.state.maxCount+10
            tags.push(<div key={tag} style={{fontSize: fontSize}}>
                <a onClick={() => {this.showImages(tag)}}>
                    {tag}
                </a>
            </div>)
        })
        return <TagCloud
            className="tag-cloud"
            style={{
                fontFamily: "sans-serif",
                fontSize: 30,
                height: "500px",
                padding: 5
            }}
        >
            {tags}
        </TagCloud>
    }
}

export default TagCloudPage;