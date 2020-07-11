import React, { useState, useEffect } from "react";
import {
  Text,
  Content,
  Card,
  CardItem,
  Left,
  Body,
  Thumbnail,
} from "native-base";
import { AsyncStorage, Button } from "react-native";

export default function ApodList({ navigation }) {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  const getCharacters = async () => {
    try {
      const response = await fetch(
        `https://apodapi.herokuapp.com/api/?count=15`
      );
      const data = await response.json();
      await AsyncStorage.setItem(`apods`, JSON.stringify(data));
      setItems(data);
    } catch (error) {
      const data = await AsyncStorage.getItem(`apods`);
      if (data !== null) {
        setItems(JSON.parse(data));
      }
      setError(error);
    }
  }

  useEffect(() => {
    getCharacters();
  }, []);

  if (error && !items) {
    return <Text>Error: {error.message}</Text>;
  } else if (!items.length > 0) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <Content>
        <Button onClick={getCharacters} onPress={getCharacters} title="Get more!" />
        {items.length > 0 ? items.map((item) => (
          <Card
            key={item.id}
            onPress={() => {
              navigation.navigate("Detail", {
                item: item,
              });
            }}
            onClick={() => {
              navigation.navigate("Detail", {
                item: item,
              });
            }}
          >
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: item.url }} />
                <Body>
                  <Text>{item.name}</Text>
                  <Text note>
                    {item.title} - {item.copyright}
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        )) : null}
      </Content>
    );
  }
}
