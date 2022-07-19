import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from './utils/CustomButton'
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from './redux/actions';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomes5 from 'react-native-vector-icons/FontAwesome5';
import PushNotification from 'react-native-push-notification';

export default function Task({ navigation }) {

    const { tasks, taskID } = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [showBellModal, setShowBellModal] = useState('false');
    const [color, setColor] = useState('white');
    const [bellTime, setBellTime] = useState(1);

    const [done, setDone] = useState(false);

    useEffect(() => {
        getTask();
    }, []);




    const getTask = () => {
        const Task = tasks.find(task => task.ID === taskID);
        if (Task) {
            setTitle(Task.Title);
            setDesc(Task.Desc);
            setDone(Task.Done);
            setColor(Task.Color);
        }
    }

    const setTask = () => {
        if (title.length == 0) {
            Alert.alert('Warning!', 'Please write your task')
        } else {
            try {
                var Task = {
                    ID: taskID,
                    Title: title,
                    Desc: desc,
                    Done: done,
                    Color: color,
                }
                const index = tasks.findIndex(task => task.ID === taskID);
                let newTasks = [];
                if (index > -1) {
                    newTasks = [...tasks];
                    newTasks[index] = Task;
                } else {
                    newTasks = [...tasks, Task];
                }
                AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
                    .then(() => {
                        dispatch(setTasks(newTasks));
                        Alert.alert('Success!', 'This saved successfully');
                        navigation.goBack();
                    }).catch(err => console.log(err))
            } catch (error) {
                console.log(error);
            }
        }
    }

    const setTaskAlarm = () => {
PushNotification.localNotificationSchedule({
    channelId: "task-channel",
    title: title,
    message: desc,
    date: new Date(Date.now() + parseInt(bellTime) * 60 *1000),
    allowWhileIdle: true,
})
    }
    return (
        <View style={styles.body}>
            <Modal
                visible={showBellModal}
                transparent
                onRequestClose={() => setShowBellModal(false)}
                animationType='slide'
                hardwareAccelerated
            >
                <View style={styles.centered_view}>
                    <View style={styles.bell_modal}>
                        <View style={styles.bell_body}>
                            <Text style={styles.text}>Remind me After</Text>
                            <TextInput
                                style={styles.bell_input}
                                keyboardType='numeric'
                                value={bellTime.toString()}
                                 onChangeText={(value) => setBellTime(value)}
                            />
                            <Text style={styles.text}>Minute(s)</Text>
                        </View>

                        <View style={styles.bell_buttons}>
                            <TouchableOpacity
                                style={styles.bell_cancel_button}
                                onPress={() => setShowBellModal(false)}
                            >
                                <Text style={styles.text}>Cancel</Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.bell_ok_button}
                                onPress={() => {setShowBellModal(false),
                                    setTaskAlarm()
                                }
                                }
                            >
                                <Text style={styles.text}>Ok</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
            <TextInput style={styles.input}
                placeholder='Title'
                value={title}
                onChangeText={(value) => setTitle(value)}
            />
            <TextInput style={styles.input}
                placeholder='Description'
                multiline
                value={desc}
                onChangeText={(value) => setDesc(value)}
            />
            <View style={styles.color_bar}>
                <TouchableOpacity
                    style={styles.color_white}
                    onPress={() => { setColor('white') }}
                >
                    {color === 'white' &&
                        <Ionicons name='checkmark-outline'
                            size={30} color={'#000000'} />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.color_red}
                    onPress={() => { setColor('red') }}
                >
                    {color === 'red' &&
                        <Ionicons name='checkmark-outline'
                            size={30} color={'#000000'} />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.color_blue}
                    onPress={() => { setColor('blue') }}
                >
                    {color === 'blue' &&
                        <Ionicons name='checkmark-outline'
                            size={30} color={'#000000'} />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.color_green}
                    onPress={() => { setColor('green') }}
                >
                    {color === 'green' &&
                        <Ionicons name='checkmark-outline'
                            size={30} color={'#000000'} />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.extra_row}>
                <TouchableOpacity
                    style={styles.extra_button}
                    onPress={() => { setShowBellModal(true) }}
                >
                    <FontAwesomes5 name={'bell'} size={35} />
                </TouchableOpacity>

            </View>

            <View style={styles.checkbox}>
                <CheckBox
                    value={done}
                    onValueChange={(newVal) => setDone(newVal)}
                />
                <Text style={styles.text}>Is Done</Text>
            </View>

            <CustomButton
                title='Save Task'
                color='#1eb900'
                style={{ width: '100%' }}
                onPressFunction={setTask}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
        padding: 10
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'left',
        fontSize: 20,
        margin: 10,
        paddingHorizontal: 10,

    },
    checkbox: {
        flexDirection: 'row',
        margin: 10,
    },
    text: {
        fontSize: 20,
        color: '#000000'

    },
    color_bar: {
        flexDirection: 'row',
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#555555',
        marginVertical: 10,
    },
    color_white: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    color_red: {
        flex: 1,
        backgroundColor: '#f28bB2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    color_blue: {
        flex: 1,
        backgroundColor: '#aecbfa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    color_green: {
        flex: 1,
        backgroundColor: '#ccff90',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    extra_row: {
        flexDirection: 'row',
        marginVertical: 10,

    },
    extra_button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#937DC2',
        height: 50,
        borderRadius: 10,
    },
    centered_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bell_modal: {
        width: 300,
        height: 200,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000000',
    },
    bell_body: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bell_buttons: {
        flexDirection: 'row',
        height: 50,

    },
    bell_input: {
        width: 50,
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        margin: 10,
    },
    bell_cancel_button: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bell_ok_button: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },




})