/**
 * Cloudflare Pages Function
 * Route: /api/restaurants
 * 
 * This is an example edge function that would handle restaurant data
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  
  // Parse query parameters
  const url = new URL(request.url);
  const location = url.searchParams.get('location');
  const cuisine = url.searchParams.get('cuisine');
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  
  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
  };
  
  try {
    // In production, this would query your database
    // Example with Supabase:
    /*
    const supabaseUrl = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_ANON_KEY;
    
    const response = await fetch(
      `${supabaseUrl}/rest/v1/restaurants?` + 
      `location=eq.${location}&` +
      `cuisine=eq.${cuisine}&` +
      `limit=${limit}&` +
      `offset=${(page - 1) * limit}`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      }
    );
    
    const data = await response.json();
    */
    
    // Mock data for now
    const mockData = {
      restaurants: [
        {
          id: 1,
          name: "Kabul House",
          cuisine: "Afghan",
          location: "New York, NY",
          rating: 4.8,
          halal_certified: true
        }
      ],
      pagination: {
        page,
        limit,
        total: 100,
        pages: 10
      }
    };
    
    return new Response(JSON.stringify(mockData), { headers });
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch restaurants' }), 
      { 
        status: 500,
        headers 
      }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function onRequestOptions(context) {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}