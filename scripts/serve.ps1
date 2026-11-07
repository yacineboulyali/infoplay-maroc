# Mini serveur statique local avec API Multijoueur LAN.
# Ne collecte ni n'envoie aucune donnee externe.
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$l = New-Object System.Net.HttpListener

# Essaie d'ecouter sur toutes les interfaces locales, sinon repli sur localhost
try {
  $l.Prefixes.Add('http://+:8765/')
  $l.Start()
} catch {
  $l = New-Object System.Net.HttpListener
  $l.Prefixes.Add('http://localhost:8765/')
  $l.Start()
}

Write-Host "Serveur InfoPlay Maroc actif sur le port 8765"

$mime = @{
  '.html'='text/html; charset=utf-8';
  '.js'='text/javascript; charset=utf-8';
  '.mjs'='text/javascript; charset=utf-8';
  '.css'='text/css; charset=utf-8';
  '.woff2'='font/woff2';
  '.json'='application/json';
  '.png'='image/png';
  '.jpg'='image/jpeg';
  '.svg'='image/svg+xml'
}

# Memoire pour le reseau local
$script:lanPlayers = @{}
$script:lanChallenges = [System.Collections.ArrayList]@()
$script:lanMessages = [System.Collections.ArrayList]@()

while ($l.IsListening) {
  $c = $l.GetContext()
  $p = [Uri]::UnescapeDataString($c.Request.Url.AbsolutePath.TrimStart('/'))

  # Support API LAN
  if ($p.StartsWith('api/lan/')) {
    $c.Response.AddHeader('Access-Control-Allow-Origin', '*')
    $c.Response.ContentType = 'application/json; charset=utf-8'

    if ($p -eq 'api/lan/heartbeat' -and $c.Request.HttpMethod -eq 'POST') {
      $reader = New-Object System.IO.StreamReader($c.Request.InputStream, $c.Request.ContentEncoding)
      $body = $reader.ReadToEnd()
      if ($body) {
        try {
          $peer = $body | ConvertFrom-Json
          if ($peer.peerId) {
            $peer | Add-Member -NotePropertyName lastSeen -NotePropertyValue ([DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()) -Force
            $script:lanPlayers[$peer.peerId] = $peer
          }
        } catch {}
      }
      $now = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
      $active = @()
      foreach ($k in @($script:lanPlayers.Keys)) {
        if ($now - $script:lanPlayers[$k].lastSeen -gt 12000) {
          $script:lanPlayers.Remove($k)
        } else {
          $active += $script:lanPlayers[$k]
        }
      }
      $resp = @{ ok = $true; players = $active; challenges = $script:lanChallenges; messages = $script:lanMessages } | ConvertTo-Json -Depth 4
      $b = [System.Text.Encoding]::UTF8.GetBytes($resp)
      $c.Response.OutputStream.Write($b, 0, $b.Length)
      $c.Response.Close()
      continue
    }

    if ($p -eq 'api/lan/state') {
      $resp = @{ players = @($script:lanPlayers.Values); challenges = $script:lanChallenges; messages = $script:lanMessages } | ConvertTo-Json -Depth 4
      $b = [System.Text.Encoding]::UTF8.GetBytes($resp)
      $c.Response.OutputStream.Write($b, 0, $b.Length)
      $c.Response.Close()
      continue
    }
  }

  if ($p -eq '') { $p = 'index.html' }
  $f = [IO.Path]::GetFullPath((Join-Path $root $p))
  if ($f.StartsWith($root) -and (Test-Path $f -PathType Leaf)) {
    $b = [IO.File]::ReadAllBytes($f)
    $e = [IO.Path]::GetExtension($f).ToLower()
    if ($mime.ContainsKey($e)) { $c.Response.ContentType = $mime[$e] }
    $c.Response.OutputStream.Write($b, 0, $b.Length)
  } else { $c.Response.StatusCode = 404 }
  $c.Response.Close()
}
