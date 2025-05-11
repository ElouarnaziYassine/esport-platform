import {Text, View, StyleSheet, Pressable, TouchableOpacity} from 'react-native';

export default function Header({ title, text }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.subText}>{text}</Text>

        <View style={styles.twoButton}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>JOIN TOURNAMENT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>WATCH NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  headerContainer: {
    marginTop: 200,
    paddingBottom: 30,
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 6,
  },

  subText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },

  twoButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  button: {
    backgroundColor: 'rgba(9,28,63,0.9)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderRightColor: 'rgb(4,217,4)',
    borderBottomColor: 'rgb(4,217,4)',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
