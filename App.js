import React from 'react';
import { StyleSheet, Button, Text, View, Image, SafeAreaView, Alert } from 'react-native';

const Start = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require('./img/logo.png')}
        />
        <Button
          title="初回登録"
          onPress={() => Alert.alert('初回登録へ')}
        />
        <Button
          title="ログイン"
          onPress={() => Alert.alert('ログインへ')}
        />
      </View>
    </SafeAreaView>
  );
}

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


export default Start;