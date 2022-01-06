//2022/1/6画面遷移を行うために追加
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Button, Text, View, Image, SafeAreaView, Alert } from 'react-native';
//2022/1/6画面遷移を行うために追加
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

//スタート画面
// const Start = () => {
function Start() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require('./img/logo.png')}
        />
        <Button
          title="初回登録"
          // onPress={() => Alert.alert('初回登録へ')}
          onPress={() => navigation.navigate('Register')}
        />
        <Button
          title="ログイン"
          onPress={() => Alert.alert('ログインへ')}
        />
      </View>
    </SafeAreaView>
  );
}

function Register() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text>登録画面</Text>
    </View>
  );
}

//スタイルシート
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 50,
  },
});


// export default Start;

//2022/1/6画面遷移を行うために追加。
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Start} />
        <Stack.Screen
          name="Register"
          component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}