import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { authentication } from './firebase/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from './firebase/firebase-config';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';

import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Provider as PaperProvider } from 'react-native-paper';
import {
  Button,
  TextInput,
  Title,
  Chip,
  IconButton,
  Colors
} from 'react-native-paper';

import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';

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
          source={require('./img/logo10.png')}
        />
        <Button
          mode="contained"
          style={{ marginBottom: 20 }}
          onPress={() => navigation.navigate('Register')}>
          初回登録
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Login')}>
          ログイン
        </Button>
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
        <Text style={{ marginBottom: 10 }}>メールアドレス</Text>
        <TextInput
          label='（例）conico@gmail.com'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          keyboardType="ascii-capable"
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 10 }}>パスワード</Text>
        <TextInput
          label='6文字以上で入力してください'
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          keyboardType="ascii-capable"
        />
      </View>
      <Button
        mode="contained"
        onPress={RegisterUser}
        // onPress={() => navigation.navigate('Welcome')}
        style={{ width: 250, marginTop: 20 }}>
        登録する
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Welcome')}
        style={{ width: 250, marginTop: 20 }}>
        次へ
      </Button>
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
        mode="contained"
        onPress={() => navigation.navigate('Welcome')}>
        ログイン
      </Button>
    </KeyboardAvoidingView>
  );
}

// アプリ説明画面
function Welcome() {
  // ナビゲーション設定
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Title>登録ありがとうございます！</Title>
      <Image
        style={styles.logo}
        source={require('./img/logo10.png')}
      />
      <Text style={styles.welcomeText}>conico（コニコ）は、お子様の情操教育に良い{"\n"}「体験」が見つけられるアプリです。</Text>
      <Text style={styles.welcomeText}>お子様の好奇心を伸ばすには、{"\n"}3〜10歳での多種多様な体験がとても重要です。</Text>
      <Text style={styles.welcomeText}>親子で一緒にいろいろな経験をして、{"\n"}お子様の可能性を広げましょう！</Text>
      <Text style={styles.welcomeText}>私たちがそのお手伝いをします。</Text>
      <Button
        mode="contained"
        style={{ width: 250, marginTop: 20 }}
        onPress={() => navigation.navigate('Search')}>
        はじめる
      </Button>
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
        <View>
          <Button icon="magnify" style={{ alignItems: 'left', marginBottom: 5, marginTop: 10 }}>
            「カテゴリ」で探す
          </Button>

          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('Nature')}>
              <ImageBackground
                source={require('./img/nature.jpg')}
                resizeMode="cover"
                style={styles.image}>
                <Text style={styles.imgText}>自然</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('Make')}>
              <ImageBackground
                source={require('./img/make.jpg')}
                resizeMode="cover"
                style={styles.image}>
                <Text style={styles.imgText}>ものづくり</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('Sports')}>
              <ImageBackground
                source={require('./img/sports.jpg')}
                resizeMode="cover"
                style={styles.image}>
                <Text style={styles.imgText}>スポーツ</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('Animal')}>
              <ImageBackground
                source={require('./img/animal.jpg')}
                resizeMode="cover"
                style={styles.image}>
                <Text style={styles.imgText}>生き物</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('Music')}>
              <ImageBackground
                source={require('./img/music.jpg')}
                resizeMode="cover"
                style={styles.image}>
                <Text style={styles.imgText}>音楽</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('Culture')}>
              <ImageBackground
                source={require('./img/culture.jpg')}
                resizeMode="cover"
                style={styles.image}>
                <Text style={styles.imgText}>文化</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('Event')}>
              <ImageBackground
                source={require('./img/event2.jpg')}
                resizeMode="cover"
                style={styles.image}>
                <Text style={styles.imgText}>行事</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('Event')}>
              <ImageBackground
                source={require('./img/event3.jpg')}
                resizeMode="cover"
                style={styles.image}>
                <Text style={styles.imgText}>イベント</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Button icon="magnify" style={{ alignItems: 'left', marginBottom: 5, marginTop: 10 }}>
            お子様の「好き」で探す
          </Button>

          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Chip
              mode="outlined"
              icon="heart"
              style={styles.chip}
              onPress={() => navigation.navigate('Outdoor')}>
              外で遊ぶのが好き
            </Chip>
            <Chip
              mode="outlined"
              icon="heart"
              style={styles.chip}
              onPress={() => navigation.navigate('Paint')}>
              絵を描くのが好き
            </Chip>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Chip
              mode="outlined"
              icon="heart"
              style={styles.chip}
              onPress={() => navigation.navigate('Animal')}>
              動物が好き
            </Chip>
            <Chip
              mode="outlined"
              icon="heart"
              style={styles.chip}
              onPress={() => navigation.navigate('Music')}>
              歌うのが好き
            </Chip>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Chip
              mode="outlined"
              icon="heart"
              style={styles.chip}
              onPress={() => navigation.navigate('Book')}>
              本を読むのが好き
            </Chip>
            <Chip
              mode="outlined"
              icon="heart"
              style={styles.chip}
              onPress={() => navigation.navigate('Make')}>
              何か作るのが好き
            </Chip>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Chip
              mode="outlined"
              icon="heart"
              style={styles.chip}
              onPress={() => navigation.navigate('Sports')}>
              踊るのが好き
            </Chip>
            <Chip
              mode="outlined"
              icon="heart"
              style={styles.chip}
              onPress={() => navigation.navigate('Pretend')}>
              ごっこ遊びが好き
            </Chip>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Chip
              mode="outlined"
              icon="heart"
              style={styles.chip}
              onPress={() => navigation.navigate('Vehicles')}>
              乗り物が好き
            </Chip>
            <Chip
              mode="outlined"
              icon="heart"
              style={styles.chip}
              onPress={() => navigation.navigate('Talk')}>
              お話しするのが好き
            </Chip>
          </View>
        </View>

        <View>
          <Button icon="magnify" style={{ alignItems: 'left', marginBottom: 5, marginTop: 10 }}>
            「お家でできること」で探す
          </Button>

          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('Online')}>
              <ImageBackground
                source={require('./img/online.jpg')}
                resizeMode="cover"
                style={styles.image}>
                <Text style={styles.imgText}>オンライン体験・レッスン</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('Apps')}>
              <ImageBackground
                source={require('./img/apps.jpg')}
                resizeMode="cover"
                style={styles.image}>
                <Text style={styles.imgText}>アプリで遊ぶ</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('House')}>
              <ImageBackground
                source={require('./img/house.jpg')}
                resizeMode="cover"
                style={styles.image}>
                <Text style={styles.imgText}>お家遊び</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 「自然」一覧画面
