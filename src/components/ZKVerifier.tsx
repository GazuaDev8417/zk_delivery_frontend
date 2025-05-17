import React, { useState } from "react"






const ZKVerifier: React.FC = () => {
  const [code, setCode] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [revealAddress, setRevealAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)




  const handleVerify = async () => {
    setLoading(true)
    setError(null)
    setIsValid(null)
    setRevealAddress(null)

    if (!code.trim()) {
      setError("Digite o código secreto.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("http://localhost:3001/verify-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro na verificação")
      }

      setIsValid(data.valid)
      if (data.valid && data.address) {
        setRevealAddress(data.address)
      } else {
        setError("Prova inválida ou código não reconhecido.")
      }
    } catch (e) {
      console.error(e)
      setError("Erro durante a verificação.")
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: "2rem", width: "100%", margin: "auto" }}>
      <h2>Verificação ZK do Código</h2>
      <input
        type="text"
        placeholder="Código secreto"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", width: "100%", height:'30px', paddingLeft:'10px' }}
      />
      <button onClick={handleVerify} disabled={loading}>
        {loading ? "Verificando..." : "Verificar Prova"}
      </button>
      {isValid !== null && (
        <p style={{ marginTop: "1rem" }}>
          Status da prova:{" "}
          <strong style={{ color: isValid ? "green" : "red" }}>
            {isValid ? "Válida ✅" : "Inválida ❌"}
          </strong>
        </p>
      )}
      {revealAddress && (
        <p>
          <strong>Endereço revelado:</strong> {revealAddress}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}

export default ZKVerifier




