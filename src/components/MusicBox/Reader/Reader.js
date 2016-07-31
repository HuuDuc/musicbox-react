'use strict'

import React, { Component } from 'react'
import styles from './Reader.css'

export default class Reader extends Component
{
    constructor(props)
    {
        super(props)
        this.onPause = this.handleOnPause.bind(this)
        this.onPlay = this.handleOnPlay.bind(this)
        this.onEnded  = this.handleOnEnded.bind(this)
        this.handlePlay = this.handlePlay.bind(this)
        this.backward = this.handleBackward.bind(this)
        this.forward = this.handleForward.bind(this)
    }

    componentWillMount()
    {
        this.state = {
            beforePlaytitle: this.props.music.title,
            title: '--',
            url: this.props.music.url,
            reading: true,
        }
    }

    componentDidMount()
    {
        this.setState({
            audio: document.querySelector('.' + styles.reader_audio),
            duration: '--:--',
            seconds: '--:--',
            title: '--'
        })
    }

    componentWillReceiveProps(props)
    {
        if (props.music.title != this.state.title) {
            this.setState({
                url: props.music.url,
                beforePlaytitle: props.music.title,
                duration: '--:--',
                seconds: '--:--',
                title: '--'
            })
            this.state.audio.pause()
            this.state.audio.load()
        }
    }

    handleBackward() {
        this.props.switch('prev')
    }

    handleForward() {
        this.props.switch('next')
    }

    handleOnPause()
    {
        this.setState({reading: false})
        this.state.audio.pause()
    }

    handleOnPlay()
    {
        this.setState({
            reading: true,
            duration: this.formatTime(this.state.audio.duration),
            title: this.state.beforePlaytitle
        })
        clearInterval(this.interval)
        this.interval = setInterval(this.getCurrentTime.bind(this), 1000)
    }

    handleOnEnded()
    {
        this.setState({
            reading: false,
            duration: '--:--',
            seconds: '--:--',
            title: '--'
        })
        this.props.switch('next')
    }

    handlePlay()
    {
        if (this.state.reading == true) {
            this.state.audio.pause()
        }
        else {
            this.state.audio.play()
        }
    }

    getCurrentTime()
    {
        if (this.state.audio.duration > 0) {
            this.setState({
                seconds: this.formatTime(this.state.audio.currentTime)
            })
        }
    }

    formatTime(time)
    {
        let minutes = Math.floor(time / 60)
        minutes = (minutes >= 10) ? minutes : "0" + minutes
        let seconds = Math.floor(time % 60)
        seconds = (seconds >= 10) ? seconds : "0" + seconds

        return minutes + ":" + seconds
    }

    render()
    {
        let {
            reader,
            reader_span,
            reader_title,
            reader_audio
        } = styles

        let classReading = this.state.reading ? 'glyphicon-pause' : 'glyphicon-play'

        return (
            <div>
                <h4 className={reader_title}>{this.state.title}</h4>
                <h5>{this.state.seconds} / {this.state.duration}</h5>
                <div className={reader}>
                    <span onClick={this.backward} className={reader_span + " glyphicon glyphicon-step-backward text-center"} aria-hidden="true"></span>
                    <span onClick={this.handlePlay} className={reader_span + " glyphicon " + classReading + " text-center"} aria-hidden="true"></span>
                    <span onClick={this.forward} className={reader_span + " glyphicon glyphicon-step-forward text-center"} aria-hidden="true"></span>               
                </div>
                <div className="hide">
                    <audio onEnded={this.onEnded} onPlay={this.onPlay} onPause={this.onPause} className={reader_audio} autoPlay>
                        <source src={this.state.url} type="audio/mpeg" />
                    </audio>
                </div>
            </div>
        )
    }
}