package com.logicwind.inappupdate;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.IntentSender;
import android.util.Log;

import com.google.android.play.core.appupdate.AppUpdateInfo;
import com.google.android.play.core.appupdate.AppUpdateManager;
import com.google.android.play.core.appupdate.AppUpdateManagerFactory;
import com.google.android.play.core.install.InstallState;
import com.google.android.play.core.install.InstallStateUpdatedListener;
import com.google.android.play.core.install.model.AppUpdateType;
import com.google.android.play.core.install.model.InstallStatus;
import com.google.android.play.core.install.model.UpdateAvailability;
import com.google.android.play.core.tasks.OnSuccessListener;
import com.google.android.play.core.tasks.Task;

public class InAppUpdateUtils {

    private static final int MY_REQUEST_CODE = 1056;
    private AppUpdateManager appUpdateManager;
    private Activity activity;
    private InstallStateUpdatedListener listener = new InstallStateUpdatedListener() {
        @Override
        public void onStateUpdate(InstallState state) {
            Log.e("mye", "state" + state.installStatus() + " --  " + state.installErrorCode());
            if (state.installStatus() == InstallStatus.DOWNLOADED) {
                showDialog();
            }
        }
    };
    private int HIGH_PRIORITY_UPDATE = 5;

    public InAppUpdateUtils(Activity activity) {
        this.activity = activity;
    }

    public void initAppUpdaterAndCheckForUpdate() {
        appUpdateManager = AppUpdateManagerFactory.create(activity);

        // Returns an intent object that you use to check for an update.
        Task<AppUpdateInfo> appUpdateInfoTask = appUpdateManager.getAppUpdateInfo();
        // and checks the update priority.
        appUpdateInfoTask.addOnSuccessListener(appUpdateInfo -> {
            Log.e("mye", "appUpdateInfo " + appUpdateInfo.availableVersionCode() + "packageName " + appUpdateInfo.packageName() + "updateAvailability " + appUpdateInfo.updateAvailability() + "updatePriority " + appUpdateInfo.updatePriority());
            if (appUpdateInfo.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE
                    && appUpdateInfo.updatePriority() >= HIGH_PRIORITY_UPDATE) {
                try {
                    appUpdateManager.startUpdateFlowForResult(
                            appUpdateInfo,
                            AppUpdateType.IMMEDIATE,
                            activity,
                            MY_REQUEST_CODE);
                } catch (IntentSender.SendIntentException e) {
                    e.printStackTrace();
                    Log.e("mye", "SendIntentException " + e.getMessage());
                }
            } else if (appUpdateInfo.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE) {
                try {
                    appUpdateManager.startUpdateFlowForResult(
                            appUpdateInfo,
                            AppUpdateType.FLEXIBLE,
                            activity,
                            MY_REQUEST_CODE);
                } catch (IntentSender.SendIntentException e) {
                    e.printStackTrace();
                    Log.e("mye", "SendIntentException " + e.getMessage());
                }
            }
        });
    }

    public void registerListener() {
        if (appUpdateManager != null)
            appUpdateManager.registerListener(listener);
    }

    public void ifUpdateDownloadedThenInstall() {
        if (appUpdateManager != null)
            appUpdateManager.getAppUpdateInfo().addOnSuccessListener(new OnSuccessListener<AppUpdateInfo>() {
                @Override
                public void onSuccess(AppUpdateInfo result) {
                    if (result.installStatus() == InstallStatus.DOWNLOADED) {
                        showDialog();
                    }
                }
            });
    }

    private void showDialog() {
        if (activity == null) return;
        Log.e("mye", "showDialog");
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (!activity.isFinishing()) {
                    new AlertDialog.Builder(activity)
                            .setTitle("Update")
                            .setMessage("update downloaded successfully")
                            .setPositiveButton("Install now", new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog, int which) {
                                    appUpdateManager.completeUpdate();
                                    dialog.cancel();
                                }
                            })
                            .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog, int which) {
                                    dialog.cancel();
                                }
                            })
                            .show();
                }
            }
        });

    }

    public void unregisterListener() {
        if (appUpdateManager != null)
            appUpdateManager.unregisterListener(listener);
    }

}
