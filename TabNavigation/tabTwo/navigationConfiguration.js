'use strict'

import { StackNavigator } from 'react-navigation'

// Screens
import TabTwoScreenOne from '../../app/page/DoctorPage'
import DoctorDetailPage from '../../app/page/DoctorDetailPage'

const routeConfiguration = {
  TabTwoScreenOne: { screen: TabTwoScreenOne },
    DoctorDetailPage: { screen: DoctorDetailPage },
}
// going to disable the header for now

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRoute: 'TabTwoScreenOne'
}

export const NavigatorTabTwo = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
