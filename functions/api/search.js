/**
 * Cloudflare Pages Function
 * Route: /api/search
 * 
 * Handles restaurant search with location-based queries
 */

export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const body = await request.json();
    const { query, location, filters = {} } = body;
    
    // Validate input
    if (!query || !location) {
      return new Response(
        JSON.stringify({ error: 'Query and location are required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // In production, implement actual search logic
    // This could use:
    // - Cloudflare KV for caching
    // - D1 for SQLite at the edge
    // - External search API (Algolia, Elasticsearch)
    
    // Check cache first
    const cacheKey = `search:${query}:${location}:${JSON.stringify(filters)}`;
    const cached = await env.CACHE.get(cacheKey, 'json');
    
    if (cached) {
      return new Response(JSON.stringify(cached), {
        headers: {
          'Content-Type': 'application/json',
          'X-Cache': 'HIT'
        }
      });
    }
    
    // Mock search results
    const results = {
      query,
      location,
      results: [
        {
          id: 1,
          name: "Mediterranean Grill",
          distance: "0.5 miles",
          match_score: 0.95,
          snippet: "Authentic halal Mediterranean cuisine..."
        }
      ],
      total: 15,
      filters_applied: filters
    };
    
    // Cache for 5 minutes
    await env.CACHE.put(cacheKey, JSON.stringify(results), {
      expirationTtl: 300
    });
    
    return new Response(JSON.stringify(results), {
      headers: {
        'Content-Type': 'application/json',
        'X-Cache': 'MISS'
      }
    });
    
  } catch (error) {
    console.error('Search error:', error);
    return new Response(
      JSON.stringify({ error: 'Search failed' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}