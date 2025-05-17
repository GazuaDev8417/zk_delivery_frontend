import { useState } from "react"
import ZKVerifier from "./components/ZKVerifier"
import RegisterAddress from "./components/RegisterAddress"




function App() {
  const [showRegisterAddress, setShowRegisterAddress] = useState<boolean>(false)

  return (
    <>
      {!showRegisterAddress ? <ZKVerifier setShowRegisterAddress={setShowRegisterAddress} /> : <RegisterAddress setShowRegisterAddress={setShowRegisterAddress} />}
    </>
  )
}

export default App
