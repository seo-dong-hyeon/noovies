import React, { useState } from 'react';
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from 'expo';
import { Asset } from "expo-asset";
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import Stack from './navigation/Stack';

const cacheImages = (images) => images.map(image => {
  if(typeof images === 'string'){
    return Image.prefetch(image); // 배열 요소가 url 일때
  }
  else{
    return Asset.fromModule(image).downloadAsync(); 
  }
});

const cacheFonts = (fonts) => fonts.map(font => {
  return Font.loadAsync(font)
});

export default function App() {
  const [isReady, setIsReady] = useState(false);
  
  const loadAssets = () => {
    const images = cacheImages([
      "https://images.unsplash.com/photo-1595091967394-ba11c2ead42f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
      require("./assets/icon.png")
    ]); // 배열로 전달
    const fonts = cacheFonts([Ionicons.font]); // 배열로 전달
    return Promise.all([...images, ...fonts]); // 모든 요소 리턴
  };
  
  const onFinish = () => setIsReady(true);
  
  return (
    isReady 
    ? (
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      ) 
    : (
      <AppLoading
        startAsync={loadAssets} // 시작할 때 자동 수행 -> promise return -> 기다려줌 -> async 필요x
        onFinish={onFinish} // 자동 수행된 함수가 완료
        onError={console.error} // e => console.error(e)
      />)
  );
}

