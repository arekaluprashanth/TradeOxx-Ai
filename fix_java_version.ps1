$files = Get-ChildItem -Path 'android', 'node_modules\@capacitor\android' -Filter *.gradle -Recurse
foreach ($file in $files) {
    $content = Get-Content $file.FullName
    if ($content -match 'VERSION_21') {
        $content = $content -replace 'VERSION_21', 'VERSION_17'
        Set-Content $file.FullName $content
    }
}
