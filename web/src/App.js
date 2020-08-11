import React, {Component} from 'react';
import './App.css';
import 'react-tabs/style/react-tabs.css';
import {Tab,TabList, Tabs, TabPanel} from "react-tabs";
import UploadImagePage from "./pages/uploadImage";
import TagCloudPage from "./pages/tagCloudPage";


class App extends Component {
    render(){
        return <Tabs>
            <TabList>
                <Tab>Upload Image</Tab>
                <Tab>Tag Cloud</Tab>
            </TabList>

            <TabPanel>
                <UploadImagePage/>
            </TabPanel>

            <TabPanel>
                <TagCloudPage/>
            </TabPanel>

         </Tabs>
     }
}

export default App;
