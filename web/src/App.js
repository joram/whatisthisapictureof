import React, {Component} from 'react';
import './App.css';
import { Carousel } from 'react-responsive-carousel';


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
        let carousel = null;
        if (this.state.images.length > 0) {
            // console.log(this.state.images)
            // carousel = <Carousel>
            //     <div>
            //         <img src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
            //         <p className="legend">Legend 1</p>
            //     </div>
            // </Carousel>
        }

        return <div className="App">
            <header className="App-header">
                {carousel}
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
