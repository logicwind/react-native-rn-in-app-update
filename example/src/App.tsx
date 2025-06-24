import { useEffect, useState } from 'react';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';
import {
  getUpdateInfo,
  showUpdatePopup,
  type UpdateInfo,
} from 'react-native-rn-in-app-update';

const App = () => {
  const [updateInfo, setUpdateInfo] = useState<null | UpdateInfo>(null);

  useEffect(() => {
    const checkUpdate = async () => {
      if (Platform.OS !== 'android') return;

      try {
        const info = await getUpdateInfo();
        setUpdateInfo(info);
      } catch (err: any) {
        Alert.alert(
          'Update Error',
          err?.message || 'Could not check or start update'
        );
      }
    };

    checkUpdate();
  }, []);

  const handleCheckFlexibleUpdate = async () => {
    try {
      await showUpdatePopup('flexible');
    } catch (err: any) {
      Alert.alert(
        'Update Error',
        err?.message || 'Could not start flexible update'
      );
    }
  };

  const handleCheckImmediateUpdate = async () => {
    try {
      await showUpdatePopup('immediate');
    } catch (err: any) {
      Alert.alert(
        'Update Error',
        err?.message || 'Could not start immediate update'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>In-App Update Demo</Text>

      {Platform.OS === 'android' ? (
        <View style={styles.innerContainer}>
          <Button
            title="Check for Flexible Update"
            onPress={handleCheckFlexibleUpdate}
          />
          <Button
            title="Check for Immediate Update"
            onPress={handleCheckImmediateUpdate}
          />
          {updateInfo && (
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Update Info:</Text>
              <Text>
                Available: {updateInfo.updateAvailability === 2 ? 'Yes' : 'No'}
              </Text>
              <Text>
                Immediate Allowed: {updateInfo.immediateAllowed ? 'Yes' : 'No'}
              </Text>
              <Text>
                Flexible Allowed: {updateInfo.flexibleAllowed ? 'Yes' : 'No'}
              </Text>
              <Text>Version Code: {updateInfo.versionCode}</Text>
              {updateInfo.clientVersionStalenessDays !== undefined && (
                <Text>
                  Staleness (days): {updateInfo.clientVersionStalenessDays}
                </Text>
              )}
              <Text>
                Download Size:{' '}
                {(updateInfo.totalBytesToDownload / (1024 * 1024)).toFixed(2)}{' '}
                MB
              </Text>
            </View>
          )}
        </View>
      ) : (
        <Text style={styles.note}>
          In-app updates are only supported on Android.
        </Text>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '600',
  },
  innerContainer: {
    rowGap: 20,
    width: '100%',
  },
  infoBox: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f3f3f3',
    width: '100%',
  },
  infoTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  note: {
    marginTop: 20,
    fontStyle: 'italic',
    color: 'gray',
  },
});
