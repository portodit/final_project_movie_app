import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native'
import { Category } from '../../types/app'
import { API_ACCESS_TOKEN } from '@env'
import { useNavigation, StackActions } from '@react-navigation/native'

const CategorySearch = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [status, setStatus] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const navigation = useNavigation()
  const pushAction = StackActions.push('MovieCategories', selectedCategory)

  useEffect(() => {
    getCategories()
  }, [])

  // Get List Categories
  const getCategories = async (): Promise<void> => {
    setStatus('loading')
    const url = `https://api.themoviedb.org/3/genre/movie/list`
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
        setCategories(response.genres)
        setStatus('success')
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }

  const CategoryItem = ({ id, name }: Category) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedCategory({ id, name })
        }}
      >
        <View
          style={{
            ...styles.category,
            backgroundColor:
              name === selectedCategory?.name ? '#8978A4' : '#C0B4D5',
          }}
        >
          <Text>{name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ width: '100%' }}>
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
        <View>
          <FlatList
            style={{
              marginTop: 8,
              marginBottom: 10,
            }}
            data={categories}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CategoryItem id={item.id} name={item.name} />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{ alignItems: 'stretch' }}
          />
          <TouchableOpacity
            style={{
              width: '100%',
              backgroundColor: '#8978A4',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              marginTop: 20,
            }}
            onPress={() => {
              navigation.dispatch(pushAction)
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '400',
                textTransform: 'capitalize',
              }}
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  category: {
    width: Dimensions.get('window').width / 2 - 25,
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
  },
})

export default CategorySearch
