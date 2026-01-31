# 🚀 Wellstone Breads - Launch Checklist

**Current Status:** Site design complete, awaiting product setup and final testing

**Live Preview:** https://02f16b36.wellstone-breads.pages.dev

---

## ✅ Completed

- [x] Professional design system with artisan bakery aesthetic
- [x] Custom wheat-themed logo and favicon
- [x] Responsive layout (mobile, tablet, desktop)
- [x] Shopping cart with localStorage persistence
- [x] Checkout flow with Stripe integration
- [x] Order management system in ContentFlow
- [x] Email notifications (customer + merchant)
- [x] Cloudflare Pages deployment pipeline
- [x] Database models (Product, Order, OrderItem)
- [x] All API endpoints (products, orders, checkout, webhooks)

---

## 📋 Next Steps to Go Live

### Step 1: Create Site in ContentFlow (5 minutes)

1. **Log into ContentFlow:**
   ```
   https://contentflow.vercel.app/dashboard
   ```

2. **Click "Create New Site"** and fill in:
   - **Site Name:** `Wellstone Breads`
   - **Domain:** `wellstone-breads.pages.dev` (or your custom domain)
   - **GitHub Repository:** `wellstone-breads`
   - **GitHub Owner:** `[your-github-username]`
   - **Branch:** `main`

3. **Copy the Site ID** from the URL after creation:
   ```
   https://contentflow.vercel.app/dashboard/sites/[SITE-ID]
   ```

4. **Update Wellstone Breads .env:**
   ```bash
   cd /Users/administrator/RiderProjects/WellstoneSoftware/projects/wellstone-breads

   # Add to .env file
   echo "PUBLIC_SITE_ID=[paste-site-id-here]" >> .env
   echo "PUBLIC_API_BASE_URL=https://contentflow.vercel.app" >> .env
   ```

5. **Rebuild and redeploy:**
   ```bash
   npm run build
   wrangler pages deploy dist --project-name=wellstone-breads
   ```

---

### Step 2: Add Products via ContentFlow (10 minutes)

1. **Navigate to Products Dashboard:**
   ```
   https://contentflow.vercel.app/dashboard/products
   ```

2. **Add Your First Product - Classic Sourdough:**
   - Click "Add Product"
   - **Name:** `Classic Sourdough`
   - **Slug:** `classic-sourdough` (auto-generated)
   - **Description:** `Our signature loaf with a tangy flavor, chewy crust, and soft interior. Made with 100% organic flour and naturally fermented for 48 hours.`
   - **Category:** `bread`
   - **Price:** `12.00`
   - **Image:** Upload a photo or select from media library
   - **Featured:** ✓ Yes
   - **Available:** ✓ Yes
   - Click "Create Product"

3. **Add More Products:**

   **Rosemary Focaccia:**
   - Name: `Rosemary Focaccia`
   - Description: `Light and airy Italian flatbread topped with fresh rosemary, sea salt, and premium olive oil. Perfect for sandwiches or dipping.`
   - Category: `focaccia`
   - Price: `10.00`
   - Featured: ✓ Yes

   **Sea Salt Pretzels (6-pack):**
   - Name: `Sea Salt Pretzels (6-pack)`
   - Description: `Soft and chewy pretzels topped with coarse sea salt. Made fresh daily using traditional German techniques.`
   - Category: `pretzel`
   - Price: `8.00`
   - Featured: ✓ Yes

4. **Deploy Products to Site:**
   - Click "Deploy Products to Site" button
   - Wait for GitHub commit confirmation
   - Site will auto-rebuild in 5-10 minutes

---

### Step 3: Test Complete Order Flow (10 minutes)

**Wait for site rebuild to complete, then:**

1. **Visit the Live Site:**
   ```
   https://wellstone-breads.pages.dev
   ```

2. **Browse Products:**
   - Verify all 3 products display
   - Check images, prices, descriptions
   - Test "Add to Cart" buttons

3. **Test Shopping Cart:**
   - Add multiple products
   - Update quantities
   - Remove items
   - Close/reopen browser tab (cart should persist)

4. **Complete Test Order:**
   - Click "Proceed to Checkout"
   - Fill in customer info:
     - Name: `Test Customer`
     - Email: `your-email@example.com`
     - Phone: `555-1234`
     - Pickup Time: Select tomorrow at noon
     - Special Instructions: `This is a test order`
   - Click "Proceed to Payment"

