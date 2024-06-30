import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Pressable,
  Modal,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParams } from '../src/app/App';

const Tabs = ({ text }: { text: string }) => {
  const colorIt = text === 'All' ? 'bg-green-400' : 'bg-gray-300';

  return (
    <Text className={`px-4 py-2 rounded-2xl mr-2 ${colorIt}`}>{text}</Text>
  );
};

export const Navbar = () => {
  const navigator = useNavigation<DrawerNavigationProp<RootStackParams>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [roomName, setRoomName] = useState('');

  const handleCreateRoom = () => {
    console.log('Room Name:', roomName);
    setModalVisible(false);
    setRoomName('');
    navigator.navigate('Chat', { title: roomName });
  };

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const img = require('../assets/images/photo.jpg');
  return (
    <View className="flex justify-center pl-4 pt-4 pb-4">
      <ScrollView horizontal>
        <TouchableOpacity onPress={() => navigator.openDrawer()}>
          <Image
            className="w-10 h-10 rounded-full mr-4"
            source={img}
            contentFit="scale-down"
            transition={1000}
          />
        </TouchableOpacity>
        <Tabs text="All" />
        <View className="flex justify-center bg-gray-300 rounded-2xl px-2 mr-2 ">
          <Pressable onPress={() => setModalVisible(true)}>
            <Text>Create Room</Text>
          </Pressable>
        </View>
        <Tabs text="Rooms" />
        <Tabs text="Participated" />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create Room</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter room name"
              value={roomName}
              onChangeText={setRoomName}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.createButton]}
                onPress={handleCreateRoom}
              >
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  createButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Navbar;
