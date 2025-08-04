# react-native-rn-in-app-update

A minimal React Native module that displays the native Android in-app update popup using the Play Core library. Supports both immediate and flexible update types.

## Installation

Using npm:

```sh md title="Terminal"
npm install react-native-rn-in-app-update
```

or using yarn:

```sh md title="Terminal"
yarn add react-native-rn-in-app-update
```

## Usage

Import and use the `showUpdatePopup` function. it supports 2 update type **immediate** and **flexible**

```tsx md title="App.tsx"
import { showUpdatePopup } from 'react-native-rn-in-app-update';

<Button title="Get Update" onPress={() => showUpdatePopup('immediate')} />;
```

## How to Test In-App Updates on Android

To test this package correctly, you must publish your app to the Play Store (even if only in **Internal Testing**) — the in-app update API only works when your app is installed via **Google Play**.

### Step 1: Upload a lower-version build (v1)

Create a signed APK/AAB with version:

```sh
versionCode 100
versionName "1.0.0"
```

Upload this build to the Play Console → Internal Testing track.

Publish it and wait until it’s available for testers (usually within 15–30 minutes).

Install the app from the Play Store using a tester account.

### Step 2: Prepare a higher-version build (v2)

Increment version:

```sh
versionCode 101
versionName "1.1.0"
```

DO NOT UPLOAD IT YET.

This is your update version, which the Play Store will later offer as an available update.

### Step 3: Open the app (v1) with your test logic

Ensure your app runs this on launch or on button click:

```tsx
showUpdatePopup('immediate');
```

At this point, no popup will appear, because there's no newer version yet.

### Step 4: Upload the higher version (v2)

Now upload the v2 build (with versionCode = 101) to Internal Testing.

Publish and wait until it’s live for testers (can take up to 30–60 minutes).

### Step 5: Reopen the app

Reopen the installed v1 app on your test device (it’s still running versionCode = 100).

You should now see the in-app update popup, triggered by:

```tsx
showUpdatePopup('immediate');
```

**Find more details for testing [here](https://developer.android.com/guide/playcore/in-app-updates/test)**

## react-native-rn-in-app-update is crafted mindfully at [Logicwind](https://www.logicwind.com?utm_source=github&utm_medium=github.com-logicwind&utm_campaign=react-native-rn-in-app-update)

We are a 130+ people company developing and designing multiplatform applications using the Lean & Agile methodology. To get more information on the solutions that would suit your needs, feel free to get in touch by [email](mailto:sales@logicwind.com) or through or [contact form](https://www.logicwind.com/contact-us?utm_source=github&utm_medium=github.com-logicwind&utm_campaign=react-native-rn-in-app-update)!

We will always answer you with pleasure 😁

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
