$adapterMemory = (Get-ItemProperty -Path "HKLM:\SYSTEM\ControlSet001\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}\0*" -Name "HardwareInformation.AdapterString", "HardwareInformation.qwMemorySize" -Exclude PSPath -ErrorAction SilentlyContinue)

foreach ($adapter in $adapterMemory) {
  [PSCustomObject] @{
    Model = $adapter."HardwareInformation.AdapterString"
    "VRAM (GB)" = [math]::round($adapter."HardwareInformation.qwMemorySize" / 1GB)
  }
}