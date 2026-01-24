export async function loginUser(email: string, password: string) {
  const res = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data.message || 'Erro no login')

  return data.access_token
}
