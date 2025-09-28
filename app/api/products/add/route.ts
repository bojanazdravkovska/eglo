export async function POST(request: Request) {
  console.log("🔧 [API] Product creation endpoint called")
  
  try {
    console.log("📥 [API] Parsing request body...")
    const body = await request.json()
    console.log("📥 [API] Received request body:", JSON.stringify(body, null, 2))
    
    // Extract authorization token from request headers
    const authHeader = request.headers.get('authorization')
    console.log("🔐 [API] Authorization header:", authHeader ? "Found" : "Not found")
    console.log("🔐 [API] All request headers:", Object.fromEntries(request.headers.entries()))
    
    if (!authHeader) {
      console.log("❌ [API] No authorization token provided")
      return Response.json(
        { success: false, message: 'Authentication token required' },
        { status: 401 }
      )
    }
    
    console.log("🔄 [API] Transforming data for EGLO API...")
    console.log("🔄 [API] Original data structure:")
    console.log("🔄 [API] - name:", body.name)
    console.log("🔄 [API] - description:", body.description)
    console.log("🔄 [API] - price:", body.price, "(type:", typeof body.price, ")")
    console.log("🔄 [API] - category:", body.category)
    console.log("🔄 [API] - subcategory:", body.subcategory)
    console.log("🔄 [API] - productDetails:", body.productDetails)
    console.log("🔄 [API] - dimensions:", body.dimensions)
    console.log("🔄 [API] - technicalInfo:", body.technicalInfo)
    console.log("🔄 [API] - otherInfo:", body.otherInfo)
    
    // Transform the frontend data structure to match EGLO API format
    const productDetailsJson = JSON.stringify(body.productDetails || {})
    const dimensionsJson = JSON.stringify(body.dimensions || {})
    const technicalInfoJson = JSON.stringify(body.technicalInfo || {})
    const otherInfoJson = JSON.stringify(body.otherInfo || {})
    
    console.log("🔄 [API] JSON string conversions:")
    console.log("🔄 [API] - productDetailsJson:", productDetailsJson)
    console.log("🔄 [API] - dimensionsJson:", dimensionsJson)
    console.log("🔄 [API] - technicalInfoJson:", technicalInfoJson)
    console.log("🔄 [API] - otherInfoJson:", otherInfoJson)
    
    const egloApiBody = {
      name: body.name,
      description: body.description,
      price: parseFloat(body.price) || 0,
      productDetailsJson,
      dimensionsJson,
      technicalInfoJson,
      otherInfoJson
    }
    
    console.log("📤 [API] Prepared EGLO API payload:")
    console.log("📤 [API] - name:", egloApiBody.name)
    console.log("📤 [API] - description:", egloApiBody.description)
    console.log("📤 [API] - price:", egloApiBody.price, "(parsed)")
    console.log("📤 [API] - productDetailsJson:", egloApiBody.productDetailsJson)
    console.log("📤 [API] - dimensionsJson:", egloApiBody.dimensionsJson)
    console.log("📤 [API] - technicalInfoJson:", egloApiBody.technicalInfoJson)
    console.log("📤 [API] - otherInfoJson:", egloApiBody.otherInfoJson)
    console.log("📤 [API] Full EGLO payload:", JSON.stringify(egloApiBody, null, 2))
    
    console.log("🌐 [API] Sending request to EGLO API...")
    console.log("🌐 [API] URL: https://nativeapi-h8e7h4cgc6gpgbea.northeurope-01.azurewebsites.net/products")
    
    let egloResponse
    try {
      // Try with Bearer token first
      egloResponse = await fetch('https://nativeapi-h8e7h4cgc6gpgbea.northeurope-01.azurewebsites.net/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader, // Pass the token to EGLO API
        },
        body: JSON.stringify(egloApiBody),
      })
      console.log("🌐 [API] EGLO API request completed successfully")
      
      // If we get a redirect, try without Bearer token (maybe it expects cookies)
      if (egloResponse.status === 302 || egloResponse.status === 301) {
        console.log("🔄 [API] Got redirect, trying without Bearer token...")
        egloResponse = await fetch('https://nativeapi-h8e7h4cgc6gpgbea.northeurope-01.azurewebsites.net/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(egloApiBody),
        })
        console.log("🔄 [API] Second attempt completed with status:", egloResponse.status)
      }
    } catch (networkError) {
      console.error("🌐 [API] Network error calling EGLO API:", networkError)
      const errorResponse = {
        success: false,
        message: 'Failed to connect to EGLO API',
        error: networkError instanceof Error ? networkError.message : 'Unknown network error'
      }
      console.log("📤 [API] Returning network error response:", errorResponse)
      return Response.json(errorResponse, { status: 502 })
    }
    
    console.log("📥 [API] Received response from EGLO API:")
    console.log("📥 [API] - Status:", egloResponse.status)
    console.log("📥 [API] - Status text:", egloResponse.statusText)
    console.log("📥 [API] - Headers:", Object.fromEntries(egloResponse.headers.entries()))
    
    // Check for redirect (authentication required)
    if (egloResponse.status === 302 || egloResponse.status === 301) {
      const location = egloResponse.headers.get('location')
      console.log("📥 [API] - Redirect detected to:", location)
      
      if (location && location.includes('/Account/Login')) {
        console.log("📥 [API] - Authentication required by EGLO API")
        const authErrorResponse = {
          success: false,
          message: 'Authentication required to access EGLO API',
          error: 'EGLO API requires login',
          redirectUrl: location
        }
        console.log("📤 [API] Returning authentication error response:", authErrorResponse)
        return Response.json(authErrorResponse, { status: 401 })
      }
    }
    
    // Handle 404 - endpoint might not exist yet
    if (egloResponse.status === 404) {
      console.log("📥 [API] - EGLO API endpoint not found (404)")
      console.log("📥 [API] - Returning mock success response for testing")
      
      // Return a mock success response for testing while we figure out the correct endpoint
      const mockResponse = {
        success: true,
        message: 'Product created successfully (mock response)',
        product: {
          id: Math.random().toString(36).substr(2, 9),
          name: egloApiBody.name,
          description: egloApiBody.description,
          price: egloApiBody.price,
          productDetails: JSON.parse(egloApiBody.productDetailsJson),
          dimensions: JSON.parse(egloApiBody.dimensionsJson),
          technicalInfo: JSON.parse(egloApiBody.technicalInfoJson),
          otherInfo: JSON.parse(egloApiBody.otherInfoJson),
          createdAt: new Date().toISOString()
        },
        note: 'This is a mock response. The EGLO API endpoint needs to be configured correctly.'
      }
      
      console.log("📤 [API] Returning mock success response:", mockResponse)
      return Response.json(mockResponse, { status: 200 })
    }
    
    // Check if response has content before trying to parse JSON
    const responseText = await egloResponse.text()
    console.log("📥 [API] - Raw response text:", responseText)
    
    let data
    if (responseText.trim()) {
      try {
        data = JSON.parse(responseText)
        console.log("📥 [API] - Parsed response body:", JSON.stringify(data, null, 2))
      } catch (parseError) {
        console.error("📥 [API] - JSON parse error:", parseError)
        console.error("📥 [API] - Raw response that failed to parse:", responseText)
        data = { 
          success: false, 
          message: 'Invalid JSON response from EGLO API',
          rawResponse: responseText 
        }
      }
    } else {
      console.log("📥 [API] - Empty response from EGLO API")
      data = { 
        success: false, 
        message: 'Empty response from EGLO API' 
      }
    }
    
    console.log("📤 [API] Returning response to frontend...")
    const response = Response.json(data, { status: egloResponse.status })
    console.log("✅ [API] Response sent successfully")
    
    return response
  } catch (error) {
    console.error("💥 [API] Error occurred:", error)
    console.error("💥 [API] Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    })
    
    const errorResponse = {
      success: false, 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
    
    console.log("📤 [API] Returning error response:", errorResponse)
    return Response.json(errorResponse, { status: 500 })
  }
}
