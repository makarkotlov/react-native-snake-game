<h1>React Native Snake Game</h1>
<p>
    <img src="https://cloclo13.datacloudmail.ru/weblink/view/2dr3/4Xsfp3rL8?etag=CA6BC75772C80F98A54FDD5D3CB8C68463B74FA2" height="450" />
    <img src="https://cloclo23.datacloudmail.ru/weblink/view/k6Xa/2rqkxtK8m?etag=A67518D6200022626FE5788D0884538E96C487C5" height="450" />
    <img src="https://cloclo22.datacloudmail.ru/weblink/view/4yAG/3qaLKtK3Y?etag=2341E5887311C6F1A51F24F36D8DE75E8A8A7821" height="450" />
</p>
<h2>Features</h2>
<ul>
    <li>Choose board size</li>
    <li>Choose difficulty</li>
    <li>Choose color theme</li>
    <li>Swipes vs Joystick</li>
    <li>Teleportation</li>
    <li>JSC vs Hermes vs V8</li>
</ul>
<h2>Setup</h2>
<ul>
    <li>`git clone`</li>
    <li>`npm i`</li>
    <li>`cd ios && pod install`</li>
</ul>
<h2>Engine change</h2>
<ul>
    <li>Checkout the branch with different engine</li>
    <li>npm i</li>
    <li>cd android && ./gradlew clean (if you built the project before)</li>
    <li>Profile with Android Studio profiler</li>
    <li>Profile in release by adding in android/app/build.gradle</li>
</ul>

```gradle
...
 android {
    lintOptions {
        checkReleaseBuilds false
        abortOnError false
    }
    compileSdkVersion rootProject.ext.compileSdkVersion
    compileOptions {...
```

<p>and in application in AndroidManifest.xml</p>

```xml
...
    android:debuggable="true">
...
```
