import React, { useState } from 'react'
import {
  View,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import { Movie } from '../../types/app'
import MovieItem from '../movies/MovieItem'
import { FontAwesome } from '@expo/vector-icons'

const KeywordSearch = () => {
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])

  const getMoviesKeyword = async (): Promise<void> => {
    setStatus('loading')
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&language=en-US&page=1`
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
    <SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput
          multiline={false}
          numberOfLines={1}
          defaultValue={keyword}
          placeholder={'Input title movie here'}
          onChangeText={setKeyword}
          onSubmitEditing={() => {
            getMoviesKeyword()
          }}
          style={{ height: 60, width: '80%' }}
        />
        <FontAwesome
          name={`search`}
          size={20}

          // style={{ padding: 15 }}
        />
      </View>

      {status === 'loading' ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
          style={{
            marginTop: 8,
            // minHeight: '100%',
            marginBottom: 10,
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
          contentContainerStyle={{ paddingBottom: 60 }}
          ListFooterComponent={<View style={{ height: 350 }} />}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#DDD',
    height: 60,
    paddingHorizontal: 20,
  },
})

export default KeywordSearch
