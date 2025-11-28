// JAVARI AI - KNOWLEDGE BASE AND CONVERSATION ENGINE
// This file contains all the knowledge Javari needs to help plan Orlando vacations

const JAVARI_KNOWLEDGE = {
    // ========== DISNEY RESORT HOTELS ==========
    disneyHotels: {
        value: [
            { name: "All-Star Movies", price: "$130-180", location: "Animal Kingdom Area", transport: "Bus only", perks: ["Early Entry", "Free parking at parks"], pool: "2 pools", dining: "Food court" },
            { name: "All-Star Music", price: "$130-180", location: "Animal Kingdom Area", transport: "Bus only", perks: ["Early Entry", "Free parking at parks"], pool: "2 pools", dining: "Food court" },
            { name: "All-Star Sports", price: "$130-180", location: "Animal Kingdom Area", transport: "Bus only", perks: ["Early Entry", "Free parking at parks"], pool: "2 pools", dining: "Food court" },
            { name: "Pop Century", price: "$183-250", location: "ESPN Wide World of Sports", transport: "Bus + Skyliner", perks: ["Early Entry", "Skyliner to EPCOT/HS"], pool: "3 pools", dining: "Food court" },
            { name: "Art of Animation", price: "$200-300", location: "ESPN Wide World of Sports", transport: "Bus + Skyliner", perks: ["Early Entry", "Family suites available", "Skyliner"], pool: "3 pools", dining: "Food court" }
        ],
        moderate: [
            { name: "Caribbean Beach", price: "$250-350", location: "EPCOT Area", transport: "Bus + Skyliner", perks: ["Early Entry", "Skyliner hub"], pool: "6 pools", dining: "Food court + Table service" },
            { name: "Coronado Springs", price: "$260-380", location: "Animal Kingdom Area", transport: "Bus only", perks: ["Early Entry", "Convention center"], pool: "3 pools", dining: "Multiple restaurants" },
            { name: "Port Orleans Riverside", price: "$260-350", location: "Disney Springs Area", transport: "Bus + Boat to Springs", perks: ["Early Entry", "Boat to Disney Springs"], pool: "6 pools", dining: "Food court + Table service" },
            { name: "Port Orleans French Quarter", price: "$260-340", location: "Disney Springs Area", transport: "Bus + Boat to Springs", perks: ["Early Entry", "Compact resort"], pool: "1 pool", dining: "Food court" }
        ],
        deluxe: [
            { name: "Grand Floridian", price: "$700-1200", location: "Magic Kingdom", transport: "Monorail + Boat + Walk", perks: ["Early Entry", "Extended Evening Hours", "Walk to MK"], pool: "2 pools", dining: "Multiple signature restaurants", walkTo: "Magic Kingdom" },
            { name: "Polynesian Village", price: "$600-1000", location: "Magic Kingdom", transport: "Monorail + Boat", perks: ["Early Entry", "Extended Evening Hours", "Trader Sam's"], pool: "2 pools", dining: "Multiple restaurants", walkTo: null },
            { name: "Contemporary", price: "$500-900", location: "Magic Kingdom", transport: "Monorail + Walk", perks: ["Early Entry", "Extended Evening Hours", "Walk to MK"], pool: "2 pools", dining: "California Grill", walkTo: "Magic Kingdom" },
            { name: "Wilderness Lodge", price: "$450-750", location: "Magic Kingdom", transport: "Boat + Bus", perks: ["Early Entry", "Extended Evening Hours", "Boat to MK"], pool: "2 pools", dining: "Multiple restaurants" },
            { name: "Animal Kingdom Lodge", price: "$450-800", location: "Animal Kingdom", transport: "Bus only", perks: ["Early Entry", "Extended Evening Hours", "Savanna views"], pool: "2 pools", dining: "Signature African dining" },
            { name: "Yacht Club", price: "$500-850", location: "EPCOT", transport: "Boat + Walk + Skyliner", perks: ["Early Entry", "Extended Evening Hours", "Walk to EPCOT/HS"], pool: "Stormalong Bay", dining: "Multiple restaurants", walkTo: "EPCOT & Hollywood Studios" },
            { name: "Beach Club", price: "$500-850", location: "EPCOT", transport: "Boat + Walk + Skyliner", perks: ["Early Entry", "Extended Evening Hours", "Walk to EPCOT/HS"], pool: "Stormalong Bay", dining: "Multiple restaurants", walkTo: "EPCOT & Hollywood Studios" },
            { name: "BoardWalk Inn", price: "$500-800", location: "EPCOT", transport: "Boat + Walk", perks: ["Early Entry", "Extended Evening Hours", "Walk to EPCOT/HS", "Entertainment district"], pool: "3 pools", dining: "Multiple restaurants", walkTo: "EPCOT & Hollywood Studios" },
            { name: "Riviera Resort", price: "$450-700", location: "EPCOT Area", transport: "Skyliner", perks: ["Early Entry", "Extended Evening Hours", "Skyliner to EPCOT/HS"], pool: "2 pools", dining: "Signature rooftop" }
        ]
    },

    // ========== PARTNER HOTELS (Early Entry Eligible) ==========
    partnerHotels: [
        { name: "Swan", price: "$300-500", brand: "Marriott Westin", perks: ["Early Entry", "Walk to EPCOT/HS", "Marriott points"], walkTo: "EPCOT & Hollywood Studios" },
        { name: "Dolphin", price: "$280-480", brand: "Marriott Sheraton", perks: ["Early Entry", "Walk to EPCOT/HS", "Marriott points"], walkTo: "EPCOT & Hollywood Studios" },
        { name: "Swan Reserve", price: "$350-600", brand: "Marriott Autograph", perks: ["Early Entry", "Walk to EPCOT/HS", "Adults-focused"], walkTo: "EPCOT & Hollywood Studios" },
        { name: "Shades of Green", price: "$150-250", brand: "Military only", perks: ["Early Entry", "Military exclusive", "Near Polynesian"], eligibility: "Military/Veterans only" },
        { name: "Four Seasons Orlando", price: "$800-1500", brand: "Four Seasons", perks: ["Early Entry", "Luxury", "Golf"], walkTo: null },
        { name: "Waldorf Astoria Orlando", price: "$400-700", brand: "Hilton", perks: ["Early Entry", "Golf", "Spa"], walkTo: null },
        { name: "Signia Bonnet Creek", price: "$250-450", brand: "Hilton", perks: ["Early Entry", "Lazy river", "Golf"], walkTo: null },
        { name: "Wyndham Bonnet Creek", price: "$180-300", brand: "Wyndham", perks: ["Early Entry", "Condo-style"], walkTo: null }
    ],

    // ========== DISNEY SPRINGS AREA (No Early Entry) ==========
    disneySpingsHotels: [
        { name: "Hilton Lake Buena Vista", price: "$150-250", shuttle: true, walkToSprings: true },
        { name: "Hilton Buena Vista Palace", price: "$180-280", shuttle: true, walkToSprings: true },
        { name: "DoubleTree Suites", price: "$180-280", shuttle: true, walkToSprings: true },
        { name: "B Resort & Spa", price: "$150-250", shuttle: true, walkToSprings: true },
        { name: "Wyndham Garden", price: "$120-200", shuttle: true, walkToSprings: false },
        { name: "Holiday Inn", price: "$130-220", shuttle: true, walkToSprings: false }
    ],

    // ========== PASSHOLDER DISCOUNTS ==========
    passholderDiscounts: {
        current: {
            maxDiscount: "30%",
            validDates: "Most nights through December 2025",
            bestDeals: ["Grand Floridian (25-30%)", "Yacht Club (25-30%)", "Coronado Springs (25-30%)"],
            booking: "disneyworld.disney.go.com/passholder-program/"
        },
        swanDolphin: {
            discount: "Up to 30%",
            code: "QWH",
            phone: "1-888-828-8850"
        },
        notes: [
            "AP must be presented at check-in",
            "Cannot combine with other discounts",
            "Limited rooms available",
            "Book early for best selection"
        ]
    },

    // ========== DVC RENTALS ==========
    dvcInfo: {
        whatIsIt: "Disney Vacation Club owners rent unused points to non-members",
        savings: "30-60% off rack rates",
        perks: ["Same room as DVC members", "Early Entry included", "Extended Evening Hours", "Free parking at parks"],
        avgPointCost: "$18-23 per point",
        trustedBrokers: [
            { name: "David's Vacation Club", url: "dvcrequest.com", fee: "$20-21/point" },
            { name: "DVC Rental Store", url: "dvcrentalstore.com", fee: "$19-22/point" }
        ],
        bookingWindow: "7-11 months in advance recommended",
        restrictions: "Non-refundable, limited availability"
    },

    // ========== AREAS/LOCATIONS ==========
    areas: {
        magicKingdom: {
            name: "Magic Kingdom Resort Area",
            description: "Closest to Magic Kingdom, monorail access",
            hotels: ["Grand Floridian", "Polynesian", "Contemporary", "Wilderness Lodge"],
            bestFor: "Magic Kingdom fans, luxury seekers"
        },
        epcot: {
            name: "EPCOT Resort Area",
            description: "Walk/boat to EPCOT & Hollywood Studios",
            hotels: ["Yacht Club", "Beach Club", "BoardWalk Inn", "Swan", "Dolphin", "Swan Reserve"],
            bestFor: "EPCOT/HS fans, foodies, adults"
        },
        skyliner: {
            name: "Skyliner Resorts",
            description: "Gondola access to EPCOT & Hollywood Studios",
            hotels: ["Caribbean Beach", "Pop Century", "Art of Animation", "Riviera"],
            bestFor: "Families, budget-conscious, unique transport"
        },
        animalKingdom: {
            name: "Animal Kingdom Area",
            description: "Near Animal Kingdom, savanna views available",
            hotels: ["Animal Kingdom Lodge", "Coronado Springs", "All-Star Movies/Music/Sports"],
            bestFor: "Animal lovers, convention attendees"
        },
        disneySprings: {
            name: "Disney Springs Area",
            description: "Near shopping/dining, often cheaper",
            hotels: ["Port Orleans Riverside", "Port Orleans French Quarter", "Various Good Neighbor hotels"],
            bestFor: "Shoppers, budget-conscious"
        }
    },

    // ========== QUICK FACTS ==========
    quickFacts: {
        earlyEntry: "30 minutes before park opens, all 4 parks",
        extendedEvening: "2 extra hours, select nights, Deluxe/DVC only",
        freeParking: "All Disney Resort guests",
        magicBands: "Not included, but compatible",
        transport: "Free buses to all parks/Disney Springs",
        dining: "Can book 60 days out (resort guests)"
    }
};

