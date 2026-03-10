import imgMusic from '../assets/images/event-music.png';
import imgTech from '../assets/images/event-tech.png';
import imgFood from '../assets/images/event-food.png';
import imgArt from '../assets/images/event-art.png';
import imgJazz from '../assets/images/event-jazz.png';
import imgStartup from '../assets/images/event-startup.png';

export const MOCK_EVENTS = {
    1: {
        id: 1, category: 'Music', accentColor: '#7C3AED', accentLight: '#EDE9FE',
        image: imgMusic,
        galleryImages: [
            imgMusic,
            'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=1200'
        ],
        title: 'Summer Music Festival 2026',
        organizer: 'Big Beat Productions',
        location: 'Central Park, New York, NY 10024',
        event_date: '2026-07-15T18:00:00',
        ticket_price: 120, total_tickets: 5000, tickets_sold: 4200,
        description: `Get ready for the biggest music event of the summer! Featuring top artists from around the globe across three stages. Experience incredible live performances, local food vendors, and a vibrant community atmosphere that will keep you dancing until sunset.\n\nThis year, we've expanded our VIP area and added more interactive art installations throughout the festival grounds. Whether you're a long-time fan or a first-timer, this is the event of the year.`,
        highlights: ['3 Live Stages', '40+ Artists', 'Food Village', 'Art Installations', 'VIP Lounge'],
        schedule: [
            { time: '4:00 PM', act: 'Gates Open' },
            { time: '5:00 PM', act: 'Opening Act — The Waves' },
            { time: '7:00 PM', act: 'Main Stage — Neon Pulse' },
            { time: '9:30 PM', act: 'Headliner — Aurora Sky' },
        ],
        tags: ['Outdoor', 'All Ages', 'Food Stalls', 'Merchandise'],
    },
    2: {
        id: 2, category: 'Tech', accentColor: '#2563EB', accentLight: '#DBEAFE',
        image: imgTech,
        galleryImages: [
            imgTech,
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200'
        ],
        title: 'Tech Innovators Conference',
        organizer: 'FutureLab Events',
        location: 'Moscone Center, San Francisco, CA',
        event_date: '2026-09-22T09:00:00',
        ticket_price: 250, total_tickets: 1200, tickets_sold: 850,
        description: `Explore the future of AI, robotics, and biotechnology with industry leaders and visionaries. The Tech Innovators Conference brings together the brightest minds shaping tomorrow, offering deep-dive workshops, headline keynotes, and curated networking sessions.\n\nExpect exclusive product reveals, live demos from frontier startups, and panel discussions that challenge conventional thinking. This isn't just a conference — it's where the future is written.`,
        highlights: ['50+ Speakers', 'Live Demos', 'Startup Pitches', 'Networking Dinner', 'Workshops'],
        schedule: [
            { time: '9:00 AM', act: 'Registration & Breakfast' },
            { time: '10:00 AM', act: 'Keynote — The AI Decade' },
            { time: '1:00 PM', act: 'Panel: Robotics & Society' },
            { time: '4:00 PM', act: 'Startup Demo Showcase' },
            { time: '7:00 PM', act: 'Networking Dinner & Awards' },
        ],
        tags: ['Professional', 'Networking', 'Workshop', 'Indoor'],
    },
    3: {
        id: 3, category: 'Food', accentColor: '#D97706', accentLight: '#FEF3C7',
        image: imgFood,
        galleryImages: [
            imgFood,
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200'
        ],
        title: 'Culinary Arts Expo 2026',
        organizer: 'Savor Events Co.',
        location: 'Bayside Convention Hall, Miami, FL',
        event_date: '2026-05-30T10:00:00',
        ticket_price: 75, total_tickets: 800, tickets_sold: 640,
        description: `A taste adventure featuring world-class chefs, wine tasting, and interactive cooking workshops. The Culinary Arts Expo is a celebration of global flavours, bringing together Michelin-starred talent and passionate home cooks under one roof.\n\nSample dishes from 20+ cuisines, attend live technique masterclasses, and meet the chefs behind the plates. Pair everything with an expertly curated wine and cocktail selection — it's an experience for every sense.`,
        highlights: ['20+ Cuisines', 'Wine Pairing', 'Live Cookoffs', 'Masterclasses', 'Meet the Chefs'],
        schedule: [
            { time: '10:00 AM', act: 'Doors Open & Tasting Begins' },
            { time: '11:30 AM', act: 'Masterclass: French Technique' },
            { time: '1:00 PM', act: 'Live Cook-Off: Farm to Table' },
            { time: '3:30 PM', act: 'Wine & Dessert Pairing Session' },
        ],
        tags: ['Family Friendly', 'Indoor', 'Tasting', '18+ for Wine'],
    },
    4: {
        id: 4, category: 'Art', accentColor: '#059669', accentLight: '#D1FAE5',
        image: imgArt,
        galleryImages: [imgArt],
        title: 'Street Art Workshop',
        organizer: 'Urban Canvas Collective',
        location: 'Dumbo Arts District, Brooklyn, NY',
        event_date: '2026-06-10T11:00:00',
        ticket_price: 45, total_tickets: 100, tickets_sold: 88,
        description: `Learn the basics of graffiti and mural techniques from renowned urban artists in an open-air studio setting. This immersive workshop is designed for all skill levels — from curious beginners to aspiring muralists ready to find their style.\n\nParticipants will work with professional-grade spray paint and mixed media on 4×8 ft panels, guided step-by-step by artists who have painted cities across the world. Walk away with your finished piece and some real street cred.`,
        highlights: ['All Skill Levels', 'Materials Provided', 'Take Home Your Art', 'Outdoor Studio', 'Certification'],
        schedule: [
            { time: '11:00 AM', act: 'Introduction & Safety Briefing' },
            { time: '11:30 AM', act: 'Technique Demos by Artists' },
            { time: '12:30 PM', act: 'Open Studio — Create Your Piece' },
            { time: '3:00 PM', act: 'Gallery Walk & Group Photo' },
        ],
        tags: ['Workshop', 'Outdoor', 'All Ages', 'Materials Included'],
    },
};
