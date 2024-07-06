import React from 'react';
import { ImageBackground, Text, StyleSheet, View, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MovieList from '../components/movies/MovieList';
import { MovieDetailScreenProps } from '../types/app';
import FavoriteSwitch from '../components/FavoriteSwitch';

const MovieDetail = ({ route }: MovieDetailScreenProps): React.JSX.Element => {
  const movie = route.params.data;

  return (
    <ScrollView>
      <ImageBackground
        resizeMode="cover"
        style={styles.coverImage}
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
      >
        <LinearGradient
          colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
          locations={[0.6, 0.8]}
          style={styles.gradientStyle}
        >
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="yellow" />
            <Text style={styles.rating}>{movie.vote_average}</Text>
          </View>
          <FavoriteSwitch movie={movie} />
        </LinearGradient>
      </ImageBackground>

      <View style={styles.metaContainer}>
        <Text style={styles.overview}>{movie.overview}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaItemTitle}>Bahasa Asli:</Text>
            <Text>{movie.original_language}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaItemTitle}>Tanggal Rilis:</Text>
            <Text>{new Date(movie.release_date).toLocaleDateString()}</Text>
          </View>
        </View>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaItemTitle}>Popularitas:</Text>
            <Text>{movie.popularity}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaItemTitle}>Jumlah Suara:</Text>
            <Text>{movie.vote_count}</Text>
          </View>
        </View>
      </View>

      <MovieList
        title="Rekomendasi"
        path={`movie/${movie.id}/recommendations`}
        coverType="poster"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  coverImage: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  gradientStyle: {
    padding: 16,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  movieTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    color: 'yellow',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  metaContainer: {
    padding: 16,
  },
  overview: {
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metaItem: {
    flex: 1,
  },
  metaItemTitle: {
    fontWeight: 'bold',
  },
});

export default MovieDetail;
