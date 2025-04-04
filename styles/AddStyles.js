import { Button, StyleSheet } from 'react-native';
import { archiveNote } from '../data/notesData';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      paddingTop: 20,
      backgroundColor: '#24293E',
      alignItems: 'center',
      textAlign: 'center'
    },
    upContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20, 
      paddingBottom: 10
    },
    titleContainer: {
      flex: 1, 
      alignItems: 'center',
      justifyContent: 'center'
    },
    icon: {
      paddingRight: 10,
      marginBottom: 0
    },
    mainText: {
      color: '#86B1F1',
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 6,
    },
    nameInput: {
      width: '80%',
      padding: 10,
      color: 'white',
      fontSize: 20,
      borderRadius: 5,
      marginBottom: 20,
    },
    categoryText: {
      fontWeight: '400',
      fontSize: 17,
      color: '#86B1F1',
      
      textAlign: 'center',  
      width: '100%',  
    },
    ideaInput: {
      width: '90%',
      height: 500,
      padding: 10,
      color: 'white',
      fontSize: 20,
      borderRadius: 5,
      textAlignVertical: 'top',
    },
    inputContainer: {
      width: '100%',
      alignItems: 'flex-start',
      marginLeft: 45
    },
    button: {
      backgroundColor: '#2f3650',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      bottom: -20,            
      alignSelf: 'center',   
    },
    buttonText: {
      color: '#86B1F1',
      fontSize: 18,
      fontWeight: 'bold',
      borderRadius: 5
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent:{
      width: '65%',
      height: '50%',
      backgroundColor: '#24293E',
      borderRadius: 10,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    exitButton: {
      position: 'absolute',
      right: -5,
      top: -190,
      padding: 0,
    },
    categories: {
      backgroundColor: '#2f3650',
      width: '100%',
      padding: 15,
      marginBottom: 10,
      borderRadius: 8,
      alignItems: 'center',  
    },
    button2 : {
      backgroundColor: '#2f3650',
      paddingVertical: 10,
      paddingHorizontal: 20,
      right: 100,
      borderRadius: 5,
      bottom: 80,           
      alignSelf: 'center',  
    },
    archiveButton: {
      height: 30
    }
  });
  
  export default styles;