import React, { useContext } from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/homeStyles';
import { NotesContext } from '../Contexts/NotesContext';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const { archivedNotes } = useContext(NotesContext); 
  const navigation = useNavigation();

  const handlePress = (note) => {
    navigation.navigate('Edit', {
      id: note.id,
      name: note.name,
      category: note.category,
      note: note.note,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.text}>Архів</Text>
      {archivedNotes.map((note, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.object} 
          onPress={() => handlePress(note)} 
        >
          <Text style={styles.notesText}>{note.name}</Text>
          <Text style={styles.categoryText}>{note.category}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
