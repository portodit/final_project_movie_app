import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Movie } from '../types/app'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MovieItem from '../components/movies/MovieItem'

const Favorite = (): JSX.Element => {
  const [favMovieList, setFavMovieList] = useState<Movie[]>([])

  useEffect(() => {
    getFavMovieList()
  }, [favMovieList])

  const getFavMovieList = async (): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData)
        setFavMovieList(favMovieList)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontWeight: 700, fontSize: 20 }}>
          Your Favorite Movies
        </Text>
      </View>
      <FlatList
        style={{
          marginTop: 8,
          maxHeight: '100%',
        }}
        data={favMovieList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            size={{ width: 100, height: 160 }}
            coverType={'backdrop'}
            margin={{ marginVertical: 5, marginHorizontal: 5 }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
      />
    </View>
  )
}

export default Favorite
