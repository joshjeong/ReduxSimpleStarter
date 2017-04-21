import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDJBAWqdNdzbOlEmlcAV5wEHumBFHfs1sM';

// Create a new component. This component should produce some html
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]  // need to catch if result is none
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500);

        return (
            <div>
                <SearchBar
                    onSearchTermChange={term => videoSearch(term)} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
} //this whole const is a class

// <App /> is an instance of the class, short for <App></App>
// Take this component generated and put it on the DOM
ReactDOM.render(<App />, document.querySelector('.container')); // first argument: component instance, second: existing target dom element (index.html)
