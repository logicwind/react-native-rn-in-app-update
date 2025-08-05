import { DeviceEventEmitter, NativeModules, Platform } from 'react-native';

import type { UpdateInfo, UpdateType } from './types';

export * from './types';

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
  type: UpdateType = 'immediate'
): Promise<void> => {
  if (Platform.OS !== 'android') {
    return Promise.resolve();
  }

  const updateType = type === 'immediate' ? 0 : 1;
  return RnInAppUpdate.showUpdatePopup(updateType);
};

/**
 * Gets metadata about the available update from the Play Store.
 *
 * @returns A promise that resolves with update info, or rejects on error or unsupported platform.
 */
export const getUpdateInfo = async (): Promise<UpdateInfo | null> => {
  if (Platform.OS !== 'android') {
    return null;
  }

  const info = await RnInAppUpdate.getUpdateInfo();
  return info;
};

/**
 * Starts a flexible update and listens for download progress.
 * Emits progress events via DeviceEventEmitter.
 */
export const startFlexibleUpdateWithProgress = async (): Promise<void> => {
  if (Platform.OS !== 'android') return;

  await RnInAppUpdate.startFlexibleUpdateWithProgress();
};

/**
 * Subscribes to update progress events
 */
export const subscribeToUpdateProgress = (
  callback: (progress: {
    status: number;
    bytesDownloaded: number;
    totalBytesToDownload: number;
  }) => void
) => {
  const subscription = DeviceEventEmitter.addListener(
    'in_app_update_progress',
    callback
  );
  return () => subscription.remove(); // return unsubscribe function
};
