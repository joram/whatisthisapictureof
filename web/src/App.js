import React, {Component} from 'react';
import './App.css';
import 'react-tabs/style/react-tabs.css';
import {Tab,TabList, Tabs, TabPanel} from "react-tabs";
import UploadImagePage from "./pages/uploadImage";
import TagCloudPage from "./pages/tagCloudPage";
import AllUploadedImages from "./pages/allUploadedImages";


class App extends Component {
    render(){
        return <Tabs>
            <TabList>
                <Tab>Upload Image</Tab>
                <Tab>Tag Cloud</Tab>
                <Tab>All Uploaded Images</Tab>
            </TabList>

            <TabPanel>
                <UploadImagePage/>
            </TabPanel>

            <TabPanel>
                <TagCloudPage/>
            </TabPanel>

            <TabPanel>
                <AllUploadedImages/>
            </TabPanel>

         </Tabs>
     }
}

export default App;
