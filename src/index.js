import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyBaZeNVPP4nMzfjT3XWbdmeyrXkXjFkiUY';

// create a new component to produce html
class App extends Component{
    constructor(props){
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };
 
        this.videoSearch('fero');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }
    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 500)
            return (
                <div>
                    <SearchBar onSearchTermChange = {videoSearch}/>
                    <VideoDetail video = {this.state.selectedVideo} />
                    <VideoList 
                        onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
                        videos = {this.state.videos} />
                </div>
            );
        
    }
}
// take this compomnenet and send to HTML 
ReactDOM.render(<App />, document.querySelector('.container'));