5. **Process Test Payment:**
   - Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/34`)
   - CVC: Any 3 digits (e.g., `123`)
   - ZIP: Any 5 digits (e.g., `12345`)
   - Complete payment

6. **Verify Order Confirmation:**
   - Should redirect to order confirmation page
   - Check email for confirmation (both customer and merchant)
   - Cart should be cleared

---

### Step 4: Verify Order in Dashboard (5 minutes)

1. **Log into ContentFlow:**
   ```
   https://contentflow.vercel.app/dashboard/orders
   ```

2. **Check Test Order:**
   - Verify order appears in "Confirmed" tab
   - Click to view details
   - Confirm all information is correct:
     - Customer name, email, phone
     - Order items and quantities
     - Pricing and totals
     - Pickup time
     - Special instructions
     - Payment status: "paid"

3. **Test Status Updates:**
   - Update status: `Confirmed` → `Preparing`
   - Update status: `Preparing` → `Ready`
   - Update status: `Ready` → `Completed`
   - Verify status updates save correctly

---

### Step 5: Production Readiness (15 minutes)

1. **Switch Stripe to Live Mode:**
   - Go to https://dashboard.stripe.com
   - Toggle from "Test mode" to "Live mode"
   - Get live API keys (Publishable Key + Secret Key)
   - Update Vercel environment variables:
     ```bash
     cd /Users/administrator/RiderProjects/WellstoneSoftware/projects/contentflow
     vercel env add STRIPE_SECRET_KEY production
     # Paste live secret key

     vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
     # Paste live publishable key
     ```

2. **Create Live Webhook:**
   - Go to https://dashboard.stripe.com/webhooks (ensure Live mode)
   - Click "Add endpoint"
   - URL: `https://contentflow.vercel.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.payment_failed`, `charge.refunded`
   - Copy webhook secret
   - Update Vercel:
     ```bash
     vercel env add STRIPE_WEBHOOK_SECRET production
     # Paste live webhook secret
     ```

3. **Verify Resend Email:**
   - Go to https://resend.com/domains
   - Add and verify `wellstonebreads.com` domain
   - Update DNS records as instructed
   - Update RESEND_FROM_EMAIL:
     ```bash
     vercel env add RESEND_FROM_EMAIL production
     # Enter: orders@wellstonebreads.com
     ```

4. **Redeploy ContentFlow:**
   ```bash
   cd /Users/administrator/RiderProjects/WellstoneSoftware/projects/contentflow
   vercel --prod
   ```

---

### Step 6: Custom Domain (Optional, 15 minutes)

**If you own wellstonebreads.com:**

1. **Configure Cloudflare Pages:**
   ```bash
   wrangler pages project create wellstone-breads
   wrangler pages project set-custom-domain wellstone-breads wellstonebreads.com
   ```

2. **Update DNS:**
   - Add CNAME record: `@` → `wellstone-breads.pages.dev`
   - Or follow Cloudflare's DNS instructions

3. **Update Site URLs:**
   - Update `PUBLIC_API_BASE_URL` in site .env
   - Update site domain in ContentFlow dashboard
   - Update Stripe webhook URLs

---

## 🧪 Testing Checklist

Before accepting real orders, test:

- [ ] Products display correctly on homepage
- [ ] Product images load
- [ ] Add to cart works
- [ ] Cart persists across page refreshes
- [ ] Quantity updates work
- [ ] Remove from cart works
- [ ] Checkout form validates properly
- [ ] Stripe payment processes
- [ ] Order confirmation page displays
- [ ] Customer receives email confirmation
- [ ] Merchant receives new order email
- [ ] Order appears in ContentFlow dashboard
- [ ] Order details are accurate
- [ ] Status updates work
- [ ] Mobile view works correctly
- [ ] Tablet view works correctly
- [ ] Desktop view works correctly

---

## 📞 Support Contacts

**Stripe Issues:**
- Dashboard: https://dashboard.stripe.com
- Docs: https://stripe.com/docs

**Cloudflare Issues:**
- Dashboard: https://dash.cloudflare.com
- Docs: https://developers.cloudflare.com/pages

**Resend Issues:**
- Dashboard: https://resend.com/domains
- Docs: https://resend.com/docs

**ContentFlow Dashboard:**
- URL: https://contentflow.vercel.app/dashboard

---

## 💰 Cost Summary

**Monthly Operating Costs:**
- Cloudflare Pages: **$0** (unlimited bandwidth)
- Vercel: **$0** (hobby tier)
- Neon PostgreSQL: **$0** (free tier)
- Resend: **$0** (3000 emails/month free)
- **Total: $0/month**

**Per Transaction:**
- Stripe: **2.9% + $0.30** per transaction

**Example (20 orders/month at $12 avg):**
- Gross Revenue: **$240**
- Stripe Fees: **~$13**
- **Net Revenue: $227**

---

## 🎉 You're Ready to Launch!

Once all steps are complete:

1. ✅ Replace test products with real product photos
2. ✅ Add 3-5 products you want to sell
3. ✅ Complete one test order end-to-end
4. ✅ Verify emails are received
5. ✅ Switch Stripe to live mode
6. ✅ Share site URL with friends/family for testing
7. ✅ Announce launch on social media!

**Customer Site:** https://wellstone-breads.pages.dev
**Admin Dashboard:** https://contentflow.vercel.app/dashboard

---

## 📝 Training Nicole

**To Manage Products:**
1. Log into ContentFlow dashboard
2. Go to Products tab
3. Add/edit/delete products as needed
4. Click "Deploy Products to Site"
5. Wait 5-10 minutes for site update

**To Manage Orders:**
1. Go to Orders tab
2. View new orders (will be in "Confirmed" status)
3. Update status as you fulfill:
   - `Confirmed` - Payment received, ready to bake
   - `Preparing` - Currently baking
   - `Ready` - Ready for customer pickup
   - `Completed` - Customer picked up

**To Check Revenue:**
- Orders tab shows all paid orders
- Can filter by status
- Export to CSV (future feature)

---

**Last Updated:** 2026-01-31
**Status:** Ready for product setup and testing
