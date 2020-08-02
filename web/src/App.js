import React, {Component} from 'react';
import './App.css';


import ImageUploader from 'react-images-upload';



class App extends Component {

    state = {
        images: [],
    }

    onDrop(pictures) {
        const data = new FormData();

        pictures.forEach(picture => {
            data.append('file', picture);
            data.append('filename', picture.name);
        })

        fetch('http://localhost:5000/upload', { method: 'POST', body: data })
        .then(body => {
            let state = this.state;
            state.images = pictures
            this.setState(state)
        });
    }


    render() {
        return <div className="App">
            <header className="App-header">
                <ImageUploader
                    withIcon={true}
                    buttonText='Choose image'
                    onChange={this.onDrop.bind(this)}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
                    singleImage={true}
                />
            </header>
        </div>
    }
}

export default App;
