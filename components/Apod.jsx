import React from "react";
import { Text, Card, CardItem, H1 } from "native-base";
import { Image } from "react-native";

export default function Apod({ route }) {
  const { item } = route.params;

  return (
    <Card>
      <CardItem>
        <H1>{item.title}</H1>
      </CardItem>
      
      <CardItem>
        <Image
          source={{ uri: item.url }}
          style={{ height: 200, width: null, flex: 1 }}
        />
      </CardItem>

      <CardItem>
        <Text note>
          {item.title} - {item.copyright}
        </Text>
      </CardItem>

      <CardItem>
        <Text note>
          {item.description}
        </Text>
      </CardItem>
    </Card>
  );
}
