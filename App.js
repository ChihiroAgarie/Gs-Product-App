import React, { useState } from 'react';
// import 'react-native-gesture-handler';
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
  KeyboardAvoidingView,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { authentication } from './firebase/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';


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
      <Button
        title="ログイン"
        onPress={() => navigation.navigate('Welcome')}
      />
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

//ホーム検索画面
function Search() {
  // ナビゲーション設定
  const navigation = useNavigation();

  return (
    <SafeAreaView style={SearchStyles.container}>
      <ScrollView style={SearchStyles.scrollView}>
        <Text>早速、いろんな体験を探してみましょう！</Text>
        <View
          style={{
            marginBottom: 20,
            marginTop: 20
          }}
        >
          <Text>「カテゴリ」で探す</Text>
          <Button
            title="自然"
            onPress={() => navigation.navigate('Nature')}
          />
          <Button
            title="ものづくり"
            onPress={() => navigation.navigate('Make')}
          />
          <Button
            title="スポーツ"
            onPress={() => navigation.navigate('Sports')}
          />
          <Button
            title="生き物"
            onPress={() => navigation.navigate('Animal')}
          />
          <Button
            title="音楽"
            onPress={() => navigation.navigate('Music')}
          />
          <Button
            title="文化"
            onPress={() => navigation.navigate('Culture')}
          />
          <Button
            title="行事"
            onPress={() => navigation.navigate('Event')}
          />
        </View>
        <View
          style={{
            marginBottom: 20,
            marginTop: 20
          }}
        >
          <Text>「お子さんの好き」で探す</Text>
          <Button
            title="外で遊ぶのが好き"
            onPress={() => navigation.navigate('outdoor')}
          />
          <Button
            title="絵を描くのが好き"
            onPress={() => navigation.navigate('Paint')}
          />
          <Button
            title="動物が好き"
            onPress={() => navigation.navigate('Animal')}
          />
          <Button
            title="歌うのが好き"
            onPress={() => navigation.navigate('Music')}
          />
          <Button
            title="本を読むのが好き"
            onPress={() => navigation.navigate('Book')}
          />
          <Button
            title="何かを作るのが好き"
            onPress={() => navigation.navigate('Make')}
          />
          <Button
            title="踊るのが好き"
            onPress={() => navigation.navigate('Sports')}
          />
          <Button
            title="ごっこ遊びが好き"
            onPress={() => navigation.navigate('Pretend')}
          />
          <Button
            title="乗り物が好き"
            onPress={() => navigation.navigate('Vehicles')}
          />
          <Button
            title="お話しするのが好き"
            onPress={() => navigation.navigate('Talk')}
          />
        </View>
        <View
          style={{
            marginBottom: 20,
            marginTop: 20
          }}
        >
          <Text>「お家でできること」で探す</Text>
          <Button
            title="オンライン体験・レッスン"
            onPress={() => navigation.navigate('online')}
          />
          <Button
            title="アプリで遊ぶ"
            onPress={() => navigation.navigate('Apps')}
          />
          <Button
            title="お家遊び"
            onPress={() => navigation.navigate('house')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

//絞り込み検索セレクトボックスパーツ
function SelectBox(props) {
  // 絞り込み検索
  const [value1, setValueAge] = useState('');
  const [value2, setValuePref] = useState('');

  console.log(value1);
  console.log(value2);

  return (
    <View>
      <View>
        <Text>絞り込み検索</Text>
        <Text>お子様の年齢</Text>
        <RNPickerSelect
          placeholder={{ label: '選択してください', value: '' }}
          onValueChange={(value1) => setValueAge(value1)}
          style={pickerSelectStyles}
          items={[
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '10', value: '10' },
          ]}
          Icon={() => <Ionicons
            name="chevron-down"
            size={15}
            color="gray" />} />
        <Text>歳</Text>
      </View>
      <View
        style={{
          marginBottom: 20,
          marginTop: 20
        }}>
        <Text>地域</Text>
        <RNPickerSelect
          placeholder={{ label: '選択してください', value: '' }}
          onValueChange={(value2) => setValuePref(value2)}
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
          Icon={() => <Ionicons
            name="chevron-down"
            size={15}
            color="gray" />} />
      </View>
    </View>
  );
}

//「カテゴリ」コンテンツ
// 「行事（イベント）」一覧用配列
// const [events, setData] = useState([
//   // events = [
//   {
//     id: 1,
//     age: '5歳〜',
//     pref: '全国',
//     title: '節分（2月3日）',
//     img: require('./img/event.jpg'),
//     desc: '節分の説明文です',
//   },
//   {
//     id: 2,
//     age: '4歳〜',
//     pref: '岩手県',
//     title: 'ぶどう狩り',
//     img: require('./img/event.jpg'),
//   },
//   {
//     id: 3,
//     age: '3歳〜',
//     pref: '青森県',
//     title: '梨狩り',
//     img: require('./img/event.jpg'),
//   },
// ]);

// const Item = ({ item, onPress, backgroundColor, textColor }) => (
//   <TouchableOpacity
//     onPress={onPress}
//     style={[styles.item, backgroundColor]}>
//     <Image
//       style={styles.categoryImg}
//       source={item.img} />
//     <Text>{item.age}</Text>
//     <Text>{item.pref}</Text>
//     <Text style={[styles.title, textColor]}>{item.title}</Text>
//   </TouchableOpacity>
// );

//「行事（イベント）」一覧表示リスト（初期値）
// function Flatlist(props) {
//   // ナビゲーション設定
//   const navigation = useNavigation();

//   const [selectedId, setSelectedId] = useState(null);

//   const renderItem = ({ item }) => {
//     const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
//     const color = item.id === selectedId ? 'white' : 'black';

//     return (
//       <Item
//         item={item}
//         onPress={() => setSelectedId(item.id)}
//         onPress={() => navigation.navigate('Detail')}
//         backgroundColor={{ backgroundColor }}
//         textColor={{ color }}
//       />
//     );
//   };

//   return (
//     <SafeAreaView>
//       <FlatList
//         data={events}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         extraData={selectedId}
//       />
//     </SafeAreaView>
//   );

// return (
//   <View>
//     {events.map((event) => (
//       <TouchableOpacity
//         onPress={() => navigation.navigate('Detail')}
//         key={event.id}>
//         <View>
//           <Image
//             style={styles.categoryImg}
//             source={event.img} />
//           <Text>{event.age}</Text>
//           <Text>{event.pref}</Text>
//           <Text>{event.title}</Text>
//         </View>
//       </TouchableOpacity>
//     ))}
//   </View>
// );
// }

//「行事（イベント）」一覧表示リスト（初期値）
// function EventDefault(props) {
//   // ナビゲーション設定
//   const navigation = useNavigation();

//   return (
//     <View>
//       {events.map((event) => (
//         <TouchableOpacity
//           onPress={() => navigation.navigate('Detail')}
//           key={event.id}>
//           <View>
//             <Image
//               style={styles.categoryImg}
//               source={event.img} />
//             <Text>{event.age}</Text>
//             <Text>{event.pref}</Text>
//             <Text>{event.title}</Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// }

// 「行事（イベント）」一覧画面
function Event() {
  // ナビゲーション設定
  const navigation = useNavigation();

  // 「行事（イベント）」一覧用配列
  const [events, setData] = useState([
    // events = [
    {
      id: 1,
      age: '5',
      pref: '全国',
      title: '節分（2月3日）',
      img: require('./img/event.jpg'),
      desc: '節分の説明文です',
    },
    {
      id: 2,
      age: '4',
      pref: '岩手県',
      title: 'ぶどう狩り',
      img: require('./img/event.jpg'),
    },
    {
      id: 3,
      age: '3',
      pref: '青森県',
      title: '梨狩り',
      img: require('./img/event.jpg'),
    },
  ]);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, backgroundColor]}>
      <Image
        style={styles.categoryImg}
        source={item.img} />
      <Text>{item.age}歳〜</Text>
      <Text>{item.pref}</Text>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        onPress={() => navigation.navigate('Detail')}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  // 絞り込み検索
  const [value1, setValueAge] = useState('');
  const [value2, setValuePref] = useState('');

  console.log(value1);
  console.log(value2);

  //新たな配列を作成
  const onPress = () => {
    const newData = events.filter((item) => {
      return item.age >= value1 & item.pref === value2;
      // return item.pref === value2;
    });
    setData(newData);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff'
      }} >
      <View>
        {/* <SelectBox /> */}
        <View
          style={{
            marginBottom: 20,
            marginTop: 20
          }}>
          <Text>絞り込み検索</Text>
          <Text>お子様の年齢</Text>
          <RNPickerSelect
            placeholder={{ label: '選択してください', value: '' }}
            onValueChange={(value1) => setValueAge(value1)}
            style={pickerSelectStyles}
            items={[
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' },
              { label: '6', value: '6' },
              { label: '7', value: '7' },
              { label: '8', value: '8' },
              { label: '9', value: '9' },
              { label: '10', value: '10' },
            ]}
            Icon={() => <Ionicons
              name="chevron-down"
              size={15}
              color="gray" />} />
          <Text>歳</Text>
        </View>
        <View
          style={{
            marginBottom: 20,
            marginTop: 20
          }}>
          <Text>地域</Text>
          <RNPickerSelect
            placeholder={{ label: '選択してください', value: '' }}
            onValueChange={(value2) => setValuePref(value2)}
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
            Icon={() => <Ionicons
              name="chevron-down"
              size={15}
              color="gray" />} />
        </View>
        <Button
          title="絞り込む"
          //クリックで新たな配列データを作成
          onPress={onPress}
        />
        <View>
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

// カテゴリ_詳細画面
function Detail() {
  // ナビゲーション設定
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View>
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


//スタイルシート・CSS
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

//ホーム検索画面CSS
const SearchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
  },
});

// 絞り込み選択セレクトボックスCSS
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
          name="Event"
          component={Event} />
        <Stack.Screen
          name="Detail"
          component={Detail} />
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