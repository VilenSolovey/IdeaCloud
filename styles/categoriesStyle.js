import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#24293E',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput:{
    width: "85%",
    backgroundColor:'#1E2233',
    padding: 10,
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  addButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    paddingHorizontal: 10,
    backgroundColor: '#86B1F1',
    marginBottom: 9,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#1E2233',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#24293E',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  exitButton: {
    position: 'absolute',
    right: -55,
    top: -18,
    padding: 0,
  },
  exitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    paddingHorizontal: 13,
    paddingVertical: 13,
    marginHorizontal: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  categoryItem: {
    padding: 14,
    backgroundColor: '#7e98bf',
    borderRadius: 5,
    marginVertical: 5,
  },
  categoryText: {
    fontSize: 18,
    color: '#1E2233',
  },
});

export default styles;
