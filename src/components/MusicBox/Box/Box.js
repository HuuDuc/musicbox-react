'use strict'

import React, { Component } from 'react'
import styles from './Box.scss'

import Reader from '../Reader/Reader'
import ListMusic from '../ListMusic/ListMusic'
import Add from '../Add/Add'

export default class Box extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            musics: [],
            switch: '',
            displayForm: false
        }

        this.Select = this.handleSelection.bind(this)
        this.Switch = this.handleSwitch.bind(this)
        this.addMusic = this.handleAddMusic.bind(this)
        this.displayForm = this.handleDisplayForm.bind(this)
    }

    componentWillMount()
    {
        this.state.musics = [
            {
                title : 'Nokia - Ringtone',
                url: 'http://files-01.mobilesringtones.com/files/2015/05/21/10757/10757.mp3'
            },
            {
                title : 'GReeeeN - キセキ',
                url: 'https://dl-web.dropbox.com/get/GReeeeN%20-%20%E3%82%AD%E3%82%BB%E3%82%AD.mp3?_subject_uid=26551443&w=AAAX1UUbcSRrrmvVcZ_ETQ4rIEabCevRjUvMNqEGuPfXDQ&duc_id=dropbox_duc_id&dl=0'
            },
            {
                title : '7!! - Lovers',
                url : 'http://50.7.54.34/ost/naruto-shippuuden-op09-single-lovers/oknnxcgrom/01%20-%20Lovers.mp3'
            },
            {
                title : 'KANA-BOON - シルエット',
                url: 'https://dl-web.dropbox.com/get/KANA-BOOM%20-%20シルエット.mp3?_subject_uid=26551443&w=AABKRAovY0L-KkbxdccCaS6NjjKbQY8WYqX4A-hrOTkf9Q&duc_id=dropbox_duc_id&dl=0'
            }
        ]

        this.state.choice = this.state.musics[0]
    }

    handleSelection(e)
    {
        this.setState({
            choice: e,
            switch: false
        })
    }

    handleSwitch(e)
    {
        this.setState({
            switch: e
        })
    }

    handleDisplayForm(e)
    {
        this.setState({
            displayForm: true
        })
    }

    handleAddMusic(e)
    {
        let musics = this.state.musics
        musics.push(e)

        this.setState({
            musics: musics,
            displayForm: 'added'
        })
    }

    render()
    {
        const {
            box,
            box_title,
            box_row,
            box_row_div
        } = styles

        return (
            <div id="musicbox" className={box}>
                <h3 className={box_title + ' text-uppercase'}>Music Box</h3>
                <div className={box_row + ' row'}>
                    <div className={box_row_div + ' col-sm-6'}>
                        <Reader switch={this.Switch} music={this.state.choice}/>
                    </div>
                    <div className={box_row_div + ' col-sm-6'}>
                        <ListMusic openForm={this.displayForm} switchMusic={this.state.switch} music={this.state.choice} handleSelection={this.Select} list={this.state.musics}/>
                    </div>
                </div>
                <Add show={this.state.displayForm} addMusic={this.addMusic} />
            </div>
        )
    }
}