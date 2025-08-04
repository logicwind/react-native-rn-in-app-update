import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-rn-in-app-update' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RnInAppUpdate = NativeModules.RnInAppUpdate
  ? NativeModules.RnInAppUpdate
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

/**
 * Shows the native Android in-app update popup using the Play Core API.
 *
 * @param type - (Optional) The update type to use:
 *   - `'immediate'` (default): Forces the user to update immediately before continuing.
 *   - `'flexible'`: Allows the user to continue using the app while the update is downloaded in the background.
 *
 * @returns A Promise that resolves when the update flow is started, or rejects if not available or fails.
 */
export const showUpdatePopup = (
  type: 'immediate' | 'flexible' = 'immediate'
): Promise<void> => {
  if (Platform.OS === 'android') {
    const updateType = type === 'immediate' ? 0 : 1;
    return RnInAppUpdate.showUpdatePopup(updateType);
  }

  return Promise.resolve();
};
