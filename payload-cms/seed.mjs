/**
 * Seed script for Payload CMS
 * Run: node seed.mjs
 *
 * This script authenticates to the Payload CMS admin, then seeds all
 * collections with the CAH clone content.
 */

const CMS_URL = 'https://cah-assignment.vercel.app'
const EMAIL = 'ykanishk479@gmail.com'
const PASSWORD = 'Kanishk@123'

async function login() {
  const res = await fetch(`${CMS_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  const data = await res.json()
  if (!data.token) throw new Error('Login failed: ' + JSON.stringify(data))
  console.log('Logged in successfully')
  return data.token
}

async function createDoc(token, collection, doc) {
  const res = await fetch(`${CMS_URL}/api/${collection}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(doc),
  })
  const data = await res.json()
  if (data.errors) {
    console.error(`Error creating ${collection}:`, data.errors)
  } else {
    console.log(`Created ${collection}: ${data.doc?.id || data.doc?.name || 'OK'}`)
  }
  return data
}

async function getExistingDocs(token, collection) {
  const res = await fetch(`${CMS_URL}/api/${collection}?limit=100`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const data = await res.json()
  return data.docs || []
}

async function seed() {
  const token = await login()

  // ===== HERO =====
  const existingHero = await getExistingDocs(token, 'hero')
  if (existingHero.length === 0) {
    await createDoc(token, 'hero', {
      heading: 'Cards Against Humanity',
      description:
        'Cards Against Humanity is a fill-in-the-blank party game that turns your awkward personality and lackluster social skills into hours of fun! Wow.',
      quoteOne: 'Absurd.',
      quoteOneSource: 'NPR',
      quoteTwo: 'A game for horrible people.',
      quoteTwoSource: 'Bloomberg Businessweek',
    })
  } else {
    console.log('Hero already exists, skipping')
  }

  // ===== PRODUCTS =====
  const existingProducts = await getExistingDocs(token, 'products')
  if (existingProducts.length === 0) {
    const products = [
      {
        name: 'Cards Against Humanity',
        slug: 'cards-against-humanity',
        tagline: "America's #1 gerbil coffin.",
        price: 29,
        description: 'Cards Against Humanity is a party game for horrible people.',
        buttonText: 'BUY NOW',
        buttonLink: '/products/more-cah',
        images: [
          {
            imageUrl:
              'https://img.cah.io/images/vc07edlh/production/69d14a8c4c8084841b5f3437eb8a06124162dc0d-660x1270.png',
            alt: 'Cards Against Humanity box',
          },
        ],
        bulletPoints: [],
      },
      {
        name: 'Family Edition',
        slug: 'family-edition',
        tagline: 'Play CAH with your kids.',
        price: 29,
        description: 'Family Edition is the PG-rated version of Cards Against Humanity.',
        buttonText: 'BUY FAMILY EDITION',
        buttonLink: '/shop',
        images: [
          {
            imageUrl:
              'https://img.cah.io/images/vc07edlh/production/048109f3bcd6e2c21cb041f9e5d0ddeac9c3de2f-716x1294.png',
            alt: 'Family Edition box',
          },
        ],
        bulletPoints: [],
      },
      {
        name: 'More Cards Against Humanity',
        slug: 'more-cah',
        tagline: 'Moooooore cards!',
        price: 25,
        description:
          'More Cards Against Humanity comes with 600 expansion cards that instantly double the replayability and girth of your deck.',
        buttonText: 'BUY EXPANSIONS',
        buttonLink: '/products/more-cah',
        images: [
          {
            imageUrl:
              'https://img.cah.io/images/vc07edlh/production/5e64d25a746ed1ebc9d5025f935fc650a984a105-1400x1260.png',
            alt: 'More CAH box',
          },
        ],
        bulletPoints: [
          {
            point:
              "If you've never bought an expansion and you want more Cards Against Humanity, buy More Cards Against Humanity.",
          },
          {
            point:
              "It's got all the best jokes from our old Red Box, Blue Box, and Green Box expansions, plus 50 cards we've never printed before.",
          },
          { point: 'Shiny!' },
        ],
      },
      {
        name: '$5 Packs',
        slug: 'five-dollar-packs',
        tagline: "For whatever you're into.",
        price: 5,
        description: 'Small themed packs for Cards Against Humanity.',
        buttonText: 'BUY $5 PACKS',
        buttonLink: '/shop',
        images: [
          {
            imageUrl:
              'https://img.cah.io/images/vc07edlh/production/41556c5c773ab42a27824ae1c8c73315653de2bf-660x1200.png',
            alt: '$5 Packs',
          },
        ],
        bulletPoints: [],
      },
    ]

    for (const p of products) {
      await createDoc(token, 'products', p)
    }
  } else {
    console.log(`Products already exist (${existingProducts.length}), skipping`)
  }

  // ===== FAQS =====
  const existingFAQs = await getExistingDocs(token, 'faqs')
  if (existingFAQs.length === 0) {
    const faqs = [
      {
        question: 'Where can I buy Cards Against Humanity?',
        answer:
          'Our products are available all over the place, such as our webstore, Amazon, and at all of these retailers.',
        order: 1,
      },
      {
        question: "Can I still buy it even if I'm not in America?",
        answer:
          'We make localized versions for Canada, Australia, and the UK, plus a special International Edition.',
        order: 2,
      },
      {
        question: 'How do I play Cards Against Humanity?',
        answer:
          'Each round, one player asks a question with a black card, and everyone else answers with their funniest white card.',
        order: 3,
      },
      {
        question: 'Do you sell expansions?',
        answer: 'Yes! We sell large boxed expansions and dozens of small themed packs.',
        order: 4,
      },
      {
        question: "I bought something from you and now there's a problem.",
        answer:
          "Go to our webstore FAQ, and if that doesn't help, send us an email at Mail@CardsAgainstHumanity.com",
        order: 5,
      },
    ]

    for (const faq of faqs) {
      await createDoc(token, 'faqs', faq)
    }
  } else {
    console.log(`FAQs already exist (${existingFAQs.length}), skipping`)
  }

  // ===== STEAL SECTION =====
  const existingSteal = await getExistingDocs(token, 'steal-section')
  if (existingSteal.length === 0) {
    await createDoc(token, 'steal-section', {
      title: 'Steal the game.',
      description:
        'Since day one, Cards Against Humanity has been available as a free download on our website. You can download the PDFs and printing instructions right here\u2014all you need is a printer, scissors, and a prehensile appendage.',
      note: 'Please note: there\u2019s no legal way to use these PDFs to make money, so don\u2019t ask.',
      buttonOneText: 'DOWNLOAD FILES',
      buttonTwoText: 'DOWNLOAD',
    })
  } else {
    console.log('Steal section already exists, skipping')
  }

  // ===== FOOTER =====
  const existingFooter = await getExistingDocs(token, 'footer')
  if (existingFooter.length === 0) {
    await createDoc(token, 'footer', {
      copyright: '\u00A92026 Cards Against Humanity LLC',
      shopLinks: [
        { label: 'All Products', url: '/shop' },
        { label: 'Main Games', url: '/shop' },
        { label: 'Expansions', url: '/shop' },
        { label: 'Packs', url: '/shop' },
      ],
      infoLinks: [
        { label: 'About', url: '/about' },
        { label: 'Support', url: '/about' },
        { label: 'Contact', url: '/about' },
      ],
      socialLinks: [
        { label: 'Instagram', url: 'https://instagram.com/cardsagainsthumanity' },
        { label: 'Facebook', url: 'https://www.facebook.com/CardsAgainstHumanity' },
      ],
    })
  } else {
    console.log('Footer already exists, skipping')
  }

  console.log('\nSeed complete!')
}

seed().catch(console.error)
