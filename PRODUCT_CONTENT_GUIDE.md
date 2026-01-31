# 📸 Product Content Guide - Wellstone Breads

Complete guide for adding products to your bakery store.

---

## ✅ What You Need for Each Product

### Required Information

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Product title (2-5 words) | `Classic Sourdough` |
| **Description** | What makes it special (2-4 sentences) | `Our signature loaf with a tangy flavor, chewy crust, and soft interior. Made with 100% organic flour and naturally fermented for 48 hours.` |
| **Price** | Dollar amount (no $ sign) | `12.00` |
| **Category** | bread, focaccia, or pretzel | `bread` |
| **Image** | High-quality product photo | Upload via media library |

### Optional Settings

| Field | Default | Purpose |
|-------|---------|---------|
| **Featured** | No | Show in "Featured Products" section |
| **Available** | Yes | Hide temporarily (sold out, seasonal) |
| **Sort Order** | 0 | Control display order (lower = first) |

---

## 📸 Product Photography Tips

### Photo Requirements

**Technical Specs:**
- **Format:** JPG or PNG
- **Min Size:** 1200px × 900px (4:3 ratio)
- **Max File Size:** 2MB
- **Resolution:** 72 DPI minimum

**Best Practices:**
- ✅ Natural lighting (near window, indirect sunlight)
- ✅ Clean, simple background (white, wood, marble)
- ✅ Show texture (crust detail, crumb structure)
- ✅ Include scale reference (cutting board, hands)
- ✅ Shoot from slight angle (not straight down)

**What to Avoid:**
- ❌ Direct flash (harsh shadows)
- ❌ Cluttered backgrounds
- ❌ Heavy filters or editing
- ❌ Blurry or dark photos
- ❌ Extreme close-ups

### Photo Examples

**Good Product Shot:**
```
- Bread on wooden cutting board
- Natural window light from side
- Shows golden crust texture
- Includes slice showing crumb
- Clean neutral background
```

**Reference:** See `/specs/IMG_5672.jpeg` for inspiration

---

## ✍️ Product Description Formula

### Template

```
[Hook: What makes it special] + [Details: Ingredients/process] + [Benefit: Why buy it]
```

### Examples

**Classic Sourdough:**
```
Our signature loaf with a tangy flavor, chewy crust, and soft interior.
Made with 100% organic flour and naturally fermented for 48 hours.
Perfect for sandwiches, toast, or enjoying with butter.
```

**Rosemary Focaccia:**
```
Light and airy Italian flatbread topped with fresh rosemary, sea salt, and premium olive oil.
Baked fresh daily using traditional techniques.
Perfect for sandwiches, dipping, or as a side for any meal.
```

**Sea Salt Pretzels (6-pack):**
```
Soft and chewy pretzels topped with coarse sea salt.
Made fresh daily using traditional German techniques.
Great for snacking, parties, or lunch boxes.
```

### Description Guidelines

**Length:**
- Minimum: 2 sentences (20-30 words)
- Optimal: 3-4 sentences (40-60 words)
- Maximum: 5 sentences (80 words)

**Include:**
- ✅ Taste/texture profile
- ✅ Key ingredients
- ✅ Baking process/tradition
- ✅ Suggested uses

**Avoid:**
- ❌ Generic phrases ("delicious," "amazing")
- ❌ Health claims without proof
- ❌ Competitor comparisons
- ❌ Overly technical jargon

---

## 💰 Pricing Strategy

### Factors to Consider

1. **Ingredient Costs**
   - Calculate per-loaf cost
   - Include all ingredients (flour, salt, water, starter)
   - Add packaging costs

2. **Labor & Time**
   - Prep time
   - Fermentation time
   - Baking time
   - Cooling & packaging

3. **Market Research**
   - Local bakery prices
   - Farmers market rates
   - Online artisan bread shops

4. **Profit Margin**
   - Target: 50-70% margin
   - Formula: `Price = (Cost × 2.5) to (Cost × 3)`
   - Example: $4 cost → $10-12 price

### Sample Price Points

| Product | Cost | Price | Margin |
|---------|------|-------|--------|
| Sourdough Loaf (2 lb) | $4.00 | $12.00 | 67% |
| Focaccia (1 lb) | $3.50 | $10.00 | 65% |
| Pretzels (6-pack) | $2.50 | $8.00 | 69% |
| Dinner Rolls (12) | $3.00 | $9.00 | 67% |

### Pricing Tips

- Round to whole dollars or .50 increments
- Consider bundle discounts (future feature)
- Seasonal pricing for special items
- Premium pricing for specialty ingredients

---

## 📦 Product Categories

### Current Categories

**bread:**
- Sourdough
- Whole wheat
- Rye
- Multigrain
- Baguettes
- Sandwich loaves

**focaccia:**
- Plain focaccia
- Rosemary focaccia
- Olive focaccia
- Tomato focaccia
- Garlic focaccia

