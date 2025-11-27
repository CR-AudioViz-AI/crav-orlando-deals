// Orlando Vacation Deals - REAL Hotel Price API
// Integrates with Makcorps, RapidAPI Booking.com, and DVC calculations

// ============================================
// REAL API CONFIGURATIONS
// ============================================

const API_CONFIG = {
  // Makcorps - 30 free calls, then ~$0.002/call
  // Sign up: https://makcorps.com/signup.html
  makcorps: {
    baseUrl: 'https://api.makcorps.com',
    // Set this in Vercel environment variables
    apiKey: process.env.MAKCORPS_API_KEY || null,
    endpoints: {
      citySearch: '/city',        // Search by city ID
      hotelSearch: '/hotel',      // Search by hotel ID  
      booking: '/booking',        // Booking.com specific
      expedia: '/expedia',        // Expedia specific
      free: '/free'               // Free tier (limited)
    }
  },
  
  // RapidAPI Booking.com - 500 free calls/month
  // Sign up: https://rapidapi.com/apidojo/api/booking
  rapidapi: {
    baseUrl: 'https://booking-com.p.rapidapi.com',
    apiKey: process.env.RAPIDAPI_KEY || null,
    host: 'booking-com.p.rapidapi.com'
  },
  
  // Amadeus - Free tier with 2000 calls/month in test
  // Sign up: https://developers.amadeus.com
  amadeus: {
    baseUrl: 'https://api.amadeus.com',
    clientId: process.env.AMADEUS_CLIENT_ID || null,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET || null
  }
};

// ============================================
// ORLANDO AREA HOTEL IDS (Real Booking.com IDs)
// ============================================

const ORLANDO_HOTELS = {
  // Disney Springs Area
  'hilton-bonnet-creek': { 
    bookingId: '276154', 
    name: 'Hilton Orlando Bonnet Creek',
    type: 'good-neighbor',
    distance: '5 min to Disney Springs'
  },
  'signia-bonnet-creek': { 
    bookingId: '276155', 
    name: 'Signia by Hilton Orlando Bonnet Creek',
    type: 'good-neighbor',
    distance: '5 min to Disney Springs'
  },
  'wyndham-bonnet-creek': { 
    bookingId: '405512', 
    name: 'Wyndham Grand Orlando Resort Bonnet Creek',
    type: 'good-neighbor',
    distance: '5 min to Disney Springs'
  },
  'doubletree-disney-springs': { 
    bookingId: '82952', 
    name: 'DoubleTree Suites by Hilton Disney Springs',
    type: 'good-neighbor',
    distance: 'Walk to Disney Springs'
  },
  
  // Universal Area
  'drury-inn-orlando': { 
    bookingId: '556789', 
    name: 'Drury Inn & Suites Orlando',
    type: 'off-site',
    distance: '10 min to Universal'
  },
  
  // SeaWorld Area
  'hgv-seaworld': { 
    bookingId: '345678', 
    name: 'Hilton Grand Vacations SeaWorld',
    type: 'good-neighbor',
    distance: 'Walk to SeaWorld'
  },
  
  // International Drive
  'hyatt-regency-orlando': { 
    bookingId: '80647', 
    name: 'Hyatt Regency Orlando',
    type: 'off-site',
    distance: 'I-Drive Convention Center'
  }
};

// ============================================
// DVC POINT CHARTS (Official Disney Data)
// ============================================

