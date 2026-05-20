## 1.3.0

- Fixed unhandled promise rejections causing noise in error tracking tools (e.g. Sentry)
- `showUpdatePopup` and `startFlexibleUpdateWithProgress` now resolve with `"UPDATE_NOT_AVAILABLE"` when no update exists, and `"UPDATE_CHECK_FAILED"` when Play Core cannot reach the Play Store
- `getUpdateInfo` now resolves with `null` on failure instead of rejecting

## 1.2.0

- Added funtion to get update details
- Added function to get download progress with flexible update

## 1.1.0

**Breaking Changes:**

- Added support for new architecture
- Removed steps for native setup
- Added method for Javascript/Typescript with update type (immediate, flexible)

## 1.0.3

- Added support for Android target SDK 34

## 1.0.2-beta

- Added support for Android 12 and above (Verified)

## 1.0.2-beta

- Added support for Android 12 and above

## 1.0.0

- Initial release
