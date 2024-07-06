import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import MovieItem from '../movies/MovieItem'
import { Movie } from '../../types/app'
import { API_ACCESS_TOKEN } from '@env'
import { useNavigation } from '@react-navigation/native'

const MovieCategories = ({ route }: any): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [status, setStatus] = useState('')
  const { id, name } = route.params
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ title: `${name} Genre` })
    getMoviesByCategory()
  }, [])

  const getMoviesByCategory = async (): Promise<void> => {
    setStatus('loading')
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovies(response.results)
        setStatus('success')
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontWeight: 700, fontSize: 20 }}>
          Results of {name} Genre
        </Text>
      </View>

      {status === 'loading' ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
          style={{
            marginTop: 8,
            maxHeight: '100%',
          }}
          data={movies}
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
      )}
    </View>
  )
}

export default MovieCategories
