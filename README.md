# Workshop Landing Page Funnel

A complete landing page funnel built with Next.js, Tailwind CSS, React Hook Form, Supabase, and Stripe for selling workshop access.

## 🚀 Features

- **Modern Landing Page**: Beautiful, conversion-optimized design with multiple CTA sections
- **Lead Collection**: Form validation with React Hook Form
- **Secure Payments**: Stripe integration for $97 one-time payment
- **Database**: Supabase for storing leads and payment status
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Webhook Support**: Stripe webhooks for payment confirmation

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Forms**: React Hook Form
- **Database**: Supabase
- **Payments**: Stripe
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📁 Project Structure

```
workshop-landing/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── leads/              # Lead creation API
│   │   │   ├── create-checkout-session/ # Stripe checkout
│   │   │   └── webhooks/           # Stripe webhooks
│   │   ├── lead-collection/        # Form page
│   │   ├── success/               # Thank you page
│   │   └── page.tsx               # Landing page
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   └── forms/                 # Form components
│   ├── lib/                       # Configuration files
│   ├── types/                     # TypeScript definitions
│   └── utils/                     # Utility functions
├── public/                        # Static assets
└── package.json
```

## 🗄️ Database Schema

### Supabase Tables

Create this table in your Supabase database:

```sql
-- Create leads_bootcamp_brands table
CREATE TABLE public.leads_bootcamp_brands (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  email CHARACTER VARYING(255) NOT NULL,
  name CHARACTER VARYING(200) NOT NULL,
  has_checkout_session BOOLEAN NULL DEFAULT false,
  stripe_session_id CHARACTER VARYING(255) NULL,
  has_paid BOOLEAN NULL DEFAULT false,
  payment_completed_at TIMESTAMP WITH TIME ZONE NULL,
  referral_id CHARACTER VARYING(255) NULL, -- Rewardful affiliate tracking
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  CONSTRAINT leads_bootcamp_brands_pkey PRIMARY KEY (id),
  CONSTRAINT leads_bootcamp_brands_email_key UNIQUE (email)
) TABLESPACE pg_default;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_leads_bootcamp_brands_updated_at 
  BEFORE UPDATE ON leads_bootcamp_brands 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_bootcamp_brands_email 
ON public.leads_bootcamp_brands USING btree (email) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_leads_bootcamp_brands_stripe_session 
ON public.leads_bootcamp_brands USING btree (stripe_session_id) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_leads_bootcamp_brands_created_at 
ON public.leads_bootcamp_brands USING btree (created_at) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_leads_bootcamp_brands_has_paid 
ON public.leads_bootcamp_brands USING btree (has_paid) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_leads_bootcamp_brands_referral_id 
ON public.leads_bootcamp_brands USING btree (referral_id) TABLESPACE pg_default;

-- Add column comments
COMMENT ON COLUMN public.leads_bootcamp_brands.referral_id 
IS 'Rewardful affiliate referral ID (UUID string) for tracking affiliate commissions';
```

## ⚙️ Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd workshop-landing
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
WORKSHOP_PRICE=9700  # $97.00 in cents
```

### 3. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the database schema above
3. Copy your project URL and API keys to `.env.local`

### 4. Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe dashboard
3. Set up a webhook endpoint pointing to `/api/webhooks/stripe`
4. Add the webhook secret to your environment variables

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the landing page.

## 🌐 Deployment

### Vercel Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add all environment variables in the Vercel dashboard
4. Update `NEXT_PUBLIC_APP_URL` to your production URL
5. Update Stripe webhook URL to point to your production domain

### Environment Variables for Production

Make sure to set all environment variables in your Vercel dashboard, replacing test keys with live keys for production.

## 🔄 User Flow

1. **Landing Page** (`/`) - User sees compelling workshop offer
2. **CTA Click** - User clicks any "Secure Your Spot" button
3. **Lead Collection** (`/lead-collection`) - User fills out contact form
4. **Form Submit** - Lead is saved to Supabase
5. **Stripe Redirect** - User is redirected to Stripe checkout
6. **Payment** - User completes payment on Stripe
7. **Webhook** - Stripe sends webhook to update payment status
8. **Success Page** (`/success`) - User sees confirmation and next steps

## 🎨 Customization

### Styling
- Modify colors in `tailwind.config.js`
- Update components in `src/components/ui/`
- Customize page layouts in `src/app/`

### Content
- Update landing page copy in `src/app/page.tsx`
- Modify form fields in `src/components/forms/LeadForm.tsx`
- Customize success page in `src/app/success/page.tsx`

### Price
- Change `WORKSHOP_PRICE` in environment variables
- Update display prices throughout the app

## 📊 Analytics & Monitoring

Consider adding:
- Google Analytics or Plausible for traffic tracking
- Hotjar for user behavior analysis
- Sentry for error monitoring
- PostHog for product analytics

## 🔐 Security Features

- Form validation on both client and server
- Stripe webhook signature verification
- Environment variable protection
- SQL injection prevention with Supabase
- CORS protection on API routes

## 🆘 Support

For issues or questions:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure Supabase database schema is created
4. Test Stripe webhook endpoint with Stripe CLI

## 📄 License

This project is for educational purposes. Customize as needed for your workshop.
