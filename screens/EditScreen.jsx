import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';
import { NotesContext } from '../Contexts/NotesContext';
import styles from '../styles/AddStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function Edit() {
  const [note, setNote] = useState('');
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isArchived, setIsArchived] = useState(false);
  const { addNotes, updateDatabase, getCategories, categories, deleteNote, archiveNote } = useContext(NotesContext);
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: 'none' } });
    getCategories();

    if (route.params) {
      const { id, name, note, category, isArchived } = route.params;
      setName(name || '');
      setNote(note || '');
      setSelectedCategory(category || '');
      setIsArchived(isArchived || false);
    }

    return () => navigation.setOptions({ tabBarStyle: undefined });
  }, [route.params, navigation]);

  const openModal = () => {
    setModalVisible(true);
  };

  const exitModal = () => {
    setModalVisible(false);
  };

  const handleArchive = async () => {
    if (route.params?.id) {
      const newArchiveStatus = !isArchived;
      await archiveNote(route.params.id, newArchiveStatus);
      setIsArchived(newArchiveStatus);
    }
  };

  const handleDelete = async () => {
    if (route.params?.id) {
      await deleteNote(route.params.id);
      navigation.goBack();
    }
  };

  const handleSave = async () => {
    if (route.params?.id) {
      await updateDatabase(route.params.id, name, note, selectedCategory);
    } else {
      await addNotes(name, note, selectedCategory);
    }
    navigation.goBack();
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.upContainer}>
        <Ionicons name={'arrow-undo'} size={23} color={'white'} onPress={() => navigation.goBack()} />
        <View style={styles.titleContainer}>
          <Text style={styles.mainText}>Редагувати нотатку</Text>
        </View>

        <TouchableOpacity onPress={handleArchive}>
          <Ionicons
            name={isArchived ? 'archive-outline' : 'archive'}
            size={23}
            color={isArchived ? 'gray' : 'lightyellow'} 
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.nameInput, { fontSize: 20, fontWeight: '600' }]}
          placeholder='Назва'
          placeholderTextColor={'#86B1F1'}
          value={name}
          onChangeText={setName}
          multiline
          textContentType='name'
          textBreakStrategy="simple"
        />

        <TextInput
          style={[styles.ideaInput, { fontSize: 20, fontWeight: '400', height: 450 }]}
          placeholder='Замітка'
          placeholderTextColor={'#86B1F1'}
          value={note}
          onChangeText={setNote}
          multiline
          textBreakStrategy="simple"
        />
      </View>

      <TouchableOpacity onPress={openModal}>
        <Text style={[styles.categoryText, { paddingTop: 30, top: -40 }]}>
          {selectedCategory ? selectedCategory : 'Категорія'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { left: 100, bottom: 35.3 }]} onPress={handleSave}>
        <Text style={[styles.buttonText]}>UPDATE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={handleDelete}>
        <Text style={[styles.buttonText, { color: '#FFCCCB' }]}>DELETE</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType='fade'
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={exitModal}>
              <MaterialIcons size={25} style={styles.exitButton} name={'fullscreen-exit'} />
            </TouchableOpacity>

            <FlatList
              data={categories}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categories}
                  onPress={() => handleSelectCategory(item)}
                >
                  <Text style={styles.categoryText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
