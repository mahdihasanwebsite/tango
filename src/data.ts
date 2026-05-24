/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Testimonial } from './types';

export const products: Product[] = [
  {
    id: 's1',
    name: 'Aura Signature Fitted Shirt',
    category: 'shirts',
    price: 189,
    description: 'Masterfully tailored from premium long-staple Egyptian cotton. Built with an elegant active stretch and semi-spread corporate collar.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
    details: [
      '100% GIZA Egyptian Cotton',
      'High-thread count luxurious satin finish',
      'Signature cyber-cyan double stitching accent on buttons',
      'Wrinkle-resistant double-ply structure'
    ],
    rating: 4.9,
    sizes: ['S', 'M', 'L', 'XL'],
    accentColor: 'cyan',
    tag: 'Best Seller'
  },
  {
    id: 's2',
    name: 'Onyx Tailored Oxford Sleeveless',
    category: 'shirts',
    price: 165,
    description: 'An advanced take on the classic corporate black shirt. Features a clean concealed placket and moisture-wicking technology.',
    image: 'https://images.unsplash.com/photo-1620012253295-c05cd3e713d3?auto=format&fit=crop&q=80&w=800',
    details: [
      '80% Oxford Cotton, 20% Tech Poly-stretch',
      'Completely concealed front closure',
      'Subtle electric purple branding at neck rail',
      'Matte obsidian-toned buttons'
    ],
    rating: 4.8,
    sizes: ['M', 'L', 'XL'],
    accentColor: 'purple',
    tag: 'New Edition'
  },
  {
    id: 's3',
    name: 'Neon Tech Prism Overshirt',
    category: 'shirts',
    price: 210,
    description: 'A tactical-minimalist hybrid outer layer with hidden magnetic utility pockets and structured cybernetic collars.',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=800',
    details: [
      'Water-repellent ripstop luxury blend',
      'Dual magnetic flap pockets on chest',
      'Adjustable wrist straps with cybernetic typography',
      'Breathability-mesh back interior panel'
    ],
    rating: 5.0,
    sizes: ['S', 'M', 'L', 'XL'],
    accentColor: 'cyan',
    tag: 'Limited'
  },
  {
    id: 'p1',
    name: 'Stealth Tapered Dress Trouser',
    category: 'pants',
    price: 245,
    description: 'Perfect corporate silhouette with comfortable elastic drawstrings concealed in an elegant flat-front waistband structure.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
    details: [
      '70% Australian Merino Wool, 25% Silk, 5% Elastane',
      'Concealed inner adjustable drawstring',
      'Ankle-cropped modern taper',
      'Double-welted rear zip pockets with cyan highlights'
    ],
    rating: 4.9,
    sizes: ['30', '32', '34', '36'],
    accentColor: 'cyan',
    tag: 'Award Winning'
  },
  {
    id: 'p2',
    name: 'Electric Purple Pixel Cargo',
    category: 'pants',
    price: 260,
    description: 'Luxury heavy-weight streetwear trousers featuring modular magnetic modularity, custom purple webbing, and 8 discrete compartments.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
    details: [
      'Ultra durable high-density premium canvas',
      'Modular utility pockets equipped with German magnetic closures',
      'Reflective piping along custom lateral stitching',
      'Adjustable toggle leg openings for structured taper'
    ],
    rating: 4.7,
    sizes: ['32', '34', '36'],
    accentColor: 'purple',
    tag: 'Techwear'
  },
  {
    id: 'p3',
    name: 'Minimalist Slate Knit Joggers',
    category: 'pants',
    price: 195,
    description: 'Hybrid leisure-corporate joggers crafted from high-density heavy double-knit jersey with precise geometric pleats.',
    image: 'https://images.unsplash.com/photo-1506629082925-5338dd6c4480?auto=format&fit=crop&q=80&w=800',
    details: [
      'Heavyweight 420GSM organic interlock knit',
      'Precision stitched front pintuck crease for corporate look',
      'Discreet side seam invisible phone compartment',
      'Anodized black hardware waist caps'
    ],
    rating: 4.9,
    sizes: ['30', '32', '34', '36'],
    accentColor: 'cyan'
  }
];

export const services = [
  {
    id: 'se1',
    title: 'Bespoke Atelier Tailoring',
    description: 'Every pattern digitized individually to your exact anatomical measurements using precise AI depth scanning.',
    icon: 'Scissors',
    badge: 'Signature'
  },
  {
    id: 'se2',
    title: 'Zero-Carbon Supply Chain',
    description: 'Woven entirely in green energy mills with certified GOTS organic cotton and regenerated cybernetic yarns.',
    icon: 'Leaf',
    badge: 'Sustainable'
  },
  {
    id: 'se3',
    title: 'Next-Day Sovereign Courier',
    description: 'Arrives at your office in custom wood-and-steel display boxes ready to wear, with complimentary custom hanger systems.',
    icon: 'Truck',
    badge: 'Premium'
  },
  {
    id: 'se4',
    title: 'Lifetime Integrity Warranty',
    description: 'We offer free restoration, reseaming, and size adjustments for any garment you ever purchase from our brand.',
    icon: 'ShieldCheck',
    badge: 'Sovereign'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    author: 'Kaelen Vance',
    role: 'Principal Creative Director, NeoLab',
    quote: 'The Aura Signature shirt completely redefined my professional wardrobe. The attention to detail from the cyan double-stitch to the immaculate corporate posture fit is unmatched.',
    rating: 5
  },
  {
    id: 't2',
    author: 'Seraphina Vance',
    role: 'Tech Lead, Genesis Syndicate',
    quote: 'I wear their technical utility overshirts. Having functional magnetic pockets combined with true corporate minimalist luxury is a godsend.',
    rating: 5
  }
];
