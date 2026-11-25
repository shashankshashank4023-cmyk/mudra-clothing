export const products = [
  // ================= FORMAL WEAR =================
  {
    id: "formal-01",
    name: "The Royal Midnight Raw Silk Bandhgala",
    collection: "formal",
    subCategory: "Bandhgalas",
    price: 18500,
    originalPrice: 22000,
    rating: 4.9,
    reviewCount: 48,
    badge: "Bespoke Heritage",
    inStock: true,
    colors: [
      { name: "Midnight Navy", hex: "#0f172a" },
      { name: "Obsidian Black", hex: "#18181b" },
      { name: "Royal Emerald", hex: "#064e3b" }
    ],
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)", "46 (XXL)"],
    images: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Master-crafted raw Matka silk bandhgala jacket featuring hand-carved brass monogrammed buttons.",
    description: "An homage to regal heritage reinterpreted for the modern connoisseur. Tailored from handspun raw Matka silk, this structured bandhgala features an immaculate high mandarin collar, horsehair-canvassed chest for bespoke drape, and custom antiqued brass buttons with discreet Mudra insignia.",
    fabricDetails: "100% Handwoven Bhagalpuri Raw Matka Silk shell; Pure Cupro Japanese Bemberg lining for temperature regulation.",
    craftsmanship: "Individually hand-cut by master tailors with over 18 hours of bespoke hand-stitching along the lapels and buttonholes.",
    fitGuide: "Structured Tailored Fit. Structured shoulders with a clean taper toward the waist.",
    careInstructions: "Dry clean only by luxury textile specialists. Store in breathable cotton garment bag provided.",
    pairedWith: ["formal-03", "formal-04"]
  },
  {
    id: "formal-02",
    name: "Super 150s Merino Wool Double-Breasted Suit",
    collection: "formal",
    subCategory: "Suits & Tuxedos",
    price: 32000,
    originalPrice: 38000,
    rating: 5.0,
    reviewCount: 34,
    badge: "Limited Sartorial",
    inStock: true,
    colors: [
      { name: "Charcoal Melange", hex: "#334155" },
      { name: "Espresso Brown", hex: "#3e2723" }
    ],
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)", "46 (XXL)"],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Italian Biella milled Super 150s wool 6x2 double-breasted suit with peak lapels and horn buttons.",
    description: "Crafted from whisper-soft Super 150s Australian Merino wool milled in Biella, Italy. The jacket boasts a commanding 6x2 silhouette with sweeping peak lapels, roped shoulder expression, and genuine buffalo horn buttons. Accompanied by flat-front side-adjuster trousers.",
    fabricDetails: "Super 150s Virgin Merino Wool (260 gsm all-season weight); full canvas floating construction.",
    craftsmanship: "Full canvas construction ensures the suit molds organically to the wearer's physique over time.",
    fitGuide: "Classic Savile Row silhouette with high armholes and a subtle drop 7 waist taper.",
    careInstructions: "Steam press only. Dry clean once per season or after intensive wear.",
    pairedWith: ["formal-05"]
  },
  {
    id: "formal-03",
    name: "Giza 87 Egyptian Cotton Pleated Tuxedo Shirt",
    collection: "formal",
    subCategory: "Shirts",
    price: 6800,
    originalPrice: 8200,
    rating: 4.8,
    reviewCount: 62,
    badge: "Black Tie Essential",
    inStock: true,
    colors: [
      { name: "Pure Chalk White", hex: "#f8fafc" },
      { name: "Pale Ivory", hex: "#fef3c7" }
    ],
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)"],
    images: [
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Ultra-fine 200/2 ply Egyptian Giza cotton formal shirt with hand-pleated bib and French cuffs.",
    description: "The quintessential formal dress shirt. Woven from long-staple Giza 87 Egyptian cotton yarns yielding an exquisite silk-like sheen and breathability. Features removable mother-of-pearl stud closures, French cuffs, and a semi-spread spread collar designed to cradle both bow ties and Windsor knots.",
    fabricDetails: "100% Giza 87 Long-Staple Egyptian Cotton (200/2 two-ply yarn); Australian Mother-of-Pearl buttons.",
    craftsmanship: "24 stitches per inch single-needle tailoring with reinforced gusset seams.",
    fitGuide: "Slim Contemporary Cut with rear darts for a sculpted silhouette underneath dinner jackets.",
    careInstructions: "Machine wash cold delicate; warm iron when slightly damp or professional press.",
    pairedWith: ["formal-02", "formal-01"]
  },
  {
    id: "formal-04",
    name: "Heritage Jodhpuri Trousers with Silk Side-Stripes",
    collection: "formal",
    subCategory: "Trousers",
    price: 8500,
    originalPrice: 9900,
    rating: 4.9,
    reviewCount: 29,
    badge: "Signature Cut",
    inStock: true,
    colors: [
      { name: "Deep Charcoal", hex: "#1e293b" },
      { name: "Jet Black", hex: "#0a0a0a" },
      { name: "Camel Ecru", hex: "#d4a373" }
    ],
    sizes: ["30", "32", "34", "36", "38"],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Wool-cashmere blend formal trousers with satin grosgrain side braiding and side adjusters.",
    description: "Refined formal trousers designed without belt loops for an unbroken waistline. Constructed with brass side buckles, deep pleats for freedom of movement, and grosgrain silk piping down each lateral seam.",
    fabricDetails: "90% Worsted Wool, 10% Cashmere; silk satin lateral side stripes.",
    craftsmanship: "Blind-stitched hems with curtain waistband to keep shirts permanently tucked.",
    fitGuide: "High-waisted tapered silhouette with a generous thigh and razor-sharp cuff opening.",
    careInstructions: "Specialist dry clean only.",
    pairedWith: ["formal-01", "formal-03"]
  },
  {
    id: "formal-05",
    name: "Monochrome Velvet Shawl Collar Dinner Jacket",
    collection: "formal",
    subCategory: "Suits & Tuxedos",
    price: 24500,
    originalPrice: 28000,
    rating: 5.0,
    reviewCount: 41,
    badge: "Red Carpet Collection",
    inStock: true,
    colors: [
      { name: "Burgundy Wine", hex: "#4a0404" },
      { name: "Royal Prussian Blue", hex: "#0c2340" },
      { name: "Onyx Black", hex: "#111111" }
    ],
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)"],
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Italian cotton velvet tuxedo blazer with duchess satin shawl collar and piped jetted pockets.",
    description: "Understated opulence for black-tie galas and evening celebrations. Crafted in rich, lustrous Italian cotton velvet that catches ambient light with a deep multidimensional hue. Accented with pure silk duchess satin shawl lapels and silk-covered buttons.",
    fabricDetails: "Italian Cotton Velvet (380 gsm); 100% Silk Duchess Satin lapel and pocket facing.",
    craftsmanship: "Hand-rolled canvas chest piece and handcrafted jetted pockets with zero outer flap bulk.",
    fitGuide: "Tailored evening fit. Cut slightly shorter in length to accentuate modern proportions.",
    careInstructions: "Specialist velvet dry cleaning. Never apply direct iron to pile.",
    pairedWith: ["formal-03", "formal-04"]
  },
  {
    id: "formal-06",
    name: "Pinstripe Superfine Wool Executive Blazer",
    collection: "formal",
    subCategory: "Suits & Tuxedos",
    price: 19800,
    originalPrice: 23500,
    rating: 4.7,
    reviewCount: 38,
    badge: "Boardroom Icon",
    inStock: true,
    colors: [
      { name: "Navy Chalkstripe", hex: "#172554" },
      { name: "Slate Grey Stripe", hex: "#475569" }
    ],
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)", "46 (XXL)"],
    images: [
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Chalk-striped wool single-breasted blazer with notch lapels and natural shoulder construction.",
    description: "An undisputed classic modernized with featherlight Neapolitan shoulder roping and high-twist wool that resists creasing during transcontinental travel. Features dual rear vents, ticket pocket, and interior passport compartments.",
    fabricDetails: "100% High-Twist Worsted Wool (Travel Ready Crease-Resistant).",
    craftsmanship: "Unstructured half-canvas allows breathability while preserving razor-sharp chest contour.",
    fitGuide: "Tailored modern fit with gentle waist suppression.",
    careInstructions: "Dry clean only. Hang on wide contoured wooden hanger.",
    pairedWith: ["formal-03"]
  },

  // ================= CASUAL WEAR =================
  {
    id: "casual-01",
    name: "Pure Normandy Washed Linen Resort Shirt",
    collection: "casual",
    subCategory: "Linen & Shirts",
    price: 5400,
    originalPrice: 6500,
    rating: 4.9,
    reviewCount: 89,
    badge: "Summer Essential",
    inStock: true,
    colors: [
      { name: "Alabaster White", hex: "#f8fafc" },
      { name: "Sage Green", hex: "#52796f" },
      { name: "Terracotta Sand", hex: "#c97a63" },
      { name: "Sky Azure", hex: "#93c5fd" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Garment-washed French Normandy flax linen shirt with relaxed camp collar and coconut husk buttons.",
    description: "Breathe effortlessly through warm days. Spun from certified French Normandy flax, this shirt undergoes an enzyme stonewashing cycle to deliver broken-in softness from the very first wear. Cut with a camp collar that lays flat and an easy box-pleat back.",
    fabricDetails: "100% Certified French Flax Linen (165 gsm pre-washed); Natural coconut shell buttons.",
    craftsmanship: "French seams throughout for zero interior scratchiness and lasting durability.",
    fitGuide: "Relaxed resort cut. True to size for an easy, breezy drape.",
    careInstructions: "Machine wash delicate in cold water. Line dry in shade; embrace the natural linen crinkle.",
    pairedWith: ["casual-03", "casual-04"]
  },
  {
    id: "casual-02",
    name: "Artisanal Handspun Khadi Mandarin Kurta Shirt",
    collection: "casual",
    subCategory: "Linen & Shirts",
    price: 4800,
    originalPrice: 5900,
    rating: 4.8,
    reviewCount: 56,
    badge: "Handloom Heritage",
    inStock: true,
    colors: [
      { name: "Natural Ecru", hex: "#f5f5f0" },
      { name: "Indigo Dip Dye", hex: "#1e3a8a" },
      { name: "Mineral Charcoal", hex: "#374151" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Indigenous hand-spun organic cotton kurta shirt with concealed placket and curved hemline.",
    description: "Bridging centuries of Indian weaving wisdom with contemporary casual luxury. Spun on traditional amber charkhas by craft clusters in Bengal. Its micro-porous texture keeps you cool in scorching heat and insulated during cool evenings.",
    fabricDetails: "100% Hand-spun Organic Cotton (Khadi certified); Natural azo-free mineral dyes.",
    craftsmanship: "Weaver's artisanal signature embroidered inside the inner placket hem.",
    fitGuide: "Modern comfort fit with lateral vent slits for effortless mobility.",
    careInstructions: "Gentle hand wash or gentle cycle cold. Reshape while damp.",
    pairedWith: ["casual-03"]
  },
  {
    id: "casual-03",
    name: "Tailored Tencel-Linen Drawstring Chinos",
    collection: "casual",
    subCategory: "Trousers & Chinos",
    price: 6200,
    originalPrice: 7500,
    rating: 4.9,
    reviewCount: 71,
    badge: "Bestseller",
    inStock: true,
    colors: [
      { name: "Warm Khaki", hex: "#c2a688" },
      { name: "Olive Moss", hex: "#3f4e3c" },
      { name: "Navy Ink", hex: "#1e293b" }
    ],
    sizes: ["30", "32", "34", "36", "38"],
    images: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Hybrid formal-casual trousers with hidden elastic drawstring waist and sartorial front creases.",
    description: "The comfort of lounge trousers merged with the razor elegance of tailored trousers. Woven with Austrian Tencel and Belgian linen, providing a silky liquid drape and natural temperature regulation. Features a concealed internal drawstring and subtle stretch.",
    fabricDetails: "55% Belgian Linen, 43% Lyocell Tencel, 2% Elastane.",
    craftsmanship: "Tailored horn button rear welt pockets and deep coin pocket.",
    fitGuide: "Gentle taper from mid-thigh down to a neat 14-inch hem opening.",
    careInstructions: "Machine wash cold; hang dry or iron warm.",
    pairedWith: ["casual-01", "casual-05"]
  },
  {
    id: "casual-04",
    name: "Heavyweight Supima Cotton Minimalist Overshirt",
    collection: "casual",
    subCategory: "Jackets & Overshirts",
    price: 7900,
    originalPrice: 9500,
    rating: 5.0,
    reviewCount: 43,
    badge: "New Arrival",
    inStock: true,
    colors: [
      { name: "Earthy Taupe", hex: "#78716c" },
      { name: "Deep Forest", hex: "#14532d" },
      { name: "Matte Black", hex: "#18181b" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "320 gsm twill Supima cotton utility overshirt with twin chest patch pockets and matte metal snaps.",
    description: "Your ultimate layering piece across seasons. Crafted from top 1% American Supima extra-long staple cotton twill. Resistant to pilling and offering exceptional tensile strength. Wear open over a t-shirt or buttoned as a structured jacket.",
    fabricDetails: "100% Certified California Supima Cotton Twill (320 gsm heavy weight).",
    craftsmanship: "Bar-tack reinforcements at all stress points and double-needle needlework.",
    fitGuide: "Relaxed Boxy Silhouette tailored for comfortable layering over knits or tees.",
    careInstructions: "Machine wash cold with like colors. Tumble dry low or line dry.",
    pairedWith: ["casual-01", "casual-03"]
  },
  {
    id: "casual-05",
    name: "Mulberry Silk Knit Camp Collar Polo",
    collection: "casual",
    subCategory: "Polo & Knits",
    price: 8900,
    originalPrice: 11000,
    rating: 4.9,
    reviewCount: 39,
    badge: "Ultra Luxury Knit",
    inStock: true,
    colors: [
      { name: "Caramel Biscuit", hex: "#d97706" },
      { name: "Sea Salt Cream", hex: "#fef9c3" },
      { name: "Petrol Blue", hex: "#0e7490" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Fine-gauge 14-micron silk-cotton knitted polo with vintage ribbed hem and open Johnny collar.",
    description: "Experience the tactile indulgence of fine-gauge silk knit. Blended seamlessly with combed cotton to retain shape while gifting a cool, liquid feel against your skin. Features a placket-free Johnny collar reminiscent of 1960s Riviera elegance.",
    fabricDetails: "60% Grade-A Mulberry Silk, 40% Long-Staple Combed Cotton.",
    craftsmanship: "Fully fashioned seamless knitting process ensuring zero interior bulky seams.",
    fitGuide: "Tailored knit fit with ribbed waistband that sits cleanly on high-rise chinos.",
    careInstructions: "Hand wash in cold water with silk shampoo. Dry flat on a clean towel.",
    pairedWith: ["casual-03"]
  },
  {
    id: "casual-06",
    name: "Japanese Selvedge Denim Chore Overshirt",
    collection: "casual",
    subCategory: "Jackets & Overshirts",
    price: 9800,
    originalPrice: 12000,
    rating: 4.8,
    reviewCount: 28,
    badge: "Artisanal Denim",
    inStock: true,
    colors: [
      { name: "Raw Indigo", hex: "#1e3a8a" },
      { name: "Washed Stonewash", hex: "#60a5fa" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Kuroki Mills 12.5oz Japanese shuttle-loom selvedge denim jacket with red selvedge ID line.",
    description: "Milled in Okayama, Japan on vintage Toyoda shuttle looms. This raw selvedge chore jacket develops unique patina, whiskering, and honeycomb fades uniquely tailored to your lifestyle over years of wear.",
    fabricDetails: "100% Long-Staple Zimbabwe Cotton; 12.5oz Right Hand Twill with Red Selvedge ID.",
    craftsmanship: "Chain-stitched hems by union special vintage sewing machines.",
    fitGuide: "Classic regular fit with room for chest motion.",
    careInstructions: "Wear as long as possible before initial wash. Wash inside out in cold water.",
    pairedWith: ["casual-01", "casual-03"]
  }
];

export const lookbooks = [
  {
    id: "look-01",
    title: "The Regal Evening Bandhgala",
    subtitle: "Formal Sartorial Mastery",
    description: "Raw matka silk structured jacket paired with bespoke pleated trousers and hand-carved brass accents. Ideal for high-profile galas, weddings, and sovereign evenings.",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1400&q=90",
    productIds: ["formal-01", "formal-03", "formal-04"]
  },
  {
    id: "look-02",
    title: "The Riviera Linen Escapade",
    subtitle: "Effortless Casual Sophistication",
    description: "Normandy washed flax linen shirt styled with breathable Tencel drawstring chinos and fine silk knits for weekend getaways and private yacht dinners.",
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1400&q=90",
    productIds: ["casual-01", "casual-03", "casual-05"]
  },
  {
    id: "look-03",
    title: "The Executive Monolith",
    subtitle: "Boardroom Double-Breasted Power",
    description: "Super 150s Biella merino wool tailored to perfection with roped shoulders, peak lapels, and Egyptian Giza cotton shirt.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1400&q=90",
    productIds: ["formal-02", "formal-03", "formal-06"]
  }
];