// ========== CONVERSATION STATE ==========
let conversationState = {
    stage: 'initial',
    context: {},
    questionCount: 0,
    lastTopic: null
};

// ========== CONVERSATION FLOWS ==========
const CONVERSATION_FLOWS = {
    // Passholder looking for hotel
    passholderHotel: {
        stages: ['dates', 'budget', 'area', 'amenities', 'results'],
        questions: {
            dates: "What dates are you looking at?",
            budget: "Budget per night? (Under $200 / $200-400 / $400+)",
            area: "Preferred area? (Magic Kingdom / EPCOT / Skyliner / Any)",
            amenities: "Must-haves? (Walk to park / Pool / Dining)"
        }
    },
    
    // General trip planning
    generalTrip: {
        stages: ['parks', 'dates', 'party', 'budget', 'results'],
        questions: {
            parks: "Which parks? (Disney / Universal / Both)",
            dates: "When are you visiting?",
            party: "How many adults and kids?",
            budget: "Overall trip budget?"
        }
    }
};

// ========== MAIN RESPONSE FUNCTION ==========
function getJavariResponse(message) {
    const lower = message.toLowerCase();
    
    // Detect intent and context
    const intent = detectIntent(lower);
    
    // Generate contextual response
    return generateResponse(intent, lower);
}

