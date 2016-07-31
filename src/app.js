'use strict'

import React from 'react'
import { render } from 'react-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import MusicBox from './components/MusicBox/MusicBox'

render(
  <MusicBox />,
  document.querySelector('#app')
)