$ErrorActionPreference = 'Stop'
$url = 'https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip'
$sdk = 'C:\Users\prash\Downloads\TradespaceAi\android_sdk'
$dest = "$sdk\cmdline-tools.zip"

Write-Host "Creating directory $sdk\cmdline-tools"
New-Item -ItemType Directory -Force -Path "$sdk\cmdline-tools"

Write-Host "Downloading $url to $dest"
Invoke-WebRequest -Uri $url -OutFile $dest

Write-Host "Extracting..."
Expand-Archive -Path $dest -DestinationPath "$sdk\cmdline-tools" -Force

Write-Host "Cleaning up"
Remove-Item $dest
Rename-Item -Path "$sdk\cmdline-tools\cmdline-tools" -NewName "latest"
Write-Host "Done"
