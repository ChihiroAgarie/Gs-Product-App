import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Button, Text, View, Image, SafeAreaView, Alert, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from 'firebase/firebase.js';


// const handleRegister = async () => {
//   try {
//     const user = await createUserWithEmailAndPassword(auth, email, password);
//     console.log(user);
//   } catch (error) {
//     console.log(error.message);
//   }
// };


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

  const [name, setName] = useState('');
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
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="山田　花子"
        />
      </View>
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
      // style={{
      //   padding: 10,
      //   backgroundColor: '#88cb7f',
      //   borderRadius: 10,
      // }}
      // onPress={handleRegister}
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
        <Text>conico(コニコ)は、お子様のやりたいことを見つけられるアプリです。</Text>
        <Text>お子様がやりたいことを見つけるためには、3〜10歳での多種多様な体験がとても重要です。</Text>
        <Text>親子で一緒にいろいろな経験をして、お子様の可能性を広げましょう！</Text>
        <Text>私たちがそのお手伝いをします。</Text>
        <Button
          title="はじめる"
          onPress={() => navigation.navigate('Search')}
        />
      </View>
    </SafeAreaView>
  );
}

//ホーム画面
function Search() {
  // ナビゲーション設定
  const navigation = useNavigation();

  const [age, setAge] = useState('');

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <View>
        <Text>早速、いろんな体験を探してみましょう！</Text>
        <Text>お子様の年齢</Text>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={styles.input}
            onChangeText={setAge}
            value={age}
            placeholder="年齢を入力してください"
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <Text>お子様の性別</Text>
        <Button
          title="男の子"
        />
        <Button
          title="女の子"
        />
        <Text>「カテゴリ」で探す</Text>
        <Button
          title="自然"
          onPress={() => navigation.navigate('Category1')}
        />
        <Button
          title="ものづくり"
          onPress={() => navigation.navigate('Category2')}
        />
        <Button
          title="スポーツ"
          onPress={() => navigation.navigate('Category3')}
        />
        <Button
          title="生き物"
          onPress={() => navigation.navigate('Category4')}
        />
        <Button
          title="音楽"
          onPress={() => navigation.navigate('Category5')}
        />
        <Button
          title="旅行"
          onPress={() => navigation.navigate('Category6')}
        />
        <Text>「好き」で探す</Text>
        <Button
          title="体を動かすのが好き"
          onPress={() => navigation.navigate('Like1')}
        />
        <Button
          title="絵を描くのが好き"
          onPress={() => navigation.navigate('Like2')}
        />
        <Button
          title="生き物が好き"
          onPress={() => navigation.navigate('Like3')}
        />
        <Button
          title="踊るのが好き"
          onPress={() => navigation.navigate('Like4')}
        />
        <Button
          title="歌うのが好き"
          onPress={() => navigation.navigate('Like5')}
        />
        <Button
          title="本を読むのが好き"
          onPress={() => navigation.navigate('Like6')}
        />
        <Text>「地域」で探す</Text>
        <Text>都道府県を表示</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

// カテゴリ別画面
function Category1() {
  // ナビゲーション設定
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Category1_Detail1')}>
      <Image
        style={styles.categoryImg}
        source={require('./img/event.jpg')}
      />
      <Text>イベント</Text>
      <Text>タイトル</Text>
    </TouchableOpacity>
  );
}

// カテゴリ_詳細画面
function Category1_Detail1() {
  // ナビゲーション設定
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View onPress={() => navigation.navigate('Category1_Detail1')}>
        <Image
          style={styles.categoryDetailImg}
          source={require('./img/event.jpg')}
        />
        <Text>イベント</Text>
        <Text>タイトル</Text>
        <Text>説明文</Text>
        <Button
          title="保存"
        // onPress={() => navigation.navigate('Like5')}
        />
        <Button
          title="できた！"
          onPress={() => navigation.navigate('Rate')}
        />
      </View>
    </SafeAreaView>
  );
}

// レーティング画面
function Rate() {
  // ナビゲーション設定
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>お子さんの様子をメモしましょう！</Text>
      <Text>お子さんの様子</Text>
      <Text>スターでレートをつけるコンテンツが入る</Text>
      <Text>メモ</Text>
      <TextInput
        style={styles.input}
      // onChangeText={setName}
      // value={name}
      />
      <Button
        title="完了"
        onPress={() => navigation.navigate('Done')}
      />
    </SafeAreaView>
  );
}

// レート完了画面
function Done() {
  // ナビゲーション設定
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>入力ありがとうございます！</Text>
      <Text>お子さんとの思い出がまた1つ増えましたね！</Text>
      <Button
        title="ログを見る"
        onPress={() => navigation.navigate('Record')}
      />
    </SafeAreaView>
  );
}

// ログ画面
function Record() {
  // ナビゲーション設定
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>お子さんの好きなこと</Text>
      <Text>グラフが入る</Text>
      <Text>できたこと</Text>
      <Text>グラフが入る</Text>
    </SafeAreaView>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  categoryImg: {
    width: 150,
    height: 100,
  },
  categoryDetailImg: {
    width: null,
    height: 200,
    resizeMode: 'cover'
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
          name="Start"
          component={Start} />
        <Stack.Screen
          name="Register"
          component={Register} />
        <Stack.Screen
          name="Welcome"
          component={Welcome} />
        <Stack.Screen
          name="Search"
          component={Search} />
        <Stack.Screen
          name="Category1"
          component={Category1} />
        <Stack.Screen
          name="Category1_Detail1"
          component={Category1_Detail1} />
        <Stack.Screen
          name="Rate"
          component={Rate} />
        <Stack.Screen
          name="Done"
          component={Done} />
        <Stack.Screen
          name="Record"
          component={Record} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}