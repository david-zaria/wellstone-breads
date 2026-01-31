# Wellstone Breads - Complete Deployment Guide

## 🎯 What We Built - Full System Overview

### ContentFlow CMS (Backend) - Already at contentflow.vercel.app
**Database Models:**
- ✅ Product (name, price, category, images, availability, featured)
- ✅ Order (customer info, items, payment status, fulfillment tracking)
- ✅ OrderItem (product snapshots at time of order)

**Admin Dashboards:**
- ✅ `/dashboard/products` - Create, edit, delete, deploy products
- ✅ `/dashboard/orders` - View orders, update status, filter by status

**API Endpoints:**
- ✅ Product CRUD: GET/POST/PUT/DELETE `/api/sites/[siteId]/products`
- ✅ Product Deploy: POST `/api/sites/[siteId]/products/deploy`
- ✅ Order Management: GET/PUT `/api/sites/[siteId]/orders`
- ✅ Checkout: POST `/api/sites/[siteId]/checkout`
- ✅ Stripe Webhook: POST `/api/webhooks/stripe`

**Payment Processing:**
- ✅ Stripe integration (test keys configured)
- ✅ Checkout session creation
- ✅ Webhook handler for payment events
- ✅ Email notifications (customer + merchant)

### Wellstone Breads Storefront (Customer Site)
**Pages:**
- ✅ `/` - Homepage with product catalog, featured items, about section
- ✅ `/checkout` - Customer checkout form with order summary
- ✅ `/order-confirmation` - Success page after payment

**Components:**
- ✅ ProductCard - Product display with add to cart
- ✅ ShoppingCart - Slide-out cart drawer with localStorage
- ✅ Header/Footer - Bakery-themed navigation

**Features:**
- ✅ Real-time cart updates
- ✅ Cart persistence across page reloads
- ✅ Responsive design (mobile-first)
- ✅ Bakery color theme (browns, warm neutrals)

---

## 🚀 Step-by-Step Deployment (Automated from ContentFlow)

### Phase 1: Configure Services (One-Time Setup)

#### 1A. Stripe Webhook Setup
```bash
# Visit: https://dashboard.stripe.com/test/webhooks
# Click "Add endpoint"
# URL: https://contentflow.vercel.app/api/webhooks/stripe
# Events: checkout.session.completed, payment_intent.payment_failed, charge.refunded
# Copy webhook secret (starts with whsec_)
```

#### 1B. Resend Email Setup
```bash
# Visit: https://resend.com/api-keys
# Create API key
# Add verified domain: wellstonebreads.com
# Copy API key (starts with re_)
```

#### 1C. Add Environment Variables to Vercel
```bash
cd /Users/administrator/RiderProjects/WellstoneSoftware/projects/contentflow

# Stripe Webhook
vercel env add STRIPE_WEBHOOK_SECRET production
# Paste: whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Resend Email
vercel env add RESEND_API_KEY production
# Paste: re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

vercel env add RESEND_FROM_EMAIL production
# Paste: orders@wellstonebreads.com

# E-commerce Settings
vercel env add NEXT_PUBLIC_ORDER_EMAIL production
# Paste: nicole@wellstonebreads.com

vercel env add ORDER_NUMBER_PREFIX production
# Paste: WB

# Redeploy to pick up new env vars
vercel --prod
```

---

### Phase 2: Create Site in ContentFlow (Fully Automated)

#### 2A. Log into ContentFlow
```
https://contentflow.vercel.app/dashboard
```

#### 2B. Create New Site
1. Click "Create New Site"
2. Fill in details:
   - **Site Name:** Wellstone Breads
   - **Domain:** wellstonebreads.pages.dev
   - **GitHub Repo:** wellstone-breads
   - **GitHub Owner:** [your-username]
   - **Branch:** main

3. Click "Create Site"

**What Happens Automatically:**
- ✅ GitHub fine-grained token generated
- ✅ Site record created in database
- ✅ GitHub repo access configured
- ✅ Deployment pipeline ready

---

### Phase 3: Add Products via Dashboard (5 minutes)

#### 3A. Navigate to Products Dashboard
```
https://contentflow.vercel.app/dashboard/products
```

#### 3B. Add Products
Click "Add Product" and fill in:

