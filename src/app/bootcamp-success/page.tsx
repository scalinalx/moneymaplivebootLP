import React from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import '../bootcamp/bootcamp.css';

export const metadata = {
  title: 'You’re in — The 6-Figures Newsletter Bootcamp',
  description: 'Your seat in the founding cohort is confirmed.',
  robots: 'noindex, nofollow',
  // Absolute URLs on purpose — metadataBase points at a parked domain that
  // can't serve the image (see src/app/bootcamp/page.tsx).
  openGraph: {
    title: 'I’m in — The 6-Figures Newsletter Bootcamp',
    description: 'Seven weeks, live, with Ana. 30 women turning what they know into six figures. We start August 15.',
    url: 'https://www.monetisesubstack.com/bootcamp-success',
    siteName: 'How We Grow',
    type: 'website',
    images: [{ url: 'https://www.monetisesubstack.com/imgs/bootcamp/og.jpg', width: 1200, height: 630, alt: 'The 6-Figures Newsletter Bootcamp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'I’m in — The 6-Figures Newsletter Bootcamp',
    description: 'Seven weeks, live, with Ana. 30 women turning what they know into six figures. We start August 15.',
    images: ['https://www.monetisesubstack.com/imgs/bootcamp/og.jpg'],
    creator: '@howwegrow',
  },
};

export default async function BootcampSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ leadId?: string; name?: string }>;
}) {
  const { leadId, name: namePreview } = await searchParams;

  // Personalise with the buyer's first name if we can (table may not exist yet).
  let firstName = '';
  if (leadId) {
    try {
      const { data } = await supabaseAdmin
        .from('bootcamp_leads')
        .select('name')
        .eq('id', leadId)
        .maybeSingle();
      if (data?.name) firstName = String(data.name).trim().split(/\s+/)[0];
    } catch {
      /* graceful: no personalisation */
    }
  }
  // Preview convenience: /bootcamp-success?name=Sarah lets you see the
  // personalised page locally without going through checkout.
  if (!firstName && namePreview) firstName = String(namePreview).trim().split(/\s+/)[0];

  return (
    <div className="bootcamp">
      <div className="wrap" style={{ paddingTop: 40, paddingBottom: 20 }}>
        <h1>You’re in{firstName ? `, ${firstName}` : ''}. <span className="hl">Welcome to the cohort.</span></h1>
        <p className="tagline">
          Your seat in the founding cohort is confirmed. A receipt is on its way to your inbox, and
          the real work starts August 15. Here’s exactly what happens now.
        </p>

        <h2>What happens now</h2>
        <ul className="inc">
          <li><b>Check your inbox.</b> Your welcome email with access to the full 50+ hour video library and the private cohort room is arriving in the next few minutes <em>(if you don’t see it, check spam/promotions and add me to your contacts)</em>.</li>
          <li><b>Your Week 1 roadmap</b> lands before August 15, so you know exactly what to watch and what to execute first — no overwhelm, one focus in the right order.</li>
          <li><b>First 10 in?</b> If you’re one of the first 10 to enroll, my team will reach out to schedule your private $1,500 1:1 strategy session with me.</li>
          <li><b>We start August 15.</b> Your first live hot seat call kicks off the 7 weeks. Bring your drafts and your numbers, and leave knowing your exact next move.</li>
        </ul>

        <p className="fine">
          Questions before we begin? Just reply to your welcome email — it comes straight to me and my team.
        </p>

        <p className="quote">“Stop shrinking the dream to fit the doubt.”</p>
        <p className="quote-src">Letter №347 · how we grow</p>
      </div>

      <footer>
        How We Grow · Ana · <a href="https://howwegrowtoday.substack.com">howwegrowtoday.substack.com</a>
      </footer>
    </div>
  );
}
