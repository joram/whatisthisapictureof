import React, {Component} from 'react';
import './App.css';


import ImageUploader from 'react-images-upload';



class App extends Component {

    state = {
        images: [],
        tags: [],
    }

    onDrop(pictures) {
        const data = new FormData();

            let state = this.state;
            state.images = []
            state.tags = []
            this.setState(state)


        pictures.forEach(picture => {
            data.append('file', picture);
            data.append('filename', picture.name);
        })

        fetch("https://whatisthisapictureof.herokuapp.com/upload", { method: 'POST', body: data })
        .then(body => body.json())
        .then(data => {
            console.log(data)
            let state = this.state;
            state.images = pictures
            state.tags = data.tags
            this.setState(state)
        });
    }


    render() {
        let label = ""
        if(this.state.tags.length > 0){
            label = this.state.tags.join(", ")
        }
        console.log(label)

        return <div className="App">
            <h1>{label}</h1>
            <ImageUploader
                withIcon={true}
                buttonText='Choose image'
                onChange={this.onDrop.bind(this)}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                withPreview={true}
                singleImage={true}
                label={label}
            />
        </div>
    }
}

export default App;
