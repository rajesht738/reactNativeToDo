import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskID, setTasks } from './redux/actions';
import Task from './Task';
const Done = ({ navigation }) => {
  const { tasks } = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getTasks();
  }, [])
  const getTasks = () => {
    AsyncStorage.getItem('Tasks')
      .then(tasks => {
        const parsedTasks = JSON.parse(tasks);
        if (parsedTasks && typeof parsedTasks === 'object') {
          dispatch(setTasks(parsedTasks));
        }
     })
      .catch(err => console.log(err))
  }
  const deleteTasks = () => {
    const filteredTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(setTasks(filteredTasks));
        Alert.alert('Success!', 'Task removed successfully.');
      })
      .catch(err => console.log(err)
      )
  }
const checkTask = (id, newValue) => { 
  const index = tasks.findIndex(task => task.ID === id);
  if(index > -1) {
    let newTasks = [...tasks];
    newTasks[index].Done = newValue;
    AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasks(newTasks));
          Alert.alert('Success!', 'Task state is changed.');
        })
        .catch(err => console.log(err))
  }
}
  return (
    <View style={styles.body}>
      <FlatList
        data={tasks.filter(task => task.Done === true)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(setTaskID(item.ID));
              navigation.navigate('Task');
            }}
            style={styles.item}
          >
            <View style={styles.item_row}>
              <CheckBox value={item.Done}
              onValueChange={(newVal) => {checkTask(item.ID, newVal)}}
               />
              <View style={styles.item_body}>
                <Text
                  style={styles.title}
                >
                  {item.Title}
                </Text>
                <Text style={styles.subtitle}>
                  {item.Desc}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => deleteTasks(item.ID)}
              >
                <Ionicons name='trash' color={'#ff3636'} size={20} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
   
    </View>

  )
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  button: {

    width: 60,
    height: 60,
    backgroundColor: "#0080ff",
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
  },
  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_body: {
    flex: 1,
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#000000',
    fontSize: 30,
    margin: 5,
  },
  subtitle: {
    color: '#999999',
    fontSize: 20,
    margin: 5,
  }
});
export default Done