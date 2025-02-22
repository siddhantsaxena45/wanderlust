const sampleListings = [
  {
    title: "Lakeside A-Frame Cabin",
    description:
      "Relax in this stunning A-frame cabin with breathtaking lake views, cozy interiors, and outdoor firepit.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1300,
    location: "Lake District",
    country: "United Kingdom",
    category: "Mountains",
    geometry: {
      type: "Point",
      coordinates: [-3.0886, 54.4609],
    },
  },
  {
    title: "Bohemian Beach Hut",
    description:
      "A rustic, colorful beach hut just steps away from the turquoise waters. Perfect for a boho retreat.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 950,
    location: "Goa",
    country: "India",
    category: "Camping",
    geometry: {
      type: "Point",
      coordinates: [73.8567, 15.2993],
    },
  },
  {
    title: "Luxury Glass Dome in the Alps",
    description:
      "Sleep under the stars in a high-end glass dome surrounded by the majestic Swiss Alps.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 5000,
    location: "Zermatt",
    country: "Switzerland",
    category: "Trending",
    geometry: {
      type: "Point",
      coordinates: [7.7491, 46.0207],
    },
  },
  {
    title: "Japanese Ryokan with Onsen",
    description:
      "Traditional Japanese inn featuring tatami mats, sliding doors, and a private hot spring bath.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Kyoto",
    country: "Japan",
    category: "Iconic cities",
    geometry: {
      type: "Point",
      coordinates: [135.7681, 35.0116],
    },
  },
  {
    title: "Secluded Jungle Treehouse",
    description:
      "Elevated among lush greenery, this treehouse offers serenity and adventure in equal measure.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Bali",
    country: "Indonesia",
    category: "Farm",
    geometry: {
      type: "Point",
      coordinates: [115.1889, -8.4095],
    },
  },
  {
    title: "Desert Oasis Glamping Tent",
    description:
      "Experience the magic of the desert in a luxurious glamping tent with modern comforts and breathtaking views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1400,
    location: "Dubai",
    country: "UAE",
    category: "Camping",
    geometry: {
      type: "Point",
      coordinates: [55.2708, 25.2048],
    },
  },
  {
    title: "Floating Overwater Bungalow",
    description:
      "Stay in a private overwater bungalow with crystal-clear waters right at your doorstep.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 6000,
    location: "Bora Bora",
    country: "French Polynesia",
    category: "Rooms",
    geometry: {
      type: "Point",
      coordinates: [-151.7415, -16.5004],
    },
  },
];

module.exports = sampleListings;