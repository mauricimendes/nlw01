import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Points from './pages/Points'

const AppStack = createStackNavigator()

const Routes = () => {
    return (
            <AppStack.Navigator 
                headerMode="none" 
            >
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Detail" component={Detail} />
                <AppStack.Screen name="Points" component={Points} />
            </AppStack.Navigator>
    )
}

export default Routes