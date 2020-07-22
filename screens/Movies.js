import React from "react";
import { View, Text } from "react-native";

export default ({ navigation }) => (
  <View>
    <Text>Movies</Text>
    <Button title="Movie" onPress={() => navigation.navigate("Detail")}/>
  </View>
);