**Product 1: Classic Sourdough**
- Name: Classic Sourdough
- Slug: classic-sourdough (auto-generated)
- Description: Our signature loaf with a tangy flavor, chewy crust, and soft interior. Made with 100% organic flour and naturally fermented for 48 hours.
- Category: bread
- Price: 12.00
- Featured: ✓
- Available: ✓

**Product 2: Rosemary Focaccia**
- Name: Rosemary Focaccia
- Slug: rosemary-focaccia
- Description: Light and airy Italian flatbread topped with fresh rosemary, sea salt, and premium olive oil. Perfect for sandwiches or dipping.
- Category: focaccia
- Price: 10.00
- Featured: ✓
- Available: ✓

**Product 3: Sea Salt Pretzels (6-pack)**
- Name: Sea Salt Pretzels (6-pack)
- Slug: sea-salt-pretzels
- Description: Soft and chewy pretzels topped with coarse sea salt. Made fresh daily using traditional German techniques.
- Category: pretzel
- Price: 8.00
- Featured: ✓
- Available: ✓

#### 3C. Deploy Products to Site
1. Click "Deploy Products to Site" button
2. Wait for confirmation (products.json committed to GitHub)

**What Happens Automatically:**
- ✅ Products data serialized to JSON
- ✅ Committed to GitHub: `public/data/products.json`
- ✅ GitHub Pages/Cloudflare Pages auto-rebuilds
- ✅ Site updates with new products (5-10 minutes)

---

### Phase 4: Deploy Wellstone Breads Site

#### 4A. Configure Environment
```bash
cd /Users/administrator/RiderProjects/WellstoneSoftware/projects/wellstone-breads

# Create .env file with site ID (get from ContentFlow dashboard)
cat > .env << EOF
PUBLIC_SITE_ID=your-site-id-from-contentflow
PUBLIC_API_BASE_URL=https://contentflow.vercel.app
EOF
```

#### 4B. Build Site
```bash
npm run build
```

#### 4C. Deploy to Cloudflare Pages
```bash
# Install Wrangler CLI (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy (first time)
wrangler pages deploy dist --project-name=wellstone-breads

# Note the URL: https://wellstone-breads.pages.dev
```

#### 4D. Setup GitHub Actions (Optional - Auto Deploy on Push)
```bash
# Copy GitHub Actions workflow
mkdir -p .github/workflows

cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=wellstone-breads
EOF

# Add secrets to GitHub repo:
# CLOUDFLARE_API_TOKEN
# CLOUDFLARE_ACCOUNT_ID

# Commit and push
git add .github/workflows/deploy.yml
git commit -m "Add Cloudflare Pages auto-deploy"
git push
```

---

## 🧪 Testing the Complete Flow

### Test 1: Product Display
1. Visit: https://wellstone-breads.pages.dev
2. Verify all 3 products display
3. Check featured products section
4. Verify images, prices, descriptions

### Test 2: Shopping Cart
1. Click "Add to Cart" on any product
2. Verify cart drawer opens
3. Add multiple products
4. Update quantities
5. Remove items
6. Close page and reopen - verify cart persists

### Test 3: Checkout Flow
1. Click "Proceed to Checkout"
2. Fill in customer form:
   - Name: Test Customer
   - Email: test@example.com
   - Phone: 555-1234
   - Pickup Time: [tomorrow at noon]
   - Notes: "Test order"
3. Click "Proceed to Payment"
4. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: any future date
   - CVC: any 3 digits
   - ZIP: any 5 digits
5. Complete payment

### Test 4: Order Management
1. Log into ContentFlow: https://contentflow.vercel.app/dashboard/orders
2. Verify test order appears
3. Check order details:
   - Customer info
   - Items ordered
   - Total amount
   - Payment status: "paid"
4. Update order status: pending → confirmed → preparing → ready → completed
5. Verify status updates save

### Test 5: Email Notifications
1. Check email for test@example.com:
   - Should receive order confirmation
   - Verify order number, items, total
2. Check email for nicole@wellstonebreads.com:
   - Should receive new order notification
   - Verify customer details, items

---

## 📊 Monitoring & Analytics

### Order Metrics
- View in ContentFlow: `/dashboard/orders`
- Filter by status
- Track fulfillment pipeline
- Monitor payment success rate

