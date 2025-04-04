import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24293E',
    alignItems: 'center',
    paddingTop: 20,
  },
  searchInput: {
    width: '90%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#86B1F1',
    color: '#86B1F1',
    fontSize: 18,
  },
  resultContainer: {
    marginTop: 20,
    width: '90%',
    marginBottom: 110,
    flexGrow: 1,
  },
  noteItem: {
    backgroundColor: '#1E2233',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  noteText: {
    color: '#86B1F1',
    fontSize: 17,
    flex: 1, 
  },
  categoryText: {
    fontSize: 10,
    color: '#86B1F1',
    marginLeft: 10, 
    top: -13,
    left: 10
  },
});

export default styles;
