'use strict'

import React, { Component } from 'react'
import styles from './Add.scss'

export default class Add extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            url: '',
            title: '',
            hide: true
        }
        this.hideForm = this.handleHideForm.bind(this)
        this.add = this.handleSubmit.bind(this)
        this.change = this.handleChange.bind(this)
    }

    handleHideForm()
    {
        this.setState({
            url: '',
            title: '',
            hide: true
        })
    }

    handleSubmit()
    {
        let data = {
            url: this.state.url.trim(),
            title: this.state.title.trim()
        }
         
        if (data.url && data.title) {
            this.props.addMusic(data)
        }
    }

    handleChange(event)
    {
        let key = event.target.name,
            val = event.target.value,
            obj  = {}
        obj[key] = val

        this.setState(obj);
    }

    componentWillReceiveProps(props)
    {
        if (props.show == true) {
            this.setState({
                hide: !props.show
            })
        }

        if (props.show == 'added') {
            this.setState({
                hide: true
            })
        }
    }

    render()
    {
        const {
            form_close,
            form_container,
            form_container_hide,
            form_h3,
            form_input,
            form_submit
        } = styles

        const hide = this.state.hide ? form_container_hide : form_container

        return (
            <div className={hide} ref='formContainer'>
                <span onClick={this.hideForm} className={"glyphicon glyphicon-remove " + form_close} aria-hidden="true"></span>
                <h3 className={"text-center text-uppercase " + form_h3}>Add music</h3>
                <p className="text-center">
                    <label className="text-uppercase">title</label><br />
                    <input onChange={this.change} className={form_input} type="text" name="title"/>
                </p>
                <p className="text-center">
                    <label className="text-uppercase">url</label><br />
                    <input onChange={this.change} className={form_input} type="text" name="url"/>
                </p>
                <p className="text-center">
                    <button onClick={this.add} className={"text-uppercase " + form_submit}>submit</button>
                </p>
            </div>
        )
    }
}