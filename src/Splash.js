import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PushNotification from 'react-native-push-notification';
const Splash = ({ navigation }) => {
  useEffect(() => {
    createChannel();
    setTimeout(() => {
      navigation.navigate('My Task');
    }, 5000);
  }, []);
  //
  const createChannel = () => {
    PushNotification.createChannel({
      channelId: "task-channel",
      channelName: "Task Channel"
    })
  }

  return (
    <View style={styles.body}>
      <Image style={styles.logo}
        source={require('../assets/todo.png')}
      />
      <Text style={styles.text}>
        Rahul To-Do List
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0080ff'
  },
  logo: {
    width: 150,
    height: 150
  },
  text: {
    fontSize: 40,
    color: 'white',
    marginBottom: 100
  }
})

export default Splash