# react-native-rn-in-app-update

Google in-app updates support for react-native. Specially created for android only. After installing plugin user will get android app update popup if there is any update available on play store.

## Installation

`$ npm install react-native-rn-in-app-update --save`

## Linking  (RN < 0.60)

`$ react-native link react-native-rn-in-app-update`


## Additional configuration in android (Required)

### Add Below Lines in MainActivity.java

=> Import package:
```
...
...
import com.logicwind.inappupdate.InAppUpdateUtils; // add this

=> Create object :  
private InAppUpdateUtils appUpdateUtils;


@Override
protected void onCreate(Bundle savedInstanceState) {
    ...
    ...
    appUpdateUtils = new InAppUpdateUtils(this); // add this
    appUpdateUtils.initAppUpdaterAndCheckForUpdate(); // add this
    appUpdateUtils.registerListener(); // add this
}

// Add below method also
@Override
protected void onResume() {
    super.onResume();
    appUpdateUtils.ifUpdateDownloadedThenInstall();
}

// Add below method also
@Override
    protected void onDestroy() {
    super.onDestroy();
    appUpdateUtils.unregisterListener();
}
```

### That's it. Configuration done. No need to add anything in your application js file.