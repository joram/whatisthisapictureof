import React, {Component} from 'react';
import './App.css';
import ClipLoader from "react-spinners/ClipLoader";
import ImageUploader from 'react-images-upload';



class App extends Component {

    state = {
        images: [],
        tags: [],
        waiting: false,
    }

    onDrop(pictures) {
        const data = new FormData();

        let state = this.state;
        state.images = []
        state.tags = []
        state.waiting = true
        this.setState(state)

        pictures.forEach(picture => {
            data.append('file', picture);
            data.append('filename', picture.name);
        })

        fetch("/upload", { method: 'POST', body: data })
        .then(body => body.json())
        .then(data => {
            console.log(data)
            let state = this.state;
            state.images = pictures
            state.tags = data.tags
            state.waiting = false
            this.setState(state)
        });
    }

    render() {
        let label = ""
        if(this.state.tags.length > 0){
            label = this.state.tags.join(", ")
        }
        console.log(label)

        let spinner = ""
        if (this.state.waiting){
            spinner = <ClipLoader
              size={50}
              color={"#123abc"}
              loading={this.state.loading}
            />
        }

        return <div className="App">
            <h1>{label}</h1>
            {spinner}
            <ImageUploader
                withIcon={true}
                buttonText='Choose image'
                onChange={this.onDrop.bind(this)}
                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                maxFileSize={5242880}
                withPreview={true}
                singleImage={true}
            />
        </div>
    }
}

export default App;
