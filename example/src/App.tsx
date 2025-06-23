import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { showUpdatePopup } from 'react-native-rn-in-app-update';

const App = () => {
  useEffect(() => {
    showUpdatePopup();
  }, []);

  return (
    <View style={styles.container}>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
