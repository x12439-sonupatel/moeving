import React, {useState} from 'react';
import {
  Pressable,
  Text,
  TextInput,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import uuid from 'react-native-uuid';
import {addUpdateData, updateData} from '../firebase';
export default (AddScreen = ({navigation, route}) => {
  const {text, id} = route?.params || {};
  let [todo, setTodo] = useState(text || '');
  let [isLoading, setLoading] = useState(false);

  const addData = async () => {
    let id = id || uuid.v4();
    setLoading(true);
    try {
      await addUpdateData({
        table: 'todoList',
        data: {id: id, text: todo},
        docType: id,
      });
    } catch (err) {
      setLoading(false);
    }
    setTodo('');
    setLoading(false);
    navigation.navigate('Home');
  };

  const updateDataM = async () => {
    setLoading(true);
    try {
      await updateData({
        table: 'todoList',
        id,
        data: {
          text: todo,
        },
      });
    } catch (err) {
      setLoading(false);
    }
    setLoading(false);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingStyle}>
          <ActivityIndicator size="large" />
        </View>
      ) : null}
      <View style={styles.inputContainerStyle}>
        <TextInput
          value={todo}
          onChangeText={e => setTodo(e)}
          placeholder="Enter todo"
          style={styles.inputStyle}
        />
        <View style={styles.buttonViewStyle}>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? 'green' : 'blue',
              },
              styles.button,
            ]}
            onPress={id ? updateDataM : addData}>
            <Text style={styles.buttonText}>{`${id ? 'Edit' : 'Add'}`}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    borderRadius: 8,
    padding: 6,
    height: 40,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  loadingStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  inputStyle: {borderWidth: 1, height: 40, borderRadius: 4, paddingLeft: 10},
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 15,
    paddingVertical: 25,
    marginHorizontal: 10,
    borderRadius: 4,
  },
  buttonViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});
