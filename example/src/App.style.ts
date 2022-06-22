import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  title: {
    fontSize: 20,
    marginTop: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerHighlight: {
    backgroundColor: 'white',
    width: '80%',
    height: 30,
    position: 'absolute',
    borderRadius: 10,
  },
});
