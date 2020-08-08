# react-native-rn-in-app-update

## Getting started

`$ npm install react-native-rn-in-app-update --save`

### Manual installation for (RN < 0.60)

`$ react-native link react-native-rn-in-app-update`

## Add Below Lines in MainActivity.java

=> Import package:
import com.logicwind.inappupdate.InAppUpdateUtils;

=> Create object :  
private InAppUpdateUtils appUpdateUtils;

=> Add below lines in OnCreate method :
appUpdateUtils = new InAppUpdateUtils(this);
appUpdateUtils.initAppUpdaterAndCheckForUpdate();
appUpdateUtils.registerListener();

=> Add below methods also :
@Override
protected void onResume() {
super.onResume();
appUpdateUtils.ifUpdateDownloadedThenInstall();
}

@Override
protected void onDestroy() {
super.onDestroy();
appUpdateUtils.unregisterListener();
}
