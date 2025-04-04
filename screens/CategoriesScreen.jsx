import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import styles from '../styles/categoriesStyle';
import { addCategory, getCategories, updateCategory, deleteCategory } from '../data/notesData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Categories() {
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('');

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  const addNewCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim())
        .then(() => {
          setCategories([...categories, newCategory.trim()]);
          setNewCategory('');
        })
        .catch(error => {
          console.error('Error adding category', error);
        });
    }
  };

  const openModal = (category: string) => {
    setSelectedCategory(category);
    setEditCategoryName(category);
    setIsModalVisible(true);
  };
  
  const exitModal = (category: string) => {
    setIsModalVisible(false);
  }

  const handleUpdateCategory = () => {
    if (selectedCategory && editCategoryName.trim()) {
      updateCategory(selectedCategory, editCategoryName.trim())
        .then(() => {
          setCategories(
            categories.map(cat => (cat === selectedCategory ? editCategoryName.trim() : cat))
          );
          setIsModalVisible(false);
        })
        .catch(error => {
          console.error('Error updating category', error);
        });
    }
  };

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory)
        .then(() => {
          setCategories(categories.filter(cat => cat !== selectedCategory));
          setIsModalVisible(false);
        })
        .catch(error => {
          console.error('Error deleting category', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Додати Категорію'
          placeholderTextColor={'#CCCCCC'}
          value={newCategory}
          onChangeText={setNewCategory}
        />
        <TouchableOpacity onPress={addNewCategory} style={styles.addButton}>
          <MaterialIcons name={'playlist-add'} style={styles.addButtonText} />
        </TouchableOpacity>
      </View>
      <FlatList 
        style={{marginBottom: 95, flexGrow: 1,}}
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItem} onPress={() => openModal(item)}>
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    
      <Modal
        visible={isModalVisible}
        animationType='fade'
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <View style={styles.exitContainer}>
            <Text style={styles.modalTitle}>Редагувати категорію</Text>
            <TouchableOpacity onPress={exitModal} >
            <MaterialIcons size={22} style={styles.exitButton} name={'fullscreen-exit'}/>
            </TouchableOpacity>
            </View>
            <TextInput
              style={styles.textInput}
              value={editCategoryName}
              onChangeText={setEditCategoryName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleUpdateCategory} style={styles.modalButton}>
                <MaterialIcons size={32} name={'save'} style={styles.modalButtonText}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteCategory} style={[styles.modalButton, styles.deleteButton]}>
              <MaterialIcons size={32} name={'delete-outline'} style={styles.modalButtonText}></MaterialIcons>
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}