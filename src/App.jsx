import 'babel-polyfill'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

import './styles/index.less'

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  )
}
