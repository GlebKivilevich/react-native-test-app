import axios from 'axios';
import styled from 'styled-components/native';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import { View, Alert, FlatList, RefreshControl, TouchableOpacity } from 'react-native';

import { Post } from '../components/Post';

export function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState();

  const getArticles = () => {
    setIsLoading(true);
    axios
      .get('https://6431956d3adb1596516fc8fe.mockapi.io/articles')
      .then(({ data }) => setItems(data))
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Ошибка при получении статей');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(getArticles, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View>
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getArticles} />}
        data={items}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}>
              <Post title={item.title} imageUrl={item.imageUrl} createdAt={item.createdAt} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
