package com.rninappupdate

import android.app.Activity
import android.content.Intent
import android.content.IntentSender
import com.facebook.react.bridge.*
import com.google.android.gms.tasks.Task
import com.google.android.play.core.appupdate.AppUpdateInfo
import com.google.android.play.core.appupdate.AppUpdateManager
import com.google.android.play.core.appupdate.AppUpdateManagerFactory
import com.google.android.play.core.install.model.AppUpdateType
import com.google.android.play.core.install.model.UpdateAvailability

class RnInAppUpdateModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), ActivityEventListener {

  private val appUpdateManager: AppUpdateManager = AppUpdateManagerFactory.create(reactContext)

  init {
    reactContext.addActivityEventListener(this)
  }

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun showUpdatePopup(updateType: Int, promise: Promise) {
    val activity: Activity? = currentActivity
    if (activity == null) {
      promise.reject("NO_ACTIVITY", "Current activity is null")
      return
    }

    val appUpdateInfoTask: Task<AppUpdateInfo> = appUpdateManager.appUpdateInfo

    appUpdateInfoTask.addOnSuccessListener { appUpdateInfo ->
      if (appUpdateInfo.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE &&
          appUpdateInfo.isUpdateTypeAllowed(updateType)) {
        try {
          appUpdateManager.startUpdateFlowForResult(
            appUpdateInfo,
            updateType,
            activity,
            REQUEST_CODE
          )
          promise.resolve("STARTED")
        } catch (e: IntentSender.SendIntentException) {
          promise.reject("INTENT_ERROR", "Error starting update flow", e)
        }
      } else {
        promise.reject("UPDATE_NOT_AVAILABLE", "Update not available or type not allowed")
      }
    }

    appUpdateInfoTask.addOnFailureListener { e ->
      promise.reject("UPDATE_ERROR", "Failed to get update info", e)
    }
  }

  override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
    // No-op
  }

  override fun onNewIntent(intent: Intent) {
    // No-op
  }

  companion object {
    const val NAME = "RnInAppUpdate"
    const val REQUEST_CODE = 12345
  }
}
