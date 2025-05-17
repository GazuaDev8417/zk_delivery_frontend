import React, { useState } from "react"



interface DataContent{
  message:string
  code:string
}




const RegisterAddress = ({ setShowRegisterAddress }: { setShowRegisterAddress: (value:boolean) => void }) => {
  const [address, setAddress] = useState<string>("")
  const [message, setMessage] = useState<string>('')
  const [revealCode, setRevealCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)




  const handleVerify = async () => {
    setLoading(true)
    setError(null)

    if (!address.trim()) {
      setError("Digite o endereço.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("http://localhost:3001/register-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao registrar endereço")
      }
      
      setMessage(data.message)
      setRevealCode(data.code)

    } catch (e) {
      console.error(e)
      setError("Erro durante a verificação.")
    }

    setLoading(false)
  }
  




  return (
    <div style={{ padding: "2rem", width: "100%", margin: "auto" }}>
      <h2>Registrar Endereço</h2>
      <input
        type="text"
        placeholder="Endereço"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", width: "100%", height:'30px', paddingLeft:'10px' }}/>
      <button onClick={handleVerify} disabled={loading}>
        {loading ? "Registrando..." : "Registrar"}
      </button>
      {revealCode && (
        <p>
          <strong>{message}:</strong> {revealCode}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p style={{fontSize:15}}>Retornar à <span style={{color:'blue', cursor:'pointer'}} onClick={() => setShowRegisterAddress(false)}>validação</span>
      </p>
    </div>
  )
}

export default RegisterAddress