function detectIntent(message) {
    // Passholder hotel search
    if ((message.includes('passholder') || message.includes('annual pass') || message.includes('ap ')) && 
        (message.includes('hotel') || message.includes('stay') || message.includes('room'))) {
        return 'passholder_hotel';
    }
    
    // DVC questions
    if (message.includes('dvc') || message.includes('vacation club') || message.includes('rent points')) {
        return 'dvc_info';
    }
    
    // Budget focused
    if (message.includes('cheap') || message.includes('budget') || message.includes('save money') || message.includes('affordable')) {
        return 'budget_tips';
    }
    
    // Specific area
    if (message.includes('magic kingdom') || message.includes('epcot') || message.includes('hollywood') || 
        message.includes('animal kingdom') || message.includes('skyliner')) {
        return 'area_specific';
    }
    
    // Walk to park
    if (message.includes('walk') && message.includes('park')) {
        return 'walkable_hotels';
    }
    
    // Night count mentioned
    if (message.match(/\d+\s*(night|day)/)) {
        return 'specific_stay';
    }
    
    // Dates mentioned
    if (message.includes('january') || message.includes('february') || message.includes('march') || 
        message.includes('april') || message.includes('may') || message.includes('june') ||
        message.includes('july') || message.includes('august') || message.includes('september') ||
        message.includes('october') || message.includes('november') || message.includes('december')) {
        return 'date_specific';
    }
    
    // General greeting
    if (message.match(/^(hi|hello|hey|help)/)) {
        return 'greeting';
    }
    
    return 'general';
}

