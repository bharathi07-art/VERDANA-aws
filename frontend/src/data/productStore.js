// src/data/productStore.js

export const INITIAL_PRODUCTS = [
  {
    id: "luminous-matte-combo",
    name: "Luminous Matte Foundation & Strobe Cream Combo",
    category: "Skin Care",
    subCategory: "Moisturizer",
    brand: "FACES CANADA",
    price: 34.99,
    Ratings: 4.8,
    reviewCount: 142,
    image: "/cos1.jpg",
    gallery: ["/cos1.jpg", "/cos2.jpg", "/cos3.jpg"],
    discription:
      "A complete skin-brightening kit featuring Strobe Cream in Rose Gold, Weightless Stay Matte Compact Powder, and Hydra Matte Foundation (Rose Ivory). Delivers up to 10 hours of breathable wear with natural luminescence.",
    amazonAffiliateUrl: "https://www.amazon.in/dp/B0EXAMPLE1?tag=verdana-21",
    featured: true,
    bestFor: ["Normal to Dry Skin", "Dull Skin", "Special Occasions"],
    pros: [
      "Lightweight 10-hour stay",
      "Hydrating botanical extract infusion",
      "Cruelty-free & dermatologically tested",
      "Non-comedogenic formula"
    ],
    cons: [
      "Limited shade range for very deep complexions",
      "Slightly scented formula"
    ],
    ingredients: "Aqua, Niacinamide, Squalane, Hyaluronic Acid, Titanium Dioxide, Vitamin E, Botanical Extract Blend.",
    ratingsBreakdown: {
      5: 75,
      4: 18,
      3: 4,
      2: 2,
      1: 1
    },
    userReviews: [
      {
        id: "rev-1",
        author: "Priya S.",
        title: "Obsessed with the glow!",
        rating: 5,
        date: "2026-07-28",
        verified: true,
        comment: "The strobe cream creates a subtle candlelight glow underneath the foundation. Absolutely standard for my daily office look!"
      },
      {
        id: "rev-2",
        author: "Ananya M.",
        title: "Great coverage, feels weightless",
        rating: 4.5,
        date: "2026-07-15",
        verified: true,
        comment: "Does not feel heavy even in hot weather. Highly recommended for combo skin."
      }
    ]
  },
  {
    id: "botanical-clay-mask",
    name: "Purifying French Green Clay Detox Mask",
    category: "Skin Care",
    subCategory: "Cleanser",
    brand: "Verdana Essentials",
    price: 22.50,
    Ratings: 4.9,
    reviewCount: 98,
    image: "/cos2.jpg",
    gallery: ["/cos2.jpg", "/cos4.jpg"],
    discription:
      "Formulated with mineral-rich French green clay, organic tea tree leaf extract, and aloe vera. Gently draws out pore impurities, reduces excess sebum, and minimizes texture without stripping skin moisture.",
    amazonAffiliateUrl: "https://www.amazon.in/dp/B0EXAMPLE2?tag=verdana-21",
    featured: true,
    bestFor: ["Oily Skin", "Acne-Prone Skin", "Clogged Pores"],
    pros: [
      "Noticeably reduces blackheads in 2 weeks",
      "Cooling aloe vera calms irritation",
      "Free of synthetic fragrance & parabens",
      "Eco-friendly recyclable glass container"
    ],
    cons: [
      "Dries relatively quickly (use misting bottle)",
      "Clay scent is earthy"
    ],
    ingredients: "Kaolin, Illite (French Green Clay), Organic Aloe Barbadensis Leaf Juice, Melaleuca Alternifolia (Tea Tree) Oil, Glycerin.",
    ratingsBreakdown: {
      5: 82,
      4: 12,
      3: 4,
      2: 1,
      1: 1
    },
    userReviews: [
      {
        id: "rev-3",
        author: "Rohan V.",
        title: "Clears breakout redness overnight",
        rating: 5,
        date: "2026-08-01",
        verified: true,
        comment: "My go-to weekly pore purge! Skin feels silky smooth afterwards."
      }
    ]
  },
  {
    id: "hyaluronic-hydration-serum",
    name: "Triple-Weight Hyaluronic Acid Hydrating Serum",
    category: "Skin Care",
    subCategory: "Serum",
    brand: "BioGlow Botanicals",
    price: 29.00,
    Ratings: 4.7,
    reviewCount: 215,
    image: "/cos3.jpg",
    gallery: ["/cos3.jpg", "/cos1.jpg"],
    discription:
      "Deep moisture infusion featuring three micro-molecular weights of pure Hyaluronic Acid combined with Vitamin B5. Plumps fine lines and instantly restores radiance.",
    amazonAffiliateUrl: "https://www.amazon.in/dp/B0EXAMPLE3?tag=verdana-21",
    featured: false,
    bestFor: ["Dehydrated Skin", "Sensitive Skin", "Anti-Aging"],
    pros: [
      "Penetrates deep into sub-dermal layers",
      "Zero sticky residue after absorption",
      "Pairs seamlessly under sunscreen & makeup",
      "Fragrance-free formula"
    ],
    cons: [
      "Glass dropper needs careful handling"
    ],
    ingredients: "Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Panthenol (Pro-Vitamin B5), Pentylene Glycol, Centella Asiatica Extract.",
    ratingsBreakdown: {
      5: 70,
      4: 22,
      3: 5,
      2: 2,
      1: 1
    },
    userReviews: [
      {
        id: "rev-4",
        author: "Meera K.",
        title: "A hydration gamechanger!",
        rating: 5,
        date: "2026-07-20",
        verified: true,
        comment: "Replaced my high-end designer serum with this. Performs even better!"
      }
    ]
  },
  {
    id: "rosehip-revitalizing-hair-oil",
    name: "Cold-Pressed Rosehip & Argan Nourishing Hair Oil",
    category: "Hair Care",
    subCategory: "Hair Oil",
    brand: "NectarRoots",
    price: 26.00,
    Ratings: 4.6,
    reviewCount: 84,
    image: "/cos4.jpg",
    gallery: ["/cos4.jpg", "/cos2.jpg"],
    discription:
      "Pure organic cold-pressed oil blend designed to repair damaged hair cuticles, seal split ends, and add glass-like shine without heavy grease build-up.",
    amazonAffiliateUrl: "https://www.amazon.in/dp/B0EXAMPLE4?tag=verdana-21",
    featured: false,
    bestFor: ["Frizzy Hair", "Dry Scalp", "Color-Treated Hair"],
    pros: [
      "Seals cuticle layers against humidity",
      "Enriched with natural Vitamin C & Omega 3-6-9",
      "Multi-use for scalp massage or tip smoothing",
      "Subtle natural floral fragrance"
    ],
    cons: [
      "A little goes a long way — overuse can weigh down fine hair"
    ],
    ingredients: "Rosa Canina (Rosehip) Seed Oil, Argania Spinosa (Argan) Kernel Oil, Simmondsia Chinensis (Jojoba) Oil, Tocopherol.",
    ratingsBreakdown: {
      5: 65,
      4: 25,
      3: 6,
      2: 3,
      1: 1
    },
    userReviews: [
      {
        id: "rev-5",
        author: "Kavya N.",
        title: "Bye bye frizz!",
        rating: 5,
        date: "2026-07-30",
        verified: true,
        comment: "Keeps my unruly curls soft and shiny even in high humidity."
      }
    ]
  },
  {
    id: "velvet-matte-lipstick-rose",
    name: "Velvet Silk Clean Matte Lipstick - Desert Rose",
    category: "Makeup",
    subCategory: "Lipstick",
    brand: "LuxeFlora Cosmetics",
    price: 19.99,
    Ratings: 4.8,
    reviewCount: 160,
    image: "/cos1.jpg",
    gallery: ["/cos1.jpg", "/cos3.jpg"],
    discription:
      "A long-wearing clean lipstick loaded with organic shea butter and jojoba esters. Delivers rich nude-rose pigmentation with a comfortable matte finish.",
    amazonAffiliateUrl: "https://www.amazon.in/dp/B0EXAMPLE5?tag=verdana-21",
    featured: true,
    bestFor: ["Daily Wear", "Sensitive Lips", "All Skin Tones"],
    pros: [
      "Hydrating non-drying matte texture",
      "Lead-free and heavy-metal tested",
      "Single-swipe full opacity pigment"
    ],
    cons: [
      "Requires slight touch-up after oily meals"
    ],
    ingredients: "Ricinus Communis (Castor) Seed Oil, Butyrospermum Parkii (Shea Butter), Candelilla Wax, Tocopherol, Natural Mica Iron Oxides.",
    ratingsBreakdown: {
      5: 80,
      4: 15,
      3: 3,
      2: 1,
      1: 1
    },
    userReviews: [
      {
        id: "rev-6",
        author: "Divya T.",
        title: "The perfect everyday rose nude",
        rating: 5,
        date: "2026-08-03",
        verified: true,
        comment: "Super comfortable on lips. Doesn't crack or dry out."
      }
    ]
  },
  {
    id: "keratin-strength-nail-hardener",
    name: "Botanical Keratin & Calcium Fortifying Nail Hardener",
    category: "Nail and cuticle products",
    subCategory: "Nail care / nail hardener products",
    brand: "NailVerd",
    price: 15.50,
    Ratings: 4.5,
    reviewCount: 62,
    image: "/cos2.jpg",
    gallery: ["/cos2.jpg"],
    discription:
      "Strengthens brittle, peeling nails in 14 days. Infused with plant keratin, biotin, and horsetail extract to build nail resilience.",
    amazonAffiliateUrl: "https://www.amazon.in/dp/B0EXAMPLE6?tag=verdana-21",
    featured: false,
    bestFor: ["Weak Brittle Nails", "Post-Gel Recovery"],
    pros: [
      "10-Free toxin-free formulation",
      "Quick drying clear gloss sheen",
      "Visible reduction in nail splitting"
    ],
    cons: [
      "Re-application required every 3-4 days for top results"
    ],
    ingredients: "Ethyl Acetate, Butyl Acetate, Nitrocellulose, Biotin, Plant Hydrolyzed Keratin, Equisetum Arvense (Horsetail) Extract.",
    ratingsBreakdown: {
      5: 60,
      4: 25,
      3: 10,
      2: 3,
      1: 2
    },
    userReviews: []
  },
  {
    id: "organic-mint-mouthwash",
    name: "Activated Charcoal & Peppermint Alcohol-Free Mouthwash",
    category: " Oral hygiene products",
    subCategory: " Mouth wash / breath spray",
    brand: "PureSmile Earth",
    price: 12.99,
    Ratings: 4.7,
    reviewCount: 110,
    image: "/cos3.jpg",
    gallery: ["/cos3.jpg"],
    discription:
      "Refreshing alcohol-free oral rinse formulated with coconut activated charcoal, organic peppermint, and xylitol to combat breath odor naturally.",
    amazonAffiliateUrl: "https://www.amazon.in/dp/B0EXAMPLE7?tag=verdana-21",
    featured: false,
    bestFor: ["Sensitive Gums", "Fresh Breath", "Zero Alcohol Burning"],
    pros: [
      "No alcohol burn or harsh sting",
      "Xylitol promotes healthy enamel re-mineralization",
      "100% natural mint flavor"
    ],
    cons: [
      "Slight dark rinse color due to natural charcoal"
    ],
    ingredients: "Water, Glycerin, Xylitol, Mentha Piperita (Peppermint) Oil, Activated Coconut Charcoal, Aloe Vera Juice.",
    ratingsBreakdown: {
      5: 72,
      4: 20,
      3: 5,
      2: 2,
      1: 1
    },
    userReviews: []
  },
  {
    id: "mineral-sunscreen-spf50",
    name: "Invisible Sheer Mineral Sunscreen SPF 50 PA++++",
    category: "Skin Care",
    subCategory: "Sunscreen",
    brand: "Verdana Essentials",
    price: 28.00,
    Ratings: 4.9,
    reviewCount: 310,
    image: "/cos4.jpg",
    gallery: ["/cos4.jpg", "/cos1.jpg"],
    discription:
      "Non-nano zinc oxide broad spectrum sunscreen that blends clear on all skin tones with zero white cast. Water-resistant for up to 80 minutes.",
    amazonAffiliateUrl: "https://www.amazon.in/dp/B0EXAMPLE8?tag=verdana-21",
    featured: true,
    bestFor: ["All Skin Types", "Reef Safe", "Under Makeup Wear"],
    pros: [
      "Zero white cast on dark and olive complexions",
      "Reef-safe non-nano Mineral protection",
      "Dewy weightless finish with antioxidant Vitamin E"
    ],
    cons: [
      "Must re-apply every 2 hours during direct sun exposure"
    ],
    ingredients: "Zinc Oxide 18.5%, Water, Caprylic/Capric Triglyceride, Squalane, Polyhydroxystearic Acid, Tocopherol.",
    ratingsBreakdown: {
      5: 88,
      4: 8,
      3: 2,
      2: 1,
      1: 1
    },
    userReviews: []
  }
];