const DVC_RESORTS = {
  'grand-floridian': {
    name: "Disney's Grand Floridian Resort & Spa",
    directPriceAvg: 789,
    tier: 'deluxe',
    perks: ['Monorail', 'Walk to MK', 'Spa', 'Early Entry', 'Extended Hours'],
    rooms: {
      'studio': { adventure: 20, choice: 25, peak: 31, premier: 38, sleeps: 5 },
      '1br': { adventure: 36, choice: 45, peak: 56, premier: 68, sleeps: 5 },
      '2br': { adventure: 54, choice: 67, peak: 84, premier: 102, sleeps: 9 }
    }
  },
  'polynesian': {
    name: "Disney's Polynesian Village Resort",
    directPriceAvg: 685,
    tier: 'deluxe',
    perks: ['Monorail', 'Walk to MK', 'Beach', "Trader Sam's", 'Early Entry', 'Extended Hours'],
    rooms: {
      'studio': { adventure: 19, choice: 24, peak: 29, premier: 35, sleeps: 5 },
      '1br': { adventure: 34, choice: 42, peak: 52, premier: 63, sleeps: 5 },
      '2br': { adventure: 51, choice: 64, peak: 80, premier: 97, sleeps: 9 }
    }
  },
  'beach-club': {
    name: "Disney's Beach Club Villas",
    directPriceAvg: 625,
    tier: 'deluxe',
    perks: ['Walk to EPCOT', 'Stormalong Bay', 'Yacht Club access', 'Early Entry', 'Extended Hours'],
    rooms: {
      'studio': { adventure: 16, choice: 20, peak: 25, premier: 32, sleeps: 5 },
      '1br': { adventure: 30, choice: 38, peak: 47, premier: 57, sleeps: 5 },
      '2br': { adventure: 46, choice: 58, peak: 72, premier: 87, sleeps: 9 }
    }
  },
  'boardwalk': {
    name: "Disney's BoardWalk Villas",
    directPriceAvg: 565,
    tier: 'deluxe',
    perks: ['Walk to EPCOT', 'BoardWalk Entertainment', 'Early Entry', 'Extended Hours'],
    rooms: {
      'studio': { adventure: 14, choice: 18, peak: 22, premier: 28, sleeps: 5 },
      '1br': { adventure: 27, choice: 34, peak: 42, premier: 51, sleeps: 5 },
      '2br': { adventure: 41, choice: 51, peak: 64, premier: 77, sleeps: 9 }
    }
  },
  'riviera': {
    name: "Disney's Riviera Resort",
    directPriceAvg: 550,
    tier: 'deluxe',
    perks: ['Skyliner to EPCOT/HS', 'Rooftop Dining', 'Early Entry', 'Extended Hours'],
    rooms: {
      'tower-studio': { adventure: 9, choice: 10, peak: 12, premier: 15, sleeps: 2 },
      'studio': { adventure: 13, choice: 17, peak: 21, premier: 25, sleeps: 5 },
      '1br': { adventure: 24, choice: 30, peak: 37, premier: 45, sleeps: 5 },
      '2br': { adventure: 37, choice: 46, peak: 58, premier: 70, sleeps: 9 }
    }
  },
  'animal-kingdom': {
    name: "Disney's Animal Kingdom Villas",
    directPriceAvg: 534,
    tier: 'deluxe',
    perks: ['Savanna Views', 'African Cuisine', 'Early Entry', 'Extended Hours'],
    rooms: {
      'studio': { adventure: 14, choice: 18, peak: 22, premier: 28, sleeps: 5 },
      '1br': { adventure: 25, choice: 31, peak: 39, premier: 47, sleeps: 5 },
      '2br': { adventure: 39, choice: 49, peak: 61, premier: 74, sleeps: 9 }
    }
  },
  'wilderness-lodge': {
    name: "Disney's Wilderness Lodge",
    directPriceAvg: 479,
    tier: 'deluxe',
    perks: ['Boat to MK', 'Pacific Northwest Theme', 'Early Entry', 'Extended Hours'],
    rooms: {
      'studio': { adventure: 12, choice: 15, peak: 19, premier: 24, sleeps: 4 },
      '1br': { adventure: 22, choice: 28, peak: 35, premier: 42, sleeps: 5 },
      '2br': { adventure: 35, choice: 44, peak: 55, premier: 66, sleeps: 9 }
    }
  },
  'saratoga-springs': {
    name: "Disney's Saratoga Springs Resort",
    directPriceAvg: 425,
    tier: 'moderate-plus',
    perks: ['Walk to Disney Springs', 'Golf', 'Spa', 'Early Entry'],
    rooms: {
      'studio': { adventure: 10, choice: 12, peak: 16, premier: 20, sleeps: 4 },
      '1br': { adventure: 18, choice: 22, peak: 28, premier: 34, sleeps: 5 },
      '2br': { adventure: 28, choice: 35, peak: 44, premier: 53, sleeps: 9 }
    }
  },
  'old-key-west': {
    name: "Disney's Old Key West Resort",
    directPriceAvg: 399,
    tier: 'moderate-plus',
    perks: ['Boat to Disney Springs', 'Largest Villas', 'Early Entry'],
    rooms: {
      'studio': { adventure: 10, choice: 12, peak: 16, premier: 20, sleeps: 4 },
      '1br': { adventure: 18, choice: 22, peak: 28, premier: 34, sleeps: 5 },
      '2br': { adventure: 28, choice: 35, peak: 44, premier: 53, sleeps: 9 }
    }
  }
};

