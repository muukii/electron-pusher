import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { MainView } from '@/view/main/MainView.tsx'

import 'bulma/css/bulma.css'

ReactDOM.render(
  <MainView />,
  document.getElementById('app')
)