import React, { useState } from "react"
import DebugInstance from "src/renderer/common/DebugInstance"
import styled from "styled-components"

export type DebugPanelProps = {
  debugInfo: DebugInstance
  onClose: () => void
}

const DebugPanelContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 770px;
  border-radius: 24px;
  background-color: black;
  opacity: 0.75;
  font-family: Manrope;
  font-size: 18px;
  color: white;
  backdrop-filter: blur(10px);
  padding-left: 24px;
  z-index: 9999;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
`


const DebugPanel: React.FC<DebugPanelProps> = ({ debugInfo, onClose }) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  return (
    <DebugPanelContainer>
      <CloseButton onClick={handleClose}>Close</CloseButton>
      <h1 style={{ fontSize: "26px" }}>Testing data</h1>
      <pre>
        Signed up date: {debugInfo.getSignedup()}
        <br />
        <br />
        GPU: {debugInfo.gpu}
        <br />
        CPU: {debugInfo.cpu}
        <br />
        CPU core: {debugInfo.cpu_core}
        <br />
        GPU VRAM: {debugInfo.gpu_vram}
        <br />
        ramGb: {debugInfo.ram_Gb} GB
        <br />
        PCs: {debugInfo.pcs}
        <br />
        IP: {debugInfo.IP}
        <br />
        MACaddress: {debugInfo.mac_address}
        <br />
        DeviceID: {debugInfo.device_id}
        <br />
        UserID: {debugInfo.user_id}
        <br />
        <br />
        Name: {debugInfo.name}
        <br />
        Email: {debugInfo.email}
        <br />
        AccountNumber: {debugInfo.account_no}
        <br />
        Payout Address: {debugInfo.address}
        <br />
        Payout Method: {debugInfo.payout_method}
        <br />
        Payout requested: {debugInfo.payout_requested}
        <br />
        Payout request time: {debugInfo.payout_request_time}
        <br />
        Paid: {debugInfo.isPaid}
        <br />
        Paid On: {debugInfo.getPaidOn()}
        <br />
        <br />
        Yearly Potential Earnings: {debugInfo.potential_earningyrly}
        <br />
        Yearly Estimated Earnings: {debugInfo.estimated_earningyrly}
        <br />
        Yearly CPU Earnings: {debugInfo.cpuEarningsYrly}
        <br />
        Yearly GPU Earnings: {debugInfo.gpuEarningsYrly}
        <br />
        Monthly Potential Earnings: {debugInfo.monthlyPotential}
        <br />
        Lifetime Potential Earnings: {debugInfo.lifetimePotential}
        <br />
        Balance: {debugInfo.balance}
        <br />
        <br />
        Hashrate(RVN): {debugInfo.rvnHashrate}
        <br />
        Hashrate(XMR): {debugInfo.xmrHashrate}
        <br />
        
      </pre>
    </DebugPanelContainer>
  )
}

export default DebugPanel