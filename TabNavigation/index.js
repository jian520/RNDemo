'use strict'
// React
import React from 'react'
import { AppRegistry } from 'react-native'
// Redux
import { Provider } from 'react-redux'
import store from './store'
// demo
import TabBarNavigation from './tabBar/views/TabBarNavigation'
export default class SampleNavigation extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <TabBarNavigation />
      </Provider>
    )
  }
}
