# SEO Setup Guide for Kenco Website

This guide covers all the SEO optimizations implemented and additional steps needed for complete Google integration.

## ✅ Implemented SEO Features

### 1. Meta Tags (index.html)
- **Title tag** - Dynamically set via VITE_APP_TITLE
- **Description** - Comprehensive site description
- **Keywords** - Relevant industry keywords
- **Canonical URLs** - Prevent duplicate content issues
- **Robots** - Allow search engine indexing

### 2. Open Graph Tags (Social Media)
- Facebook/LinkedIn sharing optimization
- Custom title, description, and image
- Locale set to en_NZ (New Zealand)

### 3. Twitter Cards
- Large image card format
- Optimized for Twitter sharing
- Custom title, description, and image

### 4. Essential Files Created
- **robots.txt** - Search engine crawling instructions
- **sitemap.xml** - All pages listed for search engines
- **site.webmanifest** - PWA support and mobile optimization

### 5. Structured Data (Schema.org)
- **Organization schema** - Company information
- **LocalBusiness schema** - Business details, hours, contact
- Helps Google understand your business for rich results

### 6. Dynamic SEO Component
- Updates meta tags per page
- Structured data injection
- Canonical URL management

---

## 🔧 Google Integration Steps

### Step 1: Google Search Console

**Purpose:** Monitor search performance, submit sitemaps, fix indexing issues

**Setup Instructions:**

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Enter: `https://kenco.nz`
4. Choose verification method: **HTML file upload**
5. Download the verification file (e.g., `google123abc.html`)
6. Upload to `/home/ubuntu/kenco-website/client/public/`
7. Redeploy the website
8. Click "Verify" in Search Console

**After Verification:**
- Submit sitemap: `https://kenco.nz/sitemap.xml`
- Request indexing for main pages
- Monitor search performance weekly

---

### Step 2: Google Analytics 4 (GA4)

**Purpose:** Track website traffic, user behavior, conversions

**Setup Instructions:**

1. Go to [Google Analytics](https://analytics.google.com)
2. Create account: "Kenco Ltd"
3. Create property: "Kenco Website"
4. Choose "Web" platform
5. Enter website URL: `https://kenco.nz`
6. Get Measurement ID (format: `G-XXXXXXXXXX`)

**Add to Website:**

Edit `/opt/kenco-website/.env` on Plesk server:

```bash
# Add these lines (replace with your actual IDs)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Then add to `client/index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Rebuild and redeploy.

---

### Step 3: Google Tag Manager (Optional but Recommended)

**Purpose:** Manage all tracking codes from one place

**Setup Instructions:**

1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Create account: "Kenco Ltd"
3. Create container: "Kenco Website" (Web)
4. Get Container ID (format: `GTM-XXXXXXX`)

**Add to Website:**

Add to `client/index.html` after `<head>`:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

Add to `client/index.html` after `<body>`:

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

---

### Step 4: Google My Business (GMB)

**Purpose:** Appear in Google Maps and local search results

**Setup Instructions:**

1. Go to [Google Business Profile](https://business.google.com)
2. Click "Manage now"
3. Enter business name: "Kenco Ltd"
4. Choose category: "Medical Supply Store" or "Healthcare Provider"
5. Add location (if you have a physical office)
6. Add phone: +64 21 029 66718
7. Add website: https://kenco.nz
8. Verify business (postcard, phone, or email)

**Optimize Profile:**
- Add business hours
- Upload photos of products/installations
- Add services (Endurocide, ShadeCare, Installations)
- Encourage customer reviews
- Post updates regularly

---

### Step 5: Create og-image.jpg

**Purpose:** Image shown when sharing on social media

**Requirements:**
- Size: 1200x630 pixels (recommended)
- Format: JPG or PNG
- Content: Company logo + tagline or product image

**Steps:**

1. Create image with design tool (Canva, Photoshop, etc.)
2. Save as `og-image.jpg`
3. Upload to `/home/ubuntu/kenco-website/client/public/`
4. Redeploy website

**Test Social Sharing:**
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

---

## 📊 SEO Monitoring Checklist

### Weekly Tasks
- [ ] Check Google Search Console for errors
- [ ] Review Google Analytics traffic
- [ ] Monitor keyword rankings
- [ ] Check for broken links

### Monthly Tasks
- [ ] Update sitemap if pages added
- [ ] Review and respond to GMB reviews
- [ ] Analyze top-performing pages
- [ ] Update meta descriptions if needed

### Quarterly Tasks
- [ ] Audit website speed (Google PageSpeed Insights)
- [ ] Review and update structured data
- [ ] Check mobile usability
- [ ] Analyze competitor SEO

---

## 🎯 SEO Best Practices

### Content Optimization
- Use H1 tags for main headings (one per page)
- Use H2-H6 for subheadings
- Include keywords naturally in content
- Write descriptive alt text for all images
- Keep URLs short and descriptive
- Internal linking between related pages

### Technical SEO
- Ensure HTTPS is working (✅ Already done)
- Mobile-responsive design (✅ Already done)
- Fast page load times (< 3 seconds)
- No broken links or 404 errors
- Proper use of canonical tags

### Local SEO (New Zealand)
- Include "New Zealand" in content
- Use .nz domain (✅ Already done)
- Get listed in NZ business directories
- Build local backlinks
- Encourage customer reviews

---

## 🔗 Useful Tools

### Free SEO Tools
- [Google Search Console](https://search.google.com/search-console) - Search performance
- [Google Analytics](https://analytics.google.com) - Traffic analytics
- [Google PageSpeed Insights](https://pagespeed.web.dev/) - Performance testing
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) - Mobile optimization
- [Google Rich Results Test](https://search.google.com/test/rich-results) - Structured data validation

### SEO Analysis Tools
- [Ahrefs](https://ahrefs.com) - Keyword research, backlinks (Paid)
- [SEMrush](https://semrush.com) - Comprehensive SEO toolkit (Paid)
- [Moz](https://moz.com) - Domain authority, keyword tracking (Paid)
- [Ubersuggest](https://neilpatel.com/ubersuggest/) - Free keyword tool

---

## 📈 Expected Results Timeline

- **Week 1-2:** Google indexes main pages
- **Month 1:** Appear in search results for brand name
- **Month 2-3:** Start ranking for long-tail keywords
- **Month 4-6:** Improve rankings for competitive keywords
- **Month 6+:** Steady organic traffic growth

**Note:** SEO is a long-term strategy. Consistent effort and quality content are key to success.

---

## 🚀 Next Steps

1. ✅ Deploy current SEO implementation
2. ⏳ Set up Google Search Console
3. ⏳ Set up Google Analytics
4. ⏳ Create and upload og-image.jpg
5. ⏳ Set up Google My Business
6. ⏳ Submit sitemap to Search Console
7. ⏳ Request indexing for main pages

For questions or assistance, refer to this guide or consult with an SEO specialist.
