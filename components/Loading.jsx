import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';
export const Loading = () => {
  return (
    <LoadingContainer>
      <ActivityIndicator size="large" color="#ea5d34" />
      <LoadingText>Идет загрузка...</LoadingText>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoadingText = styled.Text`
  font-size: 20px;
  margin-top: 10px;
  color: #073763;
`;