### Revenue Tracking
- All orders stored in database
- Calculate daily/weekly/monthly totals
- Track average order value
- Monitor payment failures

### Customer Communication
- All order emails include order number
- Customers can reference order number for inquiries
- Update order status to keep customers informed

---

## 🔧 Maintenance & Updates

### Adding New Products
1. Log into ContentFlow: `/dashboard/products`
2. Click "Add Product"
3. Fill in product details
4. Click "Deploy Products to Site"
5. Site updates automatically (5-10 minutes)

### Updating Product Prices
1. Log into ContentFlow: `/dashboard/products`
2. Click "Edit" on product
3. Update price
4. Click "Deploy Products to Site"
5. **Note:** Existing orders use historical prices

### Managing Orders
1. Log into ContentFlow: `/dashboard/orders`
2. View all orders
3. Update order status as you fulfill them:
   - **Pending** → Payment received, not confirmed yet
   - **Confirmed** → Ready to start baking
   - **Preparing** → Currently baking
   - **Ready** → Ready for pickup
   - **Completed** → Customer picked up

### Handling Refunds
1. Log into Stripe Dashboard
2. Find payment
3. Issue refund
4. Webhook automatically updates order status to "refunded"

---

## 💰 Cost Breakdown

### Monthly Operating Costs
- **Cloudflare Pages:** $0 (unlimited bandwidth, 500 builds/month)
- **Vercel (ContentFlow):** $0 (hobby tier)
- **Neon PostgreSQL:** $0 (free tier: 512MB storage)
- **Resend Email:** $0 (100 emails/day = 3000/month)
- **Stripe:** 2.9% + $0.30 per transaction

### Example Revenue Calculation (20 orders/month)
- Revenue: 20 orders × $12 avg = **$240**
- Stripe fees: 20 × ($12 × 2.9% + $0.30) = **$13**
- **Net Revenue: $227/month**
- **Operating Cost: $0/month**

### When to Upgrade
- **Vercel Pro ($20/mo):** When you exceed 100GB bandwidth/month
- **Neon Pro ($19/mo):** When you exceed 512MB database storage
- **Resend Paid ($20/mo):** When you exceed 3000 emails/month
- **Domain ($9/year):** When ready to use wellstonebreads.com instead of .pages.dev

---

## 🎉 You're Live!

### Customer Experience
1. Visit: https://wellstone-breads.pages.dev
2. Browse products
3. Add to cart
4. Checkout
5. Pay with credit card
6. Receive confirmation email
7. Pick up fresh bread!

### Nicole's Experience
1. Log into: https://contentflow.vercel.app/dashboard/orders
2. View new orders
3. Update status as orders progress
4. Customer automatically notified
5. Track revenue and fulfillment

### Fully Automated
- ✅ Payment processing
- ✅ Order creation
- ✅ Email notifications
- ✅ Product updates
- ✅ Site deployments
- ✅ Cart management

---

## 🆘 Troubleshooting

### Products Not Showing on Site
1. Check ContentFlow: `/dashboard/products`
2. Verify products are marked "Available"
3. Click "Deploy Products to Site" again
4. Wait 10 minutes for Cloudflare Pages rebuild

### Orders Not Appearing
1. Check Stripe Dashboard for successful payment
2. Verify STRIPE_WEBHOOK_SECRET is set in Vercel
3. Check webhook logs in Stripe Dashboard
4. Verify order in database via ContentFlow

### Email Not Sending
1. Verify RESEND_API_KEY in Vercel env vars
2. Check Resend dashboard for email logs
3. Verify sender domain is verified in Resend
4. Check spam folder

### Payment Failing
1. Use Stripe test card: 4242 4242 4242 4242
2. Check Stripe Dashboard for error messages
3. Verify STRIPE_SECRET_KEY is correct
4. Check browser console for errors

---

## 📞 Support Resources

- **Stripe Documentation:** https://stripe.com/docs
- **Cloudflare Pages:** https://developers.cloudflare.com/pages
- **Resend Docs:** https://resend.com/docs
- **ContentFlow Dashboard:** https://contentflow.vercel.app/dashboard

---

**Built with:** Astro, React, Tailwind CSS, Stripe, Cloudflare Pages, Vercel, PostgreSQL
**Cost:** $0/month + transaction fees
**Deployment Time:** ~30 minutes (one-time setup)
