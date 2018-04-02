// import 'babel-polyfill'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import NotFound from './pages/NotFound'

import './styles/index.less'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/detail" component={Detail} />
      <Route component={NotFound} />
    </Switch>
  )
}
