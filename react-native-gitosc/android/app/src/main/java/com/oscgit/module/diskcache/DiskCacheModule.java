package com.oscgit.module.diskcache;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DiskCacheModule extends ReactContextBaseJavaModule {

  public DiskCacheModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "GFDiskCacheManager";
  }

  @ReactMethod
  public void diskCacheCost(Callback callback) {
   long size = DataManager.getApplicationData(this.getReactApplicationContext());
    callback.invoke(new Long(size).intValue());
  }

  @ReactMethod
  public void clearDiskCache(Callback callback) {
    long preSize = DataManager.getApplicationData(this.getReactApplicationContext());

    DataManager.cleanApplicationData(this.getReactApplicationContext());
    long afterSize = DataManager.getApplicationData(this.getReactApplicationContext());

    callback.invoke(new Long(preSize - afterSize).intValue());
  }
}

