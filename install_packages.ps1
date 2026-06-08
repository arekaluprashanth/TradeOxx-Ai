$sdk = 'c:\Users\prash\Downloads\TradespaceAi\android_sdk'
$manager = "$sdk\cmdline-tools\latest\bin\sdkmanager.bat"
& $manager --sdk_root=$sdk "platform-tools" "platforms;android-34" "build-tools;34.0.0"
