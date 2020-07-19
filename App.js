import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from "expo-asset";

const cacheImages = (images) => images.map(image => {
  if(typeof images === 'string'){
    return Image.prefetch(image); // 배열 요소가 url 일때
  }
  else{
    return Asset.fromModule(image).downloadAsync(); 
  }
});

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = async () => {
    const images = cacheImages([
      "https://images.unsplash.com/photo-1595091967394-ba11c2ead42f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
      require("./assets/icon.png")
    ]);
    console.log(images);
  };
  const onFinish = () => setIsReady(true);
  return (
    isReady 
    ? (<Text>Ready...</Text>) 
    : (<AppLoading
        startAsync={loadAssets} // 시작할 때 자동 수행
        onFinish={onFinish} // 자동 수행된 함수가 완료
        onError={console.error} // e => console.error(e)
      />)
  );
}

