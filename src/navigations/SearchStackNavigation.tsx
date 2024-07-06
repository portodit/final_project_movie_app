import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../components/movies/MovieDetail'
import Search from '../screens/Search'
import MovieCategories from '../components/search/MovieCategories'

const Stack = createNativeStackNavigator()
const SearchStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Cari">
      <Stack.Screen
        name="Cari"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieCategories"
        component={MovieCategories}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  )
}

export default SearchStackNavigator
