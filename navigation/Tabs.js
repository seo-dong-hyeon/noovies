import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import Favs from '../screens/Favs';

const Tabs = createBottomTabNavigator();

// 처음 app 로드 -> routeName 없음(undefined) -> optional chaining, default 값
const getHeaderName = route =>
  route?.state?.routeNames[route.state.index] || "Movies";

export default ({ navigation, route }) => { // 기본 인자 -> 부모 component랑 소통, 현재 Screen의 상태 정보
    useLayoutEffect(() => { // useEffect와 비슷 -> layout이 rendering 된 이후에 실행
        navigation.setOptions({title: getHeaderName(route)});
    }, [route]); // 다른 tab으로 갈 때마다 route(해당 페이지 정보) 정보가 바뀜
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="Movies" component={Movies} />
            <Tabs.Screen name="Tv" component={Tv} />
            <Tabs.Screen name="Search" component={Search} />
            <Tabs.Screen name="Favorate" component={Favs} />
        </Tabs.Navigator>
    );
}
    