const STORAGE_KEY = "verdana_products_store";
const BOOKMARKS_KEY = "verdana_bookmarked_products";

export function getStoredProducts() {
  const local = localStorage.getItem(STORAGE_KEY);
  if (!local) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  try {
    return JSON.parse(local);
  } catch (e) {
    console.error("Failed to parse stored products", e);
    return INITIAL_PRODUCTS;
  }
}

export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function getProductById(id) {
  const products = getStoredProducts();
  return products.find((p) => String(p.id) === String(id)) || null;
}

export function addProduct(newProduct) {
  const products = getStoredProducts();
  const id = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
  const productToAdd = {
    id,
    Ratings: Number(newProduct.Ratings) || 5,
    reviewCount: 1,
    gallery: [newProduct.image || "/cos1.jpg"],
    bestFor: newProduct.bestFor || [],
    pros: newProduct.pros || [],
    cons: newProduct.cons || [],
    ratingsBreakdown: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 },
    userReviews: [],
    ...newProduct
  };
  products.unshift(productToAdd);
  saveProducts(products);
  return productToAdd;
}

export function updateProduct(id, updatedFields) {
  const products = getStoredProducts();
  const index = products.findIndex((p) => String(p.id) === String(id));
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedFields };
    saveProducts(products);
    return products[index];
  }
  return null;
}

