import { useState, useContext, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NotesContext } from '../Contexts/NotesContext';
import styles from '../styles/AddStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function Add() {
  const [note, setNote] = useState('');
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addNotes, getCategories, categories } = useContext(NotesContext);
  const [modalVisible, setmodalVisible] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
    getCategories();
  }, [])
);

  const goBack = () => {
    navigation.goBack();
  };

  const openModal = () => {
    setmodalVisible(true);
  };

  const exitModal = () => {
    setmodalVisible(false);
  };

  const handleSave = () => {
    if (selectedCategory) {
      addNotes(name, note, selectedCategory)
        .then(() => {
          setName('');
          setNote('');
          setSelectedCategory('');
          setmodalVisible(false);
        })
        .catch(error => {
          console.error('Error adding note', error);
        });
      console.log('GOTOVO');
    } else {
      console.error('Please select a category');
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setmodalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.upContainer}>
            <TouchableOpacity onPress={goBack}>
              <Ionicons name={'arrow-undo'} size={23} icon={styles.icon} color={'white'} />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
              <Text style={styles.mainText}>Нова нотатка</Text>
            </View>
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
              style={[styles.ideaInput, { fontSize: 20, fontWeight: '400' }]}
              placeholder='Замітка'
              placeholderTextColor={'#86B1F1'}
              value={note}
              onChangeText={setNote}
              multiline
              textBreakStrategy="simple"
            />
          </View>

          <TouchableOpacity onPress={openModal}>
            <Text style={[styles.categoryText, { paddingTop: 20 }]}>
              {selectedCategory ? selectedCategory : 'Категорія'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={[styles.buttonText]}>CREATE</Text>
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            animationType='fade'
            transparent={true}
            onRequestClose={() => setmodalVisible(false)}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