function generateResponse(intent, message) {
    switch(intent) {
        case 'passholder_hotel':
            return handlePassholderHotel(message);
        case 'dvc_info':
            return handleDVCQuestion(message);
        case 'budget_tips':
            return handleBudgetQuestion(message);
        case 'area_specific':
            return handleAreaQuestion(message);
        case 'walkable_hotels':
            return handleWalkableQuestion(message);
        case 'specific_stay':
            return handleSpecificStay(message);
        case 'greeting':
            return handleGreeting();
        default:
            return handleGeneral(message);
    }
}

// ========== INTENT HANDLERS ==========

function handlePassholderHotel(message) {
    // Check what info we already have
    const hasNights = message.match(/(\d+)\s*(night|day)/);
    const hasArea = message.includes('magic kingdom') || message.includes('epcot') || 
                    message.includes('skyliner') || message.includes('animal kingdom');
    
    if (!hasNights) {
        conversationState.stage = 'need_dates';
        return `🎫 Passholder hotel search! A few quick questions:

<b>How many nights?</b>

(APs currently get up to 30% off at most Disney resorts!)`;
    }
    
    if (!hasArea) {
        conversationState.stage = 'need_area';
        return `Got it! For your stay, which area works best?

• <b>Magic Kingdom</b> - Monorail resorts, walk to MK
• <b>EPCOT</b> - Walk to EPCOT & Hollywood Studios
• <b>Skyliner</b> - Gondola to EPCOT/HS, great value
• <b>Any area</b> - Show me best deals`;
    }
    
    // We have enough info, give recommendations
    return generatePassholderRecommendations(message);
}

function generatePassholderRecommendations(message) {
    const nights = message.match(/(\d+)\s*(night|day)/);
    const nightCount = nights ? parseInt(nights[1]) : 2;
    
    let area = 'any';
    if (message.includes('magic kingdom')) area = 'magicKingdom';
    else if (message.includes('epcot') || message.includes('boardwalk')) area = 'epcot';
    else if (message.includes('skyliner')) area = 'skyliner';
    
    let recommendations = `<b>🎫 AP Hotel Recommendations (${nightCount} nights):</b>\n\n`;
    
    if (area === 'epcot' || area === 'any') {
        recommendations += `<b>Walk to EPCOT/HS:</b>
• Swan/Dolphin - $280-450/night (30% AP discount!)
• Beach Club - $425-700/night (25% AP discount)

`;
    }
    
    if (area === 'magicKingdom' || area === 'any') {
        recommendations += `<b>Magic Kingdom Area:</b>
• Polynesian - $510-850/night (20% AP discount)
• Contemporary - $425-765/night (25% AP discount)

`;
    }
    
    if (area === 'skyliner' || area === 'any') {
        recommendations += `<b>Best Value (Skyliner):</b>
• Pop Century - $155-210/night (25% AP discount)
• Caribbean Beach - $210-295/night (25% AP discount)

`;
    }
    
    recommendations += `💡 <b>Pro tip:</b> Swan/Dolphin accepts AP discount AND Marriott points!

Want me to check DVC rentals? Often 40%+ savings vs direct booking.`;
    
    return recommendations;
}

function handleDVCQuestion(message) {
    return `<b>💎 DVC Rentals Explained:</b>

Disney Vacation Club owners rent unused points to guests like you.

<b>What you get:</b>
• Same deluxe villa rooms
• Early Entry + Extended Evening Hours
• Free parking at parks
• 30-60% off rack rates

<b>Example savings:</b>
Grand Floridian Studio: $789/night direct → $441/night DVC = <b>44% savings!</b>

<b>Trusted brokers:</b>
• David's Vacation Club ($20-21/point)
• DVC Rental Store ($19-22/point)

Book 7-11 months ahead for best availability.

→ <a href="/dvc">Calculate your savings</a>`;
}

