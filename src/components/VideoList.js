import React from 'react'
import Video from './Video'
import './VideoList.css'
import { videoListRef } from './database'

function VideoOne({ url }) {
    return (
        <div className="VideoOne" >
            <Video url={url} />
        </div>
    )
}

class VideoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            url: 'https://youtu.be/lPM6x_WDdoY'
        }
    }
    componentDidMount = () => {
        videoListRef.on('value', snapshot => {
            let listTemp = snapshot.val() || []
            let halo = [];
            Object.keys(listTemp).map(k => {
                halo.push(listTemp[k])
            });
            this.setState({ list: halo })
        })
        fetch('https://www.googleapis.com/youtube/v3/videos?id=qQorV6J4Dz4&key=AIzaSyClu0blTka0lH7eNUt_jkqXX2dudAP8xMw&part=snippet,contentDetails,statistics,status')
            .then((response) => {
                console.log(response)
            }).
            then((recurso) => { console.log(recurso) })
    }
    _onClick = (url, event) => {
        event.preventDefault();
        this.setState({ url })
        console.log(url)
    }

    render() {
        if (this.state.list.length > 0) {
            return (
                <div className="VideoView">
                    <VideoOne url={this.state.url} />
                    <div className="VideoList">
                        {this.state.list.map((video, index) => {
                            return (
                                <VideoListItem video={video} key={index} index={index + 1} onClick={this._onClick} />
                            );
                        })}
                    </div>

                </div>
            )

        } else {
            return <p className="VideoView">Cargando ...</p>
        }
    }
}
function VideoListItem({ index, video, onClick }) {
    const _index = index < 10 ? `0${index}.` : `${index}.`
    return (
        <div className="VideoListItem" onClick={onClick.bind(null, video.url)} > 
            <h4>{_index} {video.title} - {video.duration}</h4>
        </div>
    )
}


export default VideoList;