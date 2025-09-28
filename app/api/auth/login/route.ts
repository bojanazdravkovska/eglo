export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const response = await fetch('https://nativeapi-h8e7h4cgc6gpgbea.northeurope-01.azurewebsites.net/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    const data = await response.json()
    
    return Response.json(data, { status: response.status })
  } catch {
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 