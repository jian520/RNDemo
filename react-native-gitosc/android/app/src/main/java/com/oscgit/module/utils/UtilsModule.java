package com.oscgit.module.utils;

import android.content.pm.PackageInfo;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import org.json.JSONObject;

public class UtilsModule extends ReactContextBaseJavaModule {


  public UtilsModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "Utils";
  }

  @ReactMethod
  public void trackClick(ReadableMap options) {
    String l = "";
    if(hasValidKey("name", options)) {
       l = options.getString("name");
    }

    if(hasValidKey("atr", options)) {
//      l += options.getString("atr");
    }

    Log.d("D", l);
  }

  @ReactMethod
  public void appInfo(Callback callback) {
    JSONObject json = new JSONObject();
    try {
      PackageInfo info = getReactApplicationContext().getPackageManager().getPackageInfo(getReactApplicationContext().getPackageName(), 0);
      json.put("appVersion", info.versionName);
    } catch (Exception e) {
      e.printStackTrace();
    }

    callback.invoke(json.toString());
  }

  /**
   * Checks if a given key is valid
   * @param @{link String} key
   * @param @{link ReadableMap} options
   * @return boolean representing whether the key exists and has a value
   */
  private boolean hasValidKey(String key, ReadableMap options) {
    return options.hasKey(key) && !options.isNull(key);
  }

}