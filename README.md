<h1>React Native Snake Game</h1>
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
    <li>git clone</li>
    <li>npm i</li>
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