function Nature(props) {
  // ナビゲーション設定
  const navigation = useNavigation();

  const getdata = async () => {
    const dataCol = collection(db, 'contents');
    const dataSnapshot = await getDocs(dataCol);
    const dataList = dataSnapshot.docs.map(doc => doc.data());
    console.log(dataList);
    console.log(dataList[0].age_fb);

    return dataList;
  }

  // 「自然」一覧用配列
  const [events, setData] = useState([
    {
      id: 1,
      age: '5',
      pref: '北海道',
      title: '広い牧場でゆったり農業体験しよう',
      img: require('./img/pic1.png'),
    },
    {
      id: 2,
      age: '4',
      pref: '岩手県',
      title: '猊鼻渓で舟下り！冬はこたつ舟で暖か',
      img: require('./img/pic2.png'),
    },
    {
      id: 3,
      age: '3',
      pref: '青森県',
      title: 'ピクニック、キャンプ、動物との触れ合いも！',
      img: require('./img/pic3.png'),
    },
    {
      id: 4,
      age: '2',
      pref: '北海道',
      title: '手ぶらでウィンタースポーツ！キッズスペースあり',
      img: require('./img/pic4.png'),
    },
    {
      id: 5,
      age: '3',
      pref: '東京都',
      title: '釣りや水遊びもできる穴場スポット',
      img: require('./img/pic5.png'),
    },
    {
      id: 6,
      age: '5',
      pref: '大阪府',
      title: '関西最大級の牧場で、動物とたくさん遊ぼう',
      img: require('./img/pic6.png'),
    },
    {
      id: 7,
      age: '2',
      pref: '愛知県',
      title: 'テストです',
      img: require('./img/event.jpg'),
    },
    {
      id: 8,
      age: '6',
      pref: '福岡県',
      title: 'テストです',
      img: require('./img/event.jpg'),
    },
    {
      id: 9,
      age: '7',
      pref: '東京都',
      title: 'テストです',
      img: require('./img/event.jpg'),
    },
    {
      id: 10,
      age: '4',
      pref: '福岡県',
      title: 'テストです',
      img: require('./img/event.jpg'),
    },
  ]);

  // const Item = ({ item, onPress, backgroundColor, textColor }) => (
  const Item = ({ item, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      //  style={[styles.item, backgroundColor]}>
      style={styles.item}>
      <View style={{ flexDirection: 'row', marginBottom: 15, width: 350, marginLeft: 15 }}>
        <Image
          style={styles.categoryImg}
          source={item.img} />
        <View style={{ width: 200 }}>
          <View style={{ flexDirection: 'row', marginBottom: 5, marginLeft: 5, marginBottom: 10 }}>
            <Chip
              mode="outlined"
              style={{ width: 65, marginRight: 5 }}>
              {item.age}歳〜
            </Chip>
            <Chip
              mode="outlined"
              style={{ width: 65, marginRight: 5 }}>
              {item.pref}
            </Chip>
          </View>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        onPress={() => navigation.navigate('Detail')}
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
    });
    setData(newData);
  };


  return (
    <SafeAreaView style={SearchStyles.container} >
      {/* <ScrollView style={SearchStyles.scrollView}> */}
      <View>
        <View>
          <Button icon="magnify" style={{ alignItems: 'left', marginBottom: 5, marginTop: 10 }}>
            絞り込み検索
          </Button>
          <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
            <Text style={{ marginLeft: 15 }}>お子様の年齢</Text>
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
              Icon={() =>
                <Ionicons
                  name="chevron-down"
                  size={15}
                  color="gray"
                />} />
            <Text>歳</Text>
          </View>

          <View>
            <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
              <Text style={{ marginLeft: 15 }}>地域</Text>
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
                  color="gray"
                />} />
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Button
              mode="contained"
              style={{ width: 250, marginBottom: 20, }}
              onPress={onPress}>
              絞り込む
            </Button>
          </View>
        </View>

        <View>
          <Button
            mode="contained"
            style={{ width: 250, marginBottom: 20, }}
            onPress={getdata}>
            Firebaseデータゲット
          </Button>
          {/* <Text>{age_fb}</Text> */}
        </View>

        <View>
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

