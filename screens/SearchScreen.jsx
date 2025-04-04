import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';
import { NotesContext } from '../Contexts/NotesContext'; 
import styles from '../styles/searchStyles'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Search() {
  const {notes} = useContext(NotesContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredNotes, setFilteredNotes] = useState(notes)

  useEffect(() => {
    const filtered = notes.filter(note =>
      note.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchQuery, notes]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Пошук за іменем або категорією..."
        placeholderTextColor="#CCCCCC"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        data={filteredNotes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.noteItem}>
            <Text style={styles.noteText}>{item.name}</Text>
            <Text style={styles.categoryText}>{item.category}</Text>
          </TouchableOpacity>
        )}
        style={styles.resultContainer}
      />
    </View>
  );
}
