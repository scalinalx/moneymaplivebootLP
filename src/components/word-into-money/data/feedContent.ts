export type CardType =
    | 'hero' | 'author' | 'problem' | 'stat' | 'testimonial'
    | 'benefit' | 'curriculum' | 'quote' | 'image' | 'comparison'
    | 'guarantee' | 'priceReveal' | 'cta' | 'faq' | 'urgency'
    | 'checkout' | 'teaser' | 'bridge';

export interface FeedItem {
    id: string;
    type: CardType;
    animation?: string;
    variant?: string;
    data: Record<string, any>;
}

// ─────────────────────────────────────────────────────────────
// PHASE 1: Core Sequence — Emotional Arc Mapped
//
// Phase A (1-8):   CURIOSITY + SHOCK — Hook them, don't let go
// Phase B (9-19):  DESIRE + PROOF — Cluster proof unpredictably
// Phase C (20-28): DEEP TRUST + OBJECTIONS — Earn confidence
// Phase D (29-38): URGENCY + DECISION — Close the deal
// ─────────────────────────────────────────────────────────────

export const coreSequence: FeedItem[] = [

    // ═══ PHASE A: CURIOSITY + SHOCK ═══

    // 1. Hero — always visible, no animation
    {
        id: 'hero',
        type: 'hero',
        animation: 'none',
        data: {
            headline: 'Your Words Are Worth Money. Let Me Prove It.',
            subheadline: 'The 60-minute copywriting workshop that turns newsletter writers into paid professionals.',
        },
    },

    // IMAGE: Golden Typewriter in Dark Void — sets the tone, words = gold (feed-01)
    {
        id: 'image-feed-01',
        type: 'image',
        animation: 'scale',
        variant: 'fullBleed',
        data: {
            src: '/imgs/word-into-money/feed-01.jpeg',
            alt: 'Vintage golden typewriter glowing with warm amber light in vast dark space',
            caption: 'Your words have value. This workshop shows you how to unlock it.',
        },
    },

    // 2. Author — who's talking? instant authority
    {
        id: 'author',
        type: 'author',
        animation: 'fade',
        data: {},
    },

    // IMAGE: Pen Writing Golden Light — the act of writing as magic (feed-10)
    {
        id: 'image-feed-10',
        type: 'image',
        animation: 'fade',
        variant: 'fullBleed',
        data: {
            src: '/imgs/word-into-money/feed-10.jpeg',
            alt: 'Hand holding fountain pen writing golden light trails in darkness',
            caption: 'Writing is the most powerful skill in the creator economy.',
        },
    },

    // 3. Shocking stat — pattern interrupt
    {
        id: 'stat-1',
        type: 'stat',
        animation: 'scale',
        variant: 'dark',
        data: {
            number: '73%',
            context: 'of newsletter writers earn $0 from their writing.',
        },
    },

    // 4. Pain agitation — the rant (ends mid-thought → flows into testimonial)
    {
        id: 'problem-1',
        type: 'problem',
        animation: 'slide-up',
        data: {
            text: "You write every week. You pour hours into research, drafting, editing. You hit publish and watch the likes trickle in.\n\nBut your bank account? Silent.\n\nYou've been told to \"just keep writing\" and the money will follow. That's a lie. Writing more doesn't make you money. Writing differently does.\n\nThe difference between a free newsletter and a $10K/month business isn't talent. It's copy.\n\nDon't believe me? Ask Sarah—",
        },
    },

    // 5. Proof — resolves the open loop from problem card
    {
        id: 'testimonial-1',
        type: 'testimonial',
        animation: 'slide-up',
        data: {
            name: 'Sarah K.',
            text: 'I made $3,200 in my first 14 days after joining. Build to Profit ended 8 months of overthinking.',
            avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop',
            detail: 'Newsletter Creator · $3,200 in 14 days',
        },
    },

    // 6. TEASER — opens a curiosity loop (resolves at card 16)
    {
        id: 'teaser-1',
        type: 'teaser',
        animation: 'fade',
        data: {
            text: "There's one 5-step framework that generated 80% of those results. You'll see it in a moment — but first, let me show you what's actually possible.",
        },
    },

    // 7. Quote — breathing room, glass variant for visual variety
    {
        id: 'quote-1',
        type: 'quote',
        animation: 'fade',
        variant: 'glass',
        data: {
            quote: 'The gap between writing for free and getting paid is one framework.',
            attribution: 'Ana Calin',
        },
    },

    // 8. Soft CTA — first buying opportunity
    {
        id: 'cta-1',
        type: 'cta',
        animation: 'scale',
        data: {
            headline: 'Ready to close that gap?',
            buttonText: 'YES — SHOW ME HOW ($97)',
        },
    },

    // ═══ PHASE B: DESIRE + PROOF (variable ratio — unpredictable clusters) ═══

    // 9. Benefit thread starts
    {
        id: 'benefit-1',
        type: 'benefit',
        animation: 'slide-left',
        variant: 'highlight',
        data: { number: 1, total: 7, headline: 'Write Copy That Converts Readers Into Buyers', detail: "Learn the exact frameworks that turn a casual reader into someone who pulls out their credit card. This isn't about being \"salesy\" — it's about writing with intention." },
    },

    // 10. LOSS AVERSION — woven early (not just at checkout)
    {
        id: 'urgency-early',
        type: 'urgency',
        animation: 'slide-up',
        data: {
            text: "Right now, someone with half your talent is charging $497 for a workshop. Because they know how to write copy. You don't — yet.",
        },
    },

    // 11-12. Benefits continue
    {
        id: 'benefit-2',
        type: 'benefit',
        animation: 'slide-left',
        variant: 'dark',
        data: { number: 2, total: 7, headline: 'Price Your Words At What They\'re Actually Worth', detail: "Stop undercharging. You'll learn the psychology behind pricing and how to position your offers so $97 feels like a steal." },
    },
    {
        id: 'benefit-3',
        type: 'benefit',
        animation: 'slide-left',
        variant: 'glass',
        data: { number: 3, total: 7, headline: 'Turn A Single Post Into A Paid Product', detail: "That post sitting in your drafts? It could be a $97 workshop, a $27 PDF, or a $497 course. I'll show you how to see the money hiding in your content." },
    },

    // IMAGE: Copywriter's Desk — the "after" professional workspace (feed-02)
    {
        id: 'image-feed-02',
        type: 'image',
        animation: 'scale',
        variant: 'fullBleed',
        data: {
            src: '/imgs/word-into-money/feed-02.jpeg',
            alt: 'Professional copywriter\'s dark walnut desk with Moleskine notebook, gold pen, espresso, and payment notification',
            caption: 'This is what your workspace looks like when your words work for you.',
        },
    },

    // 13. BRIDGE — narrative flow to proof cluster
    {
        id: 'bridge-1',
        type: 'bridge',
        animation: 'fade',
        data: { text: "But don't take my word for it—" },
    },

    // 14-16. PROOF CLUSTER — triple hit (variable ratio HIGH reward spike)
    {
        id: 'testimonial-2',
        type: 'testimonial',
        animation: 'slide-up',
        data: {
            name: 'Marcus T.',
            text: "Finally launched after endless 'planning.' Hit $4,500 Week 1. The workshop sessions are everything.",
            avatarUrl: 'https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png',
            detail: 'Content Strategist · $4,500 in Week 1',
        },
    },
    {
        id: 'testimonial-3',
        type: 'testimonial',
        animation: 'slide-up',
        variant: 'highlight',
        data: {
            name: 'Gustavo',
            text: 'Your programs completely transformed my approach. I went from 200 subscribers to 4.5K in just 3 months and made my first $1,500 from my newsletter!',
            avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&auto=format&fit=crop',
            detail: '200 → 4,500 subscribers · $1,500 revenue',
        },
    },
    {
        id: 'image-1',
        type: 'image',
        animation: 'scale',
        data: {
            src: '/imgs/ana-calin.jpg',
            alt: 'Ana Calin',
            caption: 'Real results from real students — not hypotheticals.',
        },
    },

    // IMAGE: Payment Notification Phone — feel the moment of getting paid (feed-04)
    {
        id: 'image-feed-04',
        type: 'image',
        animation: 'scale',
        variant: 'fullBleed',
        data: {
            src: '/imgs/word-into-money/feed-04.jpeg',
            alt: 'Hand holding iPhone showing Stripe payment notification of $2,100 from Workshop Sale',
            caption: 'This feeling. This is what we\'re building toward.',
        },
    },

    // 17. TEASER — opens second loop (resolves at card 20)
    {
        id: 'teaser-2',
        type: 'teaser',
        animation: 'fade',
        data: {
            text: "The pricing mistake that costs 90% of creators their entire business — I'll break it down in a moment.",
        },
    },

    // 18. Comparison — visual pattern interrupt
    {
        id: 'comparison',
        type: 'comparison',
        animation: 'slide-up',
        data: {
            before: [
                'Writing for free, hoping someone notices',
                'Posting into the void with no strategy',
                'Undercharging or not charging at all',
                'Feeling like an imposter about selling',
            ],
            after: [
                'Every post has a monetisation angle built in',
                'A clear system from content to cash',
                'Confidently pricing at what your work is worth',
                'Selling feels natural because your copy does the work',
            ],
        },
    },

    // IMAGE: Before/After Desk Split — reinforces transformation (feed-05)
    {
        id: 'image-feed-05',
        type: 'image',
        animation: 'slide-up',
        variant: 'fullBleed',
        data: {
            src: '/imgs/word-into-money/feed-05.jpeg',
            alt: 'Split screen: cold messy desk vs warm clean productive workspace with payment notification',
            caption: 'Left: before. Right: after one workshop.',
        },
    },

    // 19. Big aggregate stat — count-up animation
    {
        id: 'stat-2',
        type: 'stat',
        animation: 'scale',
        variant: 'highlight',
        data: {
            number: '$1.2M+',
            context: 'generated by Word Into Money students.',
        },
    },

    // ═══ PHASE C: DEEP TRUST + OBJECTION HANDLING ═══

    // 20. BRIDGE to curriculum — narrative investment acknowledgment
    {
        id: 'bridge-2',
        type: 'bridge',
        animation: 'fade',
        data: { text: "Now let me show you exactly what's inside—" },
    },

    // 21. Curriculum — resolves teaser-1 (the 5-step framework)
    {
        id: 'curriculum',
        type: 'curriculum',
        animation: 'slide-up',
        data: {
            modules: [
                { title: 'The Money Copy Framework', description: 'The exact 5-step framework I use to write copy that converts at 3-5x the industry average. This alone is worth the price of admission.' },
                { title: 'Headline Alchemy', description: 'How to write headlines that stop the scroll and make people desperate to read more. 12 proven formulas you can swipe immediately.' },
                { title: 'The Offer Engine', description: "Turn any idea into a paid offer in under 60 minutes. You'll build your first (or next) offer live during the workshop." },
                { title: 'Objection Crushing Copy', description: "Every reader has a voice in their head saying \"not now.\" Learn to silence it with copy that handles every objection before it's even raised." },
                { title: 'The $97 Email Sequence', description: 'The exact 5-email sequence that turns free subscribers into paying customers. Copy-paste templates included.' },
                { title: 'Pricing Psychology', description: "Why some people charge $7 and others charge $997 for the same quality content — and how to position yourself at the top. (This is the module that resolves that pricing mistake I mentioned.)" },
            ],
        },
    },

    // IMAGE: Revenue Dashboard + Notebook — the tools they'll learn (feed-07)
    {
        id: 'image-feed-07',
        type: 'image',
        animation: 'scale',
        variant: 'fullBleed',
        data: {
            src: '/imgs/word-into-money/feed-07.jpeg',
            alt: 'iPad showing upward trending revenue dashboard beside open notebook with email sequence flowchart',
            caption: 'The exact systems you\'ll have after this workshop.',
        },
    },

    // 22. Proof after curriculum
    {
        id: 'testimonial-4',
        type: 'testimonial',
        animation: 'slide-up',
        variant: 'glass',
        data: {
            name: 'Priya M.',
            text: "I've taken 4 newsletter courses. This is the only one that made me money, not just smarter.",
            avatarUrl: 'https://images.unsplash.com/photo-1685903772095-f07172808761?q=80&w=256&h=256&auto=format&fit=crop',
            detail: 'ROI-positive vs 4 other courses',
        },
    },

    // 23. Quote — breathing room
    {
        id: 'quote-2',
        type: 'quote',
        animation: 'fade',
        data: {
            quote: 'You don\'t need a bigger audience. You need better words.',
        },
    },

    // IMAGE: Glowing Open Book in Dark Water — words hold power (feed-06)
    {
        id: 'image-feed-06',
        type: 'image',
        animation: 'fade',
        variant: 'fullBleed',
        data: {
            src: '/imgs/word-into-money/feed-06.jpeg',
            alt: 'Enormous glowing open book floating on dark mirror-like water at twilight',
            caption: 'The power has been in your words the whole time.',
        },
    },

    // 24. Mid-feed CTA + sunk cost acknowledgment
    {
        id: 'cta-2',
        type: 'cta',
        animation: 'scale',
        data: {
            headline: "If you're still reading, you already know this is different. Join 2,300+ writers who made the switch.",
            buttonText: 'GET INSTANT ACCESS — $97',
        },
    },

    // 25. Objection handling — "small list"
    {
        id: 'problem-2',
        type: 'problem',
        animation: 'slide-up',
        variant: 'dark',
        data: {
            text: "\"But I have a small list...\"\n\nGood. Some of our highest-earning students started with under 500 subscribers. A small, engaged list that trusts you is worth more than 50,000 cold followers.\n\nThis workshop isn't about audience size. It's about knowing what to say to the people already reading your stuff.",
        },
    },

    // 26-27. Benefits resolve the objection
    {
        id: 'benefit-4',
        type: 'benefit',
        animation: 'slide-left',
        variant: 'highlight',
        data: { number: 4, total: 7, headline: 'Works With Any List Size', detail: "Whether you have 100 or 100,000 subscribers, the copy frameworks are the same. Good words convert at any scale." },
    },
    {
        id: 'benefit-5',
        type: 'benefit',
        animation: 'slide-left',
        variant: 'dark',
        data: { number: 5, total: 7, headline: 'No Existing Audience Needed', detail: "Starting from zero? Perfect. You'll learn to write copy that attracts AND converts from day one." },
    },

    // 28. Proof for small-list objection
    {
        id: 'testimonial-5',
        type: 'testimonial',
        animation: 'slide-up',
        data: {
            name: 'Kyle',
            text: "Best investment I made this year. The community alone is worth the price. I'm now making $2,500/month from my newsletter thanks to this program.",
            avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=256&h=256&auto=format&fit=crop',
            detail: '$2,500/month newsletter revenue',
        },
    },

    // IMAGE: Group Reaction — social proof energy (feed-08)
    {
        id: 'image-feed-08',
        type: 'image',
        animation: 'scale',
        variant: 'fullBleed',
        data: {
            src: '/imgs/word-into-money/feed-08.jpeg',
            alt: 'Two women reacting with excitement to laptop screen in warm co-working space',
            caption: 'The moment it clicks. You\'ll recognise it.',
        },
    },

    // ═══ PHASE D: URGENCY + DECISION ═══

    // 29-30. Final benefits
    {
        id: 'benefit-6',
        type: 'benefit',
        animation: 'slide-left',
        variant: 'glass',
        data: { number: 6, total: 7, headline: 'Copy Frameworks That Work In Any Niche', detail: "Finance, wellness, tech, parenting, B2B — the psychology of persuasion is universal. These frameworks have been tested across 40+ niches." },
    },
    {
        id: 'benefit-7',
        type: 'benefit',
        animation: 'slide-left',
        variant: 'highlight',
        data: { number: 7, total: 7, headline: 'Lifetime Access To All Materials', detail: "Watch the replay anytime. Download the templates. Revisit the frameworks whenever you launch something new. It's yours forever." },
    },

    // 31. LOSS AVERSION — cost of inaction
    {
        id: 'urgency-mid',
        type: 'urgency',
        animation: 'slide-up',
        data: {
            text: "Every day without these frameworks is another day your content makes $0. How many more weeks?",
        },
    },

    // Visual break before FAQ
    {
        id: 'image-faq-break',
        type: 'image',
        animation: 'fade',
        data: {
            src: '/imgs/word-into-money/feed-02.jpeg',
            alt: 'Professional copywriter\'s desk with notebook and payment notification',
            caption: 'The tools, the templates, the frameworks — all in one 60-minute workshop.',
        },
    },

    // 32. FAQ
    {
        id: 'faq',
        type: 'faq',
        animation: 'slide-up',
        data: {
            faqs: [
                { question: 'When is the workshop?', answer: 'You get instant access to the full recorded workshop plus all templates and bonuses immediately after purchase.' },
                { question: "I'm not a \"natural writer.\" Will this work for me?", answer: "Absolutely. This workshop is built on frameworks, not talent. If you can write an email to a friend, you can write copy that sells." },
                { question: 'How is this different from other writing courses?', answer: "Most courses teach you to write better. This one teaches you to write profitably. Every framework is designed to convert readers into buyers." },
                { question: 'What if I want a refund?', answer: "You have a full 30 days. If it doesn't deliver, email me and I'll refund you. No questions asked." },
                { question: 'Do I need Substack specifically?', answer: "No. These copywriting frameworks work on any platform — Substack, Beehiiv, ConvertKit, Ghost, your own website. Words are words." },
            ],
        },
    },

    // 33. Guarantee
    {
        id: 'guarantee',
        type: 'guarantee',
        animation: 'fade',
        data: {},
    },

    // 34. Price reveal
    {
        id: 'price-reveal',
        type: 'priceReveal',
        animation: 'scale',
        data: {
            items: [
                { label: '60-Minute Live Workshop + Replay', value: '$297' },
                { label: 'The Money Copy Framework', value: '$197' },
                { label: 'Headline Alchemy Templates', value: '$97' },
                { label: 'The $97 Email Sequence (Swipe File)', value: '$147' },
                { label: 'Pricing Psychology Masterclass', value: '$97' },
                { label: 'Lifetime Access + Updates', value: '$197' },
            ],
            totalValue: '$1,032',
            price: '$97',
        },
    },

    // 35. Final urgency
    {
        id: 'urgency-final',
        type: 'urgency',
        animation: 'slide-up',
        data: {
            text: "This price won't last. Every week you wait is another week of writing for free.",
        },
    },

    // 36. Final proof — back-to-back double hit
    {
        id: 'testimonial-6',
        type: 'testimonial',
        animation: 'slide-up',
        variant: 'highlight',
        data: {
            name: 'Maria',
            text: "Ana's framework is pure gold. I re-launched my newsletter 6 weeks ago and already have 2,755 engaged subscribers. The templates saved me months of work.",
            avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&auto=format&fit=crop',
            detail: '2,755 engaged subscribers in 6 weeks',
        },
    },

    // 37. SUNK COST acknowledgment + final CTA
    {
        id: 'cta-3',
        type: 'cta',
        animation: 'scale',
        data: {
            headline: "You've read this far. You've seen the proof, the stories, the results. The only question left is — are you in?",
            buttonText: 'YES — I WANT IN ($97)',
        },
    },

    // IMAGE: Words Dissolving Into Gold Coins — words literally become money (feed-03)
    {
        id: 'image-feed-03',
        type: 'image',
        animation: 'scale',
        variant: 'fullBleed',
        data: {
            src: '/imgs/word-into-money/feed-03.jpeg',
            alt: 'Stream of letters and words dissolving into shiny gold coins mid-air',
            caption: 'Words into money. That\'s not a metaphor.',
        },
    },

    // IMAGE: Golden Door — the opportunity awaits (feed-09)
    {
        id: 'image-feed-09',
        type: 'image',
        animation: 'fade',
        variant: 'fullBleed',
        data: {
            src: '/imgs/word-into-money/feed-09.jpeg',
            alt: 'Single golden door standing open in dark landscape with warm light pouring through',
            caption: 'The door is open. The only question is whether you\'ll walk through it.',
        },
    },

    // 38. Checkout
    {
        id: 'checkout',
        type: 'checkout',
        animation: 'slide-up',
        data: {},
    },
];

