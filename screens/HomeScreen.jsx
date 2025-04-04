import { useContext, useEffect } from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/homeStyles';
import { NotesContext } from '../Contexts/NotesContext';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const { notes, getNotes } = useContext(NotesContext); 
  const navigation = useNavigation();

  const handlePress = (note) => {
    navigation.navigate('Edit', {
      id: note.id,
      name: note.name,
      category: note.category,
      note: note.note,
    });
  };

  useEffect(() => {
    getNotes()
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.text}>IdeaCloud</Text>
      {notes.map((note, index) => (
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
