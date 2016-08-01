'use strict'

import React, { Component } from 'react'
import styles from './ListMusic.scss'

export default class ListMusic extends Component
{
    constructor(props)
    {
        super(props)
        this.state = this.props
        this.Select = this.handleClick.bind(this)
        this.addMusic = this.handleAddMusic.bind(this)
    }

    handleClick(e)
    {
        if (e.target.dataset.title != this.state.music.title) {
            this.setState({
                music:{
                    title: e.target.dataset.title,
                    url: e.target.dataset.url,
                },
                key: e.target.dataset.key
            })

            this.props.handleSelection({
                url: e.target.dataset.url,
                title: e.target.dataset.title
            })
        }
    }

    handleAddMusic()
    {
        this.props.openForm()
    }

    componentDidMount()
    {
        this.setState({
            key: 0
        })
    }

    componentWillReceiveProps(props)
    {
        if (props.switchMusic == 'prev' || props.switchMusic == 'next') {
            this.handleSwitchMusic(props)
        }
    }

    handleSwitchMusic(props)
    {
        let key, direction, music
        
        direction = (props.switchMusic == 'prev') ? -1 : 1
        key = parseInt(this.state.key) + direction

        if (key >= 0 && key <= (this.props.list.length - 1)) {
            music = this.props.list[key]

            this.setState({
                music:{
                    title: music.title,
                    url: music.url,
                },
                key: key
            })
            this.props.handleSelection({
                url: music.url,
                title: music.title
            })
        }
    }

    render()
    {
        const {
            list_container,
            list_ul,
            list_li,
            list_add,
            selected
        } = styles

        const musics = this.props.list.map((music, i) => {
            let className = (music.title == this.props.music.title) ? selected : list_li
            return(
                <li onClick={this.Select} className={className} data-url={music.url} data-key={i} key={i} data-title={music.title}>{music.title}</li>
            )
        })

        return (
            <div className={list_container}>
                <span onClick={this.addMusic} title="Add music" className={"text-center glyphicon glyphicon-plus " + list_add} aria-hidden="true"></span>
                <ul className={list_ul}>
                    {musics}
                </ul>
            </div>
        )
    }
}