**pretzel:**
- Classic pretzels
- Pretzel bites
- Stuffed pretzels
- Cinnamon sugar pretzels

### Adding New Categories

Currently limited to: bread, focaccia, pretzel

**To add more categories:**
1. Contact developer
2. Update Product model enum
3. Update ProductCard emoji mapping
4. Redeploy site

---

## 🎯 Product Content Checklist

Before adding a product, ensure you have:

### Content Ready
- [ ] Product name (clear, descriptive)
- [ ] Description (2-4 sentences)
- [ ] Price (researched, profitable)
- [ ] Category (bread/focaccia/pretzel)

### Photos Ready
- [ ] Main product photo (1200×900px min)
- [ ] Photo shows product clearly
- [ ] Good lighting, no blur
- [ ] Clean background
- [ ] File size under 2MB

### Details Confirmed
- [ ] Ingredients list (for customer questions)
- [ ] Allergen information (if applicable)
- [ ] Weight/size (for description)
- [ ] Shelf life (for customer questions)
- [ ] Storage instructions (for customer questions)

---

## 📝 Sample Product: Step-by-Step

### Example: Adding Classic Sourdough

**Step 1: Prepare Photo**
- Take photo of freshly baked loaf
- Natural lighting, wooden board
- Show crust texture and interior crumb
- Edit: slight brightness/contrast adjustment
- Resize to 1200×900px
- Save as `classic-sourdough.jpg`

**Step 2: Write Description**
```
Our signature sourdough loaf with a perfectly tangy flavor,
chewy golden crust, and soft airy interior. Made with 100%
organic flour and naturally fermented for 48 hours using our
house-made starter. Perfect for sandwiches, toast, or enjoyed
fresh with butter.
```
(4 sentences, 48 words)

**Step 3: Calculate Price**
- Ingredient cost: $3.50
- Time: 4 hours total (including fermentation)
- Target margin: 65%
- **Price: $12.00**

**Step 4: Enter in ContentFlow**
1. Go to Products dashboard
2. Click "Add Product"
3. Fill in:
   - Name: `Classic Sourdough`
   - Slug: `classic-sourdough` (auto-generated)
   - Description: [paste from Step 2]
   - Category: `bread`
   - Price: `12.00`
   - Image: Upload `classic-sourdough.jpg`
   - Featured: ✓ Yes
   - Available: ✓ Yes
   - Sort Order: `1`
4. Click "Create Product"

**Step 5: Deploy**
- Click "Deploy Products to Site"
- Wait 5-10 minutes
- Check site to verify product displays

---

## 🔄 Updating Products

### When to Update

**Price Changes:**
- Update immediately for new orders
- Note: Existing orders keep original price

**Description Changes:**
- Fix typos or improve wording
- Add seasonal notes
- Update ingredient changes

**Photo Changes:**
- Better quality photos available
- Seasonal presentation
- Product appearance changed

**Availability:**
- Mark as unavailable (sold out)
- Hide seasonal items off-season
- Remove discontinued products

### How to Update

1. Go to Products dashboard
2. Click "Edit" on product
3. Make changes
4. Click "Update Product"
5. Click "Deploy Products to Site"
6. Site updates automatically

---

## 💡 Content Writing Tips

### Voice & Tone

**Be:**
- Warm and personal (Nicole's voice)
- Authentic and honest
- Passionate about craft
- Educational (teach about process)

**Avoid:**
- Corporate/stiff language
- Exaggeration or hype
- Complicated terms
- Negative comparisons

### Example Transformations

**Before (Generic):**
"Delicious bread that tastes amazing and you'll love it!"

**After (Specific):**
"Tangy sourdough with a perfectly chewy crust and soft interior."

**Before (Technical):**
"Utilizing long-fermentation methodologies for optimal gluten development."

**After (Accessible):**
"Naturally fermented for 48 hours for authentic flavor and texture."

---

## 📞 Need Help?

### Questions About:

**Photography:**
- Use smartphone camera (iPhone, Android)
- Shoot in natural light (morning/afternoon)
- Use portrait mode for depth
- Take multiple angles

**Descriptions:**
- Focus on sensory details (taste, texture, smell)
- Be specific (not "good," but "tangy," "chewy," "crisp")
- Include story (traditional methods, family recipe)

**Pricing:**
- Research local bakery prices
- Consider your time and ingredients
- Don't undervalue artisan quality
- Start higher, can always discount

---

## 🎉 Ready to Add Products!

Once you have 3-5 products ready:
1. Upload all photos to ContentFlow media library
2. Add each product one by one
3. Review all products for accuracy
4. Click "Deploy Products to Site"
5. Test the site - add to cart, checkout, etc.
6. Share with friends for feedback!

**ContentFlow Dashboard:** https://contentflow.vercel.app/dashboard/products

---

**Last Updated:** 2026-01-31
**Created For:** Nicole - Wellstone Breads
