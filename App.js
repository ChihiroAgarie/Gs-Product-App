import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Button, Text, View, Image, SafeAreaView, Alert, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';


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
  const [text, onChangeText] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  // ナビゲーション設定
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>親御様のお名前</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="山田　花子"
      />
      <Text>メールアドレス</Text>
      <TextInput
        style={styles.input}
        onChangeEmail={onChangeEmail}
        value={email}
        placeholder="yamada@gmail.com"
        keyboardType="ascii-capable"
      />
      <Text>パスワード</Text>
      <TextInput
        style={styles.input}
        onChangePassword={onChangePassword}
        value={password}
        placeholder="password"
        keyboardType="ascii-capable"
      />
      <Button
        title="登録完了"
        onPress={() => navigation.navigate('Welcome')}
      />
    </SafeAreaView>
  );
}

//アプリ説明画面
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