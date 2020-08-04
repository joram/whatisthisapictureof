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

    updateTags(id) {
        fetch(`/api/v0/image/${id}`, { method: 'GET'})
        .then(body => body.json())
        .then(data => {
            if(data.tags === ""){
                setTimeout(this.updateTags.bind(this), 1000, id)
            } else {
                let state = this.state;
                state.tags = data.tags.split(",")
                state.waiting = false
                this.setState(state)
            }
        })
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

        fetch("/api/v0/image", { method: 'POST', body: data })
        .then(body => body.json())
        .then(data => {
            console.log(data)
            let state = this.state;
            state.images = pictures
            this.setState(state)
            this.updateTags(data.id)
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
            <br/>
            <b>all images given to this site are saved and publicly available. Please use discretion</b>
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