function handleBudgetQuestion(message) {
    return `<b>💰 Best Ways to Save:</b>

<b>1. DVC Rentals</b> - Save 30-60% on Deluxe resorts
   Grand Floridian for ~$441/night instead of $789!

<b>2. Value Resorts</b> - From $130/night
   Pop Century has Skyliner access!

<b>3. Swan/Dolphin</b> - From $250/night
   Walk to EPCOT, use Marriott points

<b>4. Off-season</b> - January, September cheapest

<b>5. AP Discounts</b> - Up to 30% off room rates

Which interests you most? I can give specifics.`;
}

function handleAreaQuestion(message) {
    let area = null;
    if (message.includes('magic kingdom')) area = 'magicKingdom';
    else if (message.includes('epcot')) area = 'epcot';
    else if (message.includes('skyliner')) area = 'skyliner';
    else if (message.includes('animal kingdom')) area = 'animalKingdom';
    
    const areaInfo = JAVARI_KNOWLEDGE.areas[area];
    
    if (areaInfo) {
        return `<b>🏨 ${areaInfo.name}:</b>

${areaInfo.description}

<b>Hotels:</b> ${areaInfo.hotels.join(', ')}

<b>Best for:</b> ${areaInfo.bestFor}

Are you an Annual Passholder? I can check for discounts.`;
    }
    
    return handleGeneral(message);
}

function handleWalkableQuestion(message) {
    return `<b>🚶 Hotels within Walking Distance:</b>

<b>Walk to Magic Kingdom:</b>
• Grand Floridian (5 min)
• Contemporary (10 min)

<b>Walk to EPCOT & Hollywood Studios:</b>
• Beach Club (5 min to EPCOT)
• Yacht Club (7 min to EPCOT)
• BoardWalk Inn (5 min to EPCOT)
• Swan & Dolphin (10 min to EPCOT)

<b>Budget pick:</b> Swan/Dolphin from $250/night
<b>Luxury pick:</b> Beach Club from $500/night

Do you prefer EPCOT area or Magic Kingdom area?`;
}

function handleSpecificStay(message) {
    const nights = message.match(/(\d+)\s*(night|day)/);
    const nightCount = nights ? parseInt(nights[1]) : 2;
    
    return `<b>📅 ${nightCount}-Night Stay Options:</b>

Quick questions to find your perfect fit:

1. <b>Passholder?</b> (Up to 30% off)
2. <b>Budget?</b> (Under $200 / $200-400 / $400+)
3. <b>Priority?</b> (Walk to park / Best pool / Best value)

Or tell me more about what you're looking for!`;
}

function handleGreeting() {
    return `Hey! 👋 I'm Javari, your Orlando trip planner.

Quick question - what are you planning?

• <b>Hotel only</b> (passholder trip)
• <b>Full vacation</b> (hotel + tickets)
• <b>Just exploring</b> deals

What sounds right?`;
}

function handleGeneral(message) {
    // Check for any keywords we can help with
    if (message.includes('hotel') || message.includes('stay') || message.includes('resort')) {
        return `I can help you find the perfect hotel! Quick questions:

1. <b>Dates?</b>
2. <b>Budget per night?</b>
3. <b>Passholder?</b> (for discounts)

Or just tell me what you're looking for!`;
    }
    
    if (message.includes('ticket') || message.includes('pass')) {
        return `<b>🎫 Ticket Options:</b>

• <b>Disney:</b> 1-day from $109, multi-day better value
• <b>Universal:</b> Buy 3 days, get 2 FREE right now!
• <b>SeaWorld:</b> Fun Card $49.99 (unlimited 2025)

Are you looking at one park or multiple?`;
    }
    
    // Default helpful response
    return `I can help you with:

• <b>Hotels</b> - Disney, partner hotels, off-site
• <b>Deals</b> - Current discounts & promos
• <b>DVC</b> - Save 30-60% on Deluxe resorts
• <b>Passholder perks</b> - Maximize your AP

What would you like to explore?`;
}

// Export for use
if (typeof module !== 'undefined') {
    module.exports = { getJavariResponse, JAVARI_KNOWLEDGE };
}
