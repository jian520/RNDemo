package com.oscgit;

import android.content.Context;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
//import com.facebook.react.bridge.ReactContext;
//import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import com.oscgit.module.diskcache.DiskCachePackage;
import com.oscgit.module.utils.UtilsPackage;
import com.remobile.toast.*;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import cl.json.RNSharePackage;

import static com.oscgit.BuildConfig.*;

public class MainActivity extends ReactActivity {
    CodePush codePush;
    ShakeSensor mShakeSensor;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getJSBundleFile() {
        return this.codePush.getBundleUrl("index.android.bundle");
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "OSCGit";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        mShakeSensor = new MyShakeSensor(this.getApplication());
        codePush = new CodePush("e6cSsRkZBTF42ERwBIrNOIqbkJcH4k55Guhpl", this, BuildConfig.DEBUG);
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                codePush.getReactPackage(),
                new RCTToastPackage(),
                new VectorIconsPackage(),
                new RNSharePackage(),
                new DiskCachePackage(),
                new UtilsPackage()
        );
    }

   public class MyShakeSensor extends ShakeSensor {
       public MyShakeSensor(Context context) {
           super(context);
       }
        @Override
        public void createLottery() {
            ReactContext reactContext = (ReactContext) getBaseContext();
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("ShakeEvent", null);
        }
    }
}
