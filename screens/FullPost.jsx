import { useEffect, useState } from 'react';
import { View, Alert, FlatList, ScrollView, RefreshControl } from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import { Loading } from '../components/Loading';

export const FullPostScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const { id, title } = route.params;

  const getPost = () => {
    setIsLoading(true);
    axios
      .get(`https://6431956d3adb1596516fc8fe.mockapi.io/articles/${id}`)
      .then(({ data }) => setData(data))
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Не удалось получить статью');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
    getPost();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getPost} />}>
      <View style={{ margin: 14 }}>
        <PostImage source={{ uri: data.imageUrl }} />
        <PostText>{data.text}</PostText>
      </View>
    </ScrollView>
  );
};

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  min-height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;
