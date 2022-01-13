import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Button, Text, View, Image, SafeAreaView, Alert, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebase/firebase.js';


const handleRegister = async () => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};


//スタート画面
function Start() {
  // ナビゲーション設定
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

//登録画面
function Register() {
  // const [text, onChangeText] = React.useState(null);
  // const [email, onChangeEmail] = React.useState(null);
  // const [password, onChangePassword] = React.useState(null);

  // const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ナビゲーション設定
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Text>親御様のお名前</Text>
      {/* <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="山田　花子"
        />
      </View> */}
      <Text>メールアドレス</Text>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="yamada@gmail.com"
          keyboardType="ascii-capable"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <Text>パスワード</Text>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="パスワードを入力してください"
          keyboardType="ascii-capable"
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: '#88cb7f',
          borderRadius: 10,
        }}
        onPress={handleRegister}
      // disabled={!email || !password}
      >
        <Button
          title="登録完了"
          onPress={() => navigation.navigate('Welcome')}
        />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

// アプリ説明画面
function Welcome() {
  // ナビゲーション設定
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>conico(コニコ)へようこそ！</Text>
        <Text>conico(コニコ)は、お子様のやりたいことを見つけられるアプリです。
        </Text>
        <Text>親子で一緒にいろいろな経験をして、お子様の可能性を広げましょう！</Text>
        <Text>私たちがそのお手伝いをします。</Text>
        <Text>まずはお子様のことを教えてください。</Text>
        <Button
          title="次へ"
        // onPress={() => navigation.navigate('ChildRegister')}
        />
      </View>
    </SafeAreaView>
  );
}

//お子さん登録画面


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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

//画面遷移設定
const Stack = createStackNavigator();

// 全体設定
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
        <Stack.Screen
          name="Welcome"
          component={Welcome} />
        {/* <Stack.Screen
          name="Register"
          component={ChildRegister} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}