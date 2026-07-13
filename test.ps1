$body = @{ email = "test@test.com"; password = "password" } | ConvertTo-Json
$response = Invoke-RestMethod -Uri "https://TradeOxx-9u574e09c-arekaluprashanths-projects.vercel.app/api/auth/login" -Method Post -Body $body -ContentType "application/json"
$response | ConvertTo-Json -Depth 10