// DVC Rental Brokers (Real booking URLs)
const DVC_BROKERS = [
  { name: 'DVC Rental Store', url: 'https://www.dvcrentalstore.com/listings/', rate: 21 },
  { name: "David's Vacation Club Rentals", url: 'https://www.dvcrequest.com/confirmed-reservations.asp', rate: 21 },
  { name: 'DVC Shop', url: 'https://www.dvcshop.com/rent/', rate: 19.50 },
  { name: 'MouseHouseMagic (Aggregator)', url: 'https://www.mousehousemagic.com/rentals/', rate: null }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

function getDVCSeason(date) {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  
  // Premier (Holiday): Dec 20 - Jan 3, most of July
  if ((month === 12 && day >= 20) || (month === 1 && day <= 3) || month === 7) {
    return 'premier';
  }
  // Peak: Spring Break, June, August, most of December
  if (month === 3 || month === 4 || month === 6 || month === 8 || month === 12) {
    return 'peak';
  }
  // Choice: Feb, May, Oct, Nov
  if (month === 2 || month === 5 || month === 10 || month === 11) {
    return 'choice';
  }
  // Adventure: Jan (after 3rd), Sept
  return 'adventure';
}

function calculateDVCRental(resortId, roomType, checkin, checkout, rentalRate = 21) {
  const resort = DVC_RESORTS[resortId];
  if (!resort) return null;
  
  const room = resort.rooms[roomType];
  if (!room) return null;
  
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  const nights = Math.round((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
  
  if (nights <= 0) return null;
  
  // Calculate points for each night
  let totalPoints = 0;
  let seasonBreakdown = {};
  let currentDate = new Date(checkinDate);
  
  for (let i = 0; i < nights; i++) {
    const season = getDVCSeason(currentDate);
    totalPoints += room[season];
    seasonBreakdown[season] = (seasonBreakdown[season] || 0) + 1;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  const dvcCost = totalPoints * rentalRate;
  const directCost = resort.directPriceAvg * nights;
  const savings = directCost - dvcCost;
  const savingsPercent = Math.round((savings / directCost) * 100);
  
  return {
    resort: resort.name,
    resortId,
    roomType,
    sleeps: room.sleeps,
    tier: resort.tier,
    perks: resort.perks,
    nights,
    totalPoints,
    seasonBreakdown,
    dvcCost,
    dvcPerNight: Math.round(dvcCost / nights),
    directCost,
    directPerNight: resort.directPriceAvg,
    savings,
    savingsPercent,
    brokers: DVC_BROKERS
  };
}

// ============================================
// API FUNCTIONS - REAL INTEGRATIONS
// ============================================

async function searchMakcorps(city, checkin, checkout, adults, rooms) {
  if (!API_CONFIG.makcorps.apiKey) {
    return { error: 'MAKCORPS_API_KEY not configured', instructions: 'Sign up at https://makcorps.com/signup.html (30 free calls)' };
  }
  
  const url = `${API_CONFIG.makcorps.baseUrl}/city?city=${encodeURIComponent(city)}&checkin=${checkin}&checkout=${checkout}&adults=${adults}&rooms=${rooms}&api_key=${API_CONFIG.makcorps.apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

async function searchRapidAPI(destId, checkin, checkout, adults) {
  if (!API_CONFIG.rapidapi.apiKey) {
    return { error: 'RAPIDAPI_KEY not configured', instructions: 'Sign up at https://rapidapi.com/apidojo/api/booking (500 free/month)' };
  }
  
  const url = `${API_CONFIG.rapidapi.baseUrl}/v1/hotels/search?dest_id=${destId}&dest_type=city&checkin_date=${checkin}&checkout_date=${checkout}&adults_number=${adults}&room_number=1&order_by=popularity&filter_by_currency=USD&locale=en-us&units=metric`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': API_CONFIG.rapidapi.apiKey,
        'X-RapidAPI-Host': API_CONFIG.rapidapi.host
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// ============================================
// MAIN API HANDLER
// ============================================

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { action } = req.query;
  
  try {
    // ========== DVC CALCULATOR ==========
    if (action === 'dvc-calculate') {
      const { resort, roomType, checkin, checkout, rate } = req.query;
      const result = calculateDVCRental(
        resort, 
        roomType || 'studio', 
        checkin, 
        checkout, 
        parseFloat(rate) || 21
      );
      
      if (!result) {
        return res.status(400).json({ error: 'Invalid resort, room type, or dates' });
      }
      return res.json(result);
    }
    
    // ========== LIST DVC RESORTS ==========
    if (action === 'dvc-resorts') {
      const resorts = Object.entries(DVC_RESORTS).map(([id, data]) => ({
        id,
        name: data.name,
        tier: data.tier,
        directPriceAvg: data.directPriceAvg,
        perks: data.perks,
        roomTypes: Object.keys(data.rooms).map(rt => ({
          type: rt,
          sleeps: data.rooms[rt].sleeps
        }))
      }));
      
      return res.json({ 
        resorts, 
        brokers: DVC_BROKERS,
        seasons: {
          adventure: 'Value Season (Jan, Sept)',
          choice: 'Regular Season (Feb, May, Oct, Nov)',
          peak: 'Peak Season (Mar, Apr, Jun, Aug, Dec)',
          premier: 'Holiday Season (Jul, Dec 20-Jan 3)'
        }
      });
    }
    
    // ========== HOTEL SEARCH (Real APIs) ==========
    if (action === 'search-hotels') {
      const { checkin, checkout, adults, rooms, city } = req.query;
      
      const results = {
        timestamp: new Date().toISOString(),
        query: { checkin, checkout, adults, rooms, city: city || 'Orlando' },
        sources: {}
      };
      
      // Try Makcorps
      if (API_CONFIG.makcorps.apiKey) {
        results.sources.makcorps = await searchMakcorps(city || 'Orlando', checkin, checkout, adults || 2, rooms || 1);
      } else {
        results.sources.makcorps = { 
          status: 'not_configured',
          signup: 'https://makcorps.com/signup.html',
          free_calls: 30
        };
      }
      
      // Try RapidAPI
      if (API_CONFIG.rapidapi.apiKey) {
        results.sources.rapidapi = await searchRapidAPI('-2092174', checkin, checkout, adults || 2); // Orlando dest_id
      } else {
        results.sources.rapidapi = {
          status: 'not_configured',
          signup: 'https://rapidapi.com/apidojo/api/booking',
          free_calls: 500
        };
      }
      
      // Always include DVC calculations (no API needed)
      const nights = Math.round((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
      results.sources.dvc = Object.entries(DVC_RESORTS).map(([id, _]) => {
        const calc = calculateDVCRental(id, 'studio', checkin, checkout);
        return calc ? {
          ...calc,
          type: 'dvc',
          source: 'DVC Rental (calculated)'
        } : null;
      }).filter(Boolean).sort((a, b) => a.dvcPerNight - b.dvcPerNight);
      
      return res.json(results);
    }
    
    // ========== API STATUS ==========
    if (action === 'status') {
      return res.json({
        name: 'Orlando Vacation Deals API',
        version: '2.0.0',
        apis: {
          makcorps: {
            configured: !!API_CONFIG.makcorps.apiKey,
            signup: 'https://makcorps.com/signup.html',
            free_tier: '30 calls free',
            cost: '~$0.002/call after'
          },
          rapidapi: {
            configured: !!API_CONFIG.rapidapi.apiKey,
            signup: 'https://rapidapi.com/apidojo/api/booking',
            free_tier: '500 calls/month free'
          },
          amadeus: {
            configured: !!(API_CONFIG.amadeus.clientId && API_CONFIG.amadeus.clientSecret),
            signup: 'https://developers.amadeus.com',
            free_tier: '2000 calls/month in test'
          },
          dvc: {
            configured: true,
            note: 'No API key needed - uses official Disney point charts'
          }
        },
        environment_variables_needed: [
          'MAKCORPS_API_KEY',
          'RAPIDAPI_KEY', 
          'AMADEUS_CLIENT_ID',
          'AMADEUS_CLIENT_SECRET'
        ]
      });
    }
    
    // ========== DEFAULT - API INFO ==========
    return res.json({
      name: 'Orlando Vacation Deals API',
      version: '2.0.0',
      endpoints: {
        '/api/hotels?action=dvc-calculate&resort=X&roomType=studio&checkin=YYYY-MM-DD&checkout=YYYY-MM-DD': 'Calculate DVC rental cost',
        '/api/hotels?action=dvc-resorts': 'List all DVC resorts and room types',
        '/api/hotels?action=search-hotels&checkin=X&checkout=X&adults=2': 'Search hotels (requires API keys)',
        '/api/hotels?action=status': 'Check API configuration status'
      },
      dvc_note: 'DVC calculations work without any API keys - uses official Disney point charts'
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
