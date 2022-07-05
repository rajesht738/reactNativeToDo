import React from 'react'
import {
    Pressable,
    Text,
    StyleSheet
} from 'react-native';

const CustomButton = (props) => {
  return (
    <Pressable
    onPress={props.onPressFunction}
    style={({ pressed }) => [
      { backgroundColor: pressed ? '#dddddd' : props.color },
      styles.button,
      {...props.style}

    ]}
    hitSlop={{ top: 20, left: 20, bottom: 20, right: 10 }}
    android_ripple={{ color: '#00ff' }}
  >
    <Text style={styles.text}>
     {props.title}
    </Text>
  </Pressable>
  )
}

const styles = StyleSheet.create({
    text: {
        color: '#00f',
        fontSize: 40,
        textAlign: 'center'
      },
      item: {
        margin: 10,
        
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        width: 250,
        height: 70,
       
        alignItems: 'center',
        justifyContent: 'center'
      },
})

export default CustomButton;