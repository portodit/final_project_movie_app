import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../components/movies/MovieDetail'
import Favorite from '../screens/Favorite'

const Stack = createNativeStackNavigator()
const FavoriteStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Favorit">
      <Stack.Screen
        name="Favorit"
        component={Favorite}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  )
}

export default FavoriteStackNavigator