export function deleteProduct(id) {
  const products = getStoredProducts();
  const filtered = products.filter((p) => String(p.id) !== String(id));
  saveProducts(filtered);
  return filtered;
}

export function addReviewToProduct(productId, reviewData) {
  const products = getStoredProducts();
  const index = products.findIndex((p) => String(p.id) === String(productId));
  if (index !== -1) {
    const product = products[index];
    const newRev = {
      id: "rev-" + Date.now(),
      author: reviewData.author || "Anonymous Reader",
      title: reviewData.title || "User Review",
      rating: Number(reviewData.rating) || 5,
      date: new Date().toISOString().split("T")[0],
      verified: true,
      comment: reviewData.comment
    };
    product.userReviews = product.userReviews || [];
    product.userReviews.unshift(newRev);

    // Recalculate average rating & counts
    const totalReviews = product.userReviews.length;
    const sumRatings = product.userReviews.reduce((acc, r) => acc + r.rating, 0);
    product.Ratings = Number((sumRatings / totalReviews).toFixed(1));
    product.reviewCount = totalReviews;

    // Update breakdown
    const rounded = Math.round(newRev.rating);
    product.ratingsBreakdown = product.ratingsBreakdown || { 5: 80, 4: 15, 3: 3, 2: 1, 1: 1 };
    product.ratingsBreakdown[rounded] = (product.ratingsBreakdown[rounded] || 0) + 10;

    saveProducts(products);
    return product;
  }
  return null;
}

export function getBookmarks() {
  const local = localStorage.getItem(BOOKMARKS_KEY);
  if (!local) return [];
  try {
    return JSON.parse(local);
  } catch (e) {
    return [];
  }
}

export function toggleBookmark(productId) {
  let bookmarks = getBookmarks();
  if (bookmarks.includes(productId)) {
    bookmarks = bookmarks.filter((id) => id !== productId);
  } else {
    bookmarks.push(productId);
  }
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  return bookmarks;
}