// ─────────────────────────────────────────────
// PHASE 2: Infinite Pool Content
// Includes all card types for maximum variety
// ─────────────────────────────────────────────

export const infinitePool: FeedItem[] = [
    // TESTIMONIALS
    {
        id: 'pool-t1', type: 'testimonial', data: {
            name: 'Mary B.',
            text: "I was skeptical about another writing course. But this isn't a writing course — it's a money course. Made my investment back 10x in the first month.",
            detail: 'ROI: 10x in first month',
        },
    },
    {
        id: 'pool-t2', type: 'testimonial', variant: 'glass', data: {
            name: 'Hilde',
            text: "The Substack Bestseller badge showed up within 48 hours of implementing Ana's framework. I literally cried.",
            avatarUrl: '/testimavatar/44.webp',
            detail: 'Substack Bestseller',
        },
    },
    {
        id: 'pool-t3', type: 'testimonial', data: {
            name: 'David R.',
            text: "Been writing for 3 years and never made a dime. Watched the workshop on a Tuesday, launched my first paid product on Thursday. Made $847 by Sunday.",
            detail: '$847 in first weekend',
        },
    },
    {
        id: 'pool-t4', type: 'testimonial', variant: 'highlight', data: {
            name: 'Tina L.',
            text: "The email sequence template alone made me $2,100. I literally copied Ana's framework, changed the words to fit my niche, and hit send. That's it.",
            detail: '$2,100 from email sequence',
        },
    },
    {
        id: 'pool-t5', type: 'testimonial', data: {
            name: 'James W.',
            text: "I have a finance newsletter with 380 subscribers. Everyone said I needed 10K before I could monetise. Ana's workshop proved them all wrong. Made $1,200 last month.",
            detail: '380 subscribers → $1,200/month',
        },
    },
    {
        id: 'pool-t6', type: 'testimonial', variant: 'glass', data: {
            name: 'Lisa M.',
            text: "Quit my copywriting agency to go independent after this workshop. The frameworks are that good. Now earning more working half the hours.",
            detail: 'Agency → Independent',
        },
    },
    {
        id: 'pool-t7', type: 'testimonial', data: {
            name: 'Chris P.',
            text: "My open rates went from 32% to 58% after applying the Headline Alchemy module. That's not a typo. Same list, different words.",
            detail: '32% → 58% open rate',
        },
    },
    {
        id: 'pool-t8', type: 'testimonial', variant: 'highlight', data: {
            name: 'Nadia K.',
            text: "I was charging $15 for my guide. After the pricing psychology module, I raised it to $67 and conversions WENT UP. Wild.",
            detail: '$15 → $67, higher conversions',
        },
    },

    // OBJECTION BUSTERS
    {
        id: 'pool-ob1', type: 'problem', variant: 'dark', data: {
            text: "\"I don't have anything to sell.\"\n\nYet. You don't have anything to sell YET. But you have expertise, experience, and a perspective that people value. This workshop shows you how to package what's already in your head into something people will pay for.",
        },
    },
    {
        id: 'pool-ob2', type: 'problem', data: {
            text: "\"I'm not an expert.\"\n\nYou don't need to be THE expert. You just need to be a few steps ahead of the person you're helping. If you've solved a problem for yourself, you can teach others to solve it too. That's worth money.",
        },
    },
    {
        id: 'pool-ob3', type: 'problem', variant: 'dark', data: {
            text: "\"$97 is a lot right now.\"\n\nI get it. But let me reframe: $97 is one mediocre dinner out. One tank of gas. One subscription you forgot to cancel. It's also the price of learning to write words that make you money for the rest of your life.",
        },
    },
    {
        id: 'pool-ob4', type: 'problem', data: {
            text: "\"I tried selling before and it didn't work.\"\n\nThat's because nobody taught you how to write the words that sell. Having a product isn't enough. Having an audience isn't enough. You need copy that bridges the two. That's what this workshop is.",
        },
    },

    // STATS (with visual variant variety)
    {
        id: 'pool-s1', type: 'stat', variant: 'dark', data: { number: '47x', context: "average ROI for Word Into Money students." },
    },
    {
        id: 'pool-s2', type: 'stat', data: { number: '2,347', context: "writers have completed this workshop." },
    },
    {
        id: 'pool-s3', type: 'stat', variant: 'highlight', data: { number: '58%', context: "of students make their money back within 7 days." },
    },
    {
        id: 'pool-s4', type: 'stat', data: { number: '$847', context: "average first-month earnings for new students." },
    },

    // QUOTES (with variant variety)
    {
        id: 'pool-q1', type: 'quote', variant: 'glass', data: { quote: "Every word you write is either making you money or it isn't. This workshop teaches you to write the kind that does." },
    },
    {
        id: 'pool-q2', type: 'quote', data: { quote: "The best copywriters aren't better writers. They're better thinkers." },
    },
    {
        id: 'pool-q3', type: 'quote', variant: 'dark', data: { quote: "Your audience is already reading your stuff. The only question is whether they'll ever pay for it." },
    },
    {
        id: 'pool-q4', type: 'quote', data: { quote: "You're one framework away from turning free readers into paying customers." },
    },

    // MICRO-STORIES (narrative investment builders)
    {
        id: 'pool-ms1', type: 'problem', variant: 'dark', data: {
            text: "Picture this: You wake up to 3 new payment notifications.\n\nYou didn't launch anything new. You didn't post on social media. Your email sequence — the one you wrote in 2 hours using the workshop templates — is working while you sleep.\n\nThat's what good copy does.",
        },
    },
    {
        id: 'pool-ms2', type: 'problem', data: {
            text: "One student — a parenting blogger with 200 subscribers — watched the workshop on a Monday.\n\nBy Friday she had created a $27 PDF guide using the Offer Engine module. By Sunday she'd made $459 from a single email to her tiny list.\n\nThe size of your list doesn't matter. The words do.",
        },
    },
    {
        id: 'pool-ms3', type: 'problem', variant: 'dark', data: {
            text: "What would change if you made an extra $2,000/month from your writing?\n\nNot from a side hustle. Not from freelancing. From your own words, your own audience, your own products.\n\nThat's not a fantasy. That's what copy frameworks make possible. And $97 is the price of entry.",
        },
    },

    // TEASERS for infinite pool (curiosity loops that resolve in CTAs)
    {
        id: 'pool-teaser1', type: 'teaser', data: {
            text: "The students who get the fastest results all do one thing differently. Keep scrolling — you'll see exactly what it is.",
        },
    },
    {
        id: 'pool-teaser2', type: 'teaser', data: {
            text: "There's a reason this workshop costs $97 and not $997. And it's not because it's worth less...",
        },
    },

    // BRIDGES for infinite pool (sunk cost + narrative)
    {
        id: 'pool-bridge1', type: 'bridge', data: {
            text: "Still scrolling? That tells me something about you — you're serious about this.",
        },
    },
    {
        id: 'pool-bridge2', type: 'bridge', data: {
            text: "You've invested time reading this. You already know this is different.",
        },
    },

    // URGENCY for infinite pool (loss aversion)
    {
        id: 'pool-urg1', type: 'urgency', data: {
            text: "Every week you wait is another week of writing for free. How many more can you afford?",
        },
    },
    {
        id: 'pool-urg2', type: 'urgency', data: {
            text: "Someone just enrolled while you were reading this. They'll be writing profitable copy by tomorrow.",
        },
    },

    // IMAGES in infinite pool — visual breaks every few cycles
    {
        id: 'pool-img1', type: 'image', animation: 'scale', data: {
            src: '/imgs/word-into-money/feed-01.jpeg',
            alt: 'Golden typewriter glowing in darkness',
            caption: 'Your words have value. This workshop shows you how to unlock it.',
        },
    },
    {
        id: 'pool-img2', type: 'image', animation: 'fade', data: {
            src: '/imgs/word-into-money/feed-06.jpeg',
            alt: 'Glowing open book floating on dark water at twilight',
            caption: 'The power has been in your words the whole time.',
        },
    },
    {
        id: 'pool-img3', type: 'image', animation: 'scale', data: {
            src: '/imgs/word-into-money/feed-09.jpeg',
            alt: 'Golden door standing open in dark landscape',
            caption: 'The door is open. The only question is whether you\'ll walk through it.',
        },
    },
    {
        id: 'pool-img4', type: 'image', animation: 'fade', data: {
            src: '/imgs/word-into-money/feed-10.jpeg',
            alt: 'Hand writing golden light trails in darkness',
            caption: 'Writing is the most powerful skill in the creator economy.',
        },
    },
];