// カテゴリ_詳細画面
function Detail() {
  // ナビゲーション設定
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <View>
        <Image
          style={styles.categoryDetailImg}
          source={require('./img/pic1.png')}
        />
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5, marginBottom: 10 }}>
          <Chip
            mode="outlined"
            style={{ width: 65, marginRight: 5 }}>
            5歳〜
          </Chip>
          <Chip
            mode="outlined"
            style={{ width: 65, marginRight: 5 }}>
            北海道
          </Chip>
        </View>
        <Title style={{ marginLeft: 10, marginBottom: 10 }}>広い牧場でゆったり農業体験しよう</Title>
        <Text style={{ marginLeft: 10, marginBottom: 10 }} > こちらに体験の説明文が入ります。この体験について説明します。</Text>
        <IconButton
          icon="heart"
          color={Colors.red500}
          size={40}
          onPress={() => navigation.navigate('Save')}
        />
        <IconButton
          icon="check"
          color={Colors.red500}
          size={40}
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
      <Text>スターでレートをつけるコンテンツが入ります</Text>
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
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  input: {
    width: 250,
    marginBottom: 20,
  },
  welcomeText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: 160,
    height: 80,
    alignItems: "center"
  },
  imgText: {
    color: '#fff',
    width: 80,
    padding: 5,
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  chip: {
    width: 160,
    marginBottom: 5,
    marginLeft: 15,
    textAlign: 'center',
  },
  categoryImg: {
    width: 160,
    height: 100,
    marginRight: 10
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
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Start"
            component={Start}
            options={{ title: '' }} />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: '' }} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: '' }} />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ title: '' }} />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{ title: 'ホーム' }} />
          <Stack.Screen
            name="Nature"
            component={Nature}
            options={{ title: '自然' }} />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{ title: '詳細' }} />
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
    </PaperProvider>
  );
}