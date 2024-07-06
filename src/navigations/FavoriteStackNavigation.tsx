import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Favorite from '../screens/Favorite'
import MovieDetail from '../screens/MovieDetail'
import { FavoriteStackParamList } from '../types/app'

const Stack = createNativeStackNavigator<FavoriteStackParamList>()

const FavoriteStackNavigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="Favorites">
      <Stack.Screen
        name="Favorites"
        component={Favorite}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  )
}

export default FavoriteStackNavigator
