import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 120,
    backgroundColor: '#24293E',
  },
  text: {
    color: '#86B1F1',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
  },
  object: {
    backgroundColor: '#2f3650',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: "85%",
    borderRadius: 10,
    padding: 14,
  },
  notesText: {
    fontSize: 20,
    color: '#86B1F1',
  },
  categoryText: {
    fontSize: 9,
    color: '#86B1F1',
    paddingRight: -7,
    top: -20,
    alignSelf: 'flex-end',
  },
});

export default styles;
