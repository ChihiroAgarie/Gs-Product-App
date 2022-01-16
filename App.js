import React, { useState } from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  SafeAreaView,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { authentication } from './firebase/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

//Test:サインイン（動画内コード）
// const App = () => {

//   const [isSignedIn, setIsSignedIn] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const RegisterUser = () => {
//     createUserWithEmailAndPassword(authentication, email, password)
//       .then((re) => {
//         console.log(re);
//         setIsSignedIn(true)
//       })
//       .catch((re) => {
//         console.log(re);
//       })
//   }


//   return (
//     <SafeAreaView>
//       <TextInput
//         placeholder='Email'
//         value={email}
//         onChangeText={text => setEmail(text)}
//       />
//       <TextInput
//         placeholder='Password'
//         value={password}
//         secureTextEntry={true}
//         onChangeText={text => setPassword(text)}
//       />
//       <Button
//         title='Register'
//         onPress={RegisterUser}
//       />
//     </SafeAreaView>
//   );
// };

// export default App;

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
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
}

//登録画面
function Register() {
  // ナビゲーション設定
  const navigation = useNavigation();

  // Firebase登録認証
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const RegisterUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((re) => {
        console.log(re);
        setIsSignedIn(true)
      })
      .catch((re) => {
        console.log(re);
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text>メールアドレス</Text>
        <TextInput
          placeholder='（例）conico@gmail.com'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          keyboardType="ascii-capable"
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text>パスワード</Text>
        <TextInput
          placeholder='6文字以上で入力してください'
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          keyboardType="ascii-capable"
        />
      </View>
      <Button
        title='登録する'
        onPress={RegisterUser}
        onPress={() => navigation.navigate('Welcome')}
      />
    </SafeAreaView>
  );
}

//ログイン画面
function Login() {
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
      <Text>ログイン画面</Text>
      {/* <Text>親御様のお名前</Text>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="山田　花子"
        />
      </View> */}
      {/* <Text>メールアドレス</Text>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={loginemail}
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
          value={loginpassword}
          placeholder="パスワードを入力してください"
          keyboardType="ascii-capable"
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View> */}
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
          title="ログイン"
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

  const [value, setValueAge] = useState('');
  const [value2, setValuePref] = useState('');

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Text>早速、いろんな体験を探してみましょう！</Text>
      <View
        style={{
          marginBottom: 20,
          marginTop: 20
        }}
      >
        <Text>お子様の年齢</Text>
        <RNPickerSelect
          placeholder={{ label: '選択してください', value: '' }}
          onValueChange={(value) => setValueAge({ select: value })}
          style={pickerSelectStyles}
          items={[
            { label: '2歳', value: '2歳' },
            { label: '3歳', value: '3歳' },
            { label: '4歳', value: '4歳' },
            { label: '5歳', value: '5歳' },
            { label: '6歳', value: '6歳' },
            { label: '7歳', value: '7歳' },
            { label: '8歳', value: '8歳' },
            { label: '9歳', value: '9歳' },
            { label: '10歳', value: '10歳' },
          ]}
          Icon={() =>
            <Ionicons
              name="chevron-down"
              size={15}
              color="gray"
            />} />
      </View>
      <View
        style={{
          marginBottom: 20,
          marginTop: 20
        }}
      >
        <Text>「地域」を選ぶ</Text>
        <RNPickerSelect
          placeholder={{ label: '選択してください', value: '' }}
          onValueChange={(value2) => setValuePref({ select: value2 })}
          style={pickerSelectStyles}
          items={[
            { label: '北海道', value: '北海道' },
            { label: '青森県', value: '青森県' },
            { label: '岩手県', value: '岩手県' },
            { label: '宮城県', value: '宮城県' },
            { label: '秋田県', value: '秋田県' },
            { label: '山形県', value: '山形県' },
            { label: '福島県', value: '福島県' },
            { label: '茨城県', value: '茨城県' },
            { label: '栃木県', value: '栃木県' },
            { label: '群馬県', value: '群馬県' },
            { label: '埼玉県', value: '埼玉県' },
            { label: '千葉県', value: '千葉県' },
            { label: '東京都', value: '東京都' },
            { label: '神奈川県', value: '神奈川県' },
            { label: '新潟県', value: '新潟県' },
            { label: '富山県', value: '富山県' },
            { label: '石川県', value: '石川県' },
            { label: '福井県', value: '福井県' },
            { label: '山梨県', value: '山梨県' },
            { label: '長野県', value: '長野県' },
            { label: '岐阜県', value: '岐阜県' },
            { label: '静岡県', value: '静岡県' },
            { label: '愛知県', value: '愛知県' },
            { label: '三重県', value: '三重県' },
            { label: '滋賀県', value: '滋賀県' },
            { label: '京都府', value: '京都府' },
            { label: '大阪府', value: '大阪府' },
            { label: '兵庫県', value: '兵庫県' },
            { label: '奈良県', value: '奈良県' },
            { label: '和歌山県', value: '和歌山県' },
            { label: '鳥取県', value: '鳥取県' },
            { label: '島根県', value: '島根県' },
            { label: '岡山県', value: '岡山県' },
            { label: '広島県', value: '広島県' },
            { label: '山口県', value: '山口県' },
            { label: '徳島県', value: '徳島県' },
            { label: '香川県', value: '香川県' },
            { label: '愛媛県', value: '愛媛県' },
            { label: '高知県', value: '高知県' },
            { label: '福岡県', value: '福岡県' },
            { label: '佐賀県', value: '佐賀県' },
            { label: '長崎県', value: '長崎県' },
            { label: '熊本県', value: '熊本県' },
            { label: '大分県', value: '大分県' },
            { label: '宮崎県', value: '宮崎県' },
            { label: '鹿児島県', value: '鹿児島県' },
            { label: '沖縄県', value: '沖縄県' },
          ]}
          Icon={() =>
            <Ionicons
              name="chevron-down"
              size={15}
              color="gray"
            />} />
      </View>
      <View
        style={{
          marginBottom: 20,
          marginTop: 20
        }}
      >
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
      </View>
      <View
        style={{
          marginBottom: 20,
          marginTop: 20
        }}
      >
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
          onPress={() => navigation.navigate('Save')}
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

// 保存画面
function Save() {
  // ナビゲーション設定
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>「お気に入り」に登録されました！</Text>
      <Button
        title="お気に入りを見る"
        onPress={() => navigation.navigate('Favorites')}
      />
    </SafeAreaView>
  );
}

// お気に入り一覧画面
function Favorites() {
  // ナビゲーション設定
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>お気に入り一覧</Text>
      <Text>お気に入りが並ぶ</Text>
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
    width: 250,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    padding: 5,
    paddingRight: 20,
  },
  iconContainer: {
    top: 6,
    right: 25,
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
          name="Login"
          component={Login} />
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
        <Stack.Screen
          name="Save"
          component={Save} />
        <Stack.Screen
          name="Favorites"
          component={Favorites} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}