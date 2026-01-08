# Schema Markup Analysis & Recommendations for Top Card Marketing

## Current Schema Types Implemented

Your site currently uses the following schema.org markup types:

### 1. **Organization Schema**
- **Location**: `index.html`, `about-us.html`
- **Contains**: 
  - Name, URL, logo, description
  - PostalAddress (city, state, country)
  - ContactPoint
  - sameAs (social media links - currently only has main site URL)

### 2. **WebPage Schema**
- **Location**: All pages
- **Contains**: Basic page metadata (name, description, URL, language)

### 3. **WebSite Schema**
- **Location**: `index.html` (nested in WebPage)
- **Contains**: Site name and URL

### 4. **Service Schema**
- **Location**: Service pages (social-media.html, seo.html, branding.html, content-creation.html, website-design.html, paid-media.html, marketing-audit.html, top-card-plans.html)
- **Contains**:
  - serviceType (describes the specific service)
  - provider (Organization)
  - areaServed (City with State containment)
  - description

### 5. **FAQPage Schema**
- **Location**: Service pages with FAQ sections
- **Contains**: 
  - mainEntity array with Question and Answer objects
  - Currently implemented on: social-media, seo, branding, content-creation, website-design, paid-media, graphic-design

### 6. **Blog Schema**
- **Location**: `blog.html`
- **Contains**: Blog name, description, publisher (Organization with logo ImageObject)

### 7. **BlogPosting Schema**
- **Location**: `blog/sudo-blog-post.html`
- **Contains**: 
  - headline, description, URL
  - author (Organization)
  - publisher (Organization with ImageObject logo)
  - mainEntityOfPage

### 8. **ContactPage Schema**
- **Location**: `contact-us.html`
- **Contains**: ContactPage with Organization and ContactPoint

### 9. **ImageObject Schema**
- **Location**: Used within Blog and BlogPosting schemas for logo

---

## Recommended Advanced Schema Types

### High Priority Recommendations

#### 1. **LocalBusiness Schema** (or ProfessionalService)
- **Why**: Google uses this for local search results, Google My Business integration, and rich snippets
- **Where**: `index.html`, `about-us.html`
- **Add**:
  - `@type: "LocalBusiness"` or `"ProfessionalService"`
  - `priceRange` (e.g., "$$")
  - `openingHours` (if applicable)
  - `telephone` (if you have a phone number)
  - `aggregateRating` (if you collect reviews)
  - More detailed address (street address, postal code)
  - `geo` coordinates (latitude/longitude)

#### 2. **Review / AggregateRating Schema**
- **Why**: Enables star ratings in search results, builds trust
- **Where**: Homepage, service pages, about-us.html
- **Add**:
  - Individual Review objects with author, rating, reviewBody, datePublished
  - AggregateRating with ratingValue, bestRating, worstRating, ratingCount
  - You can use this for testimonials you already have

#### 3. **BreadcrumbList Schema**
- **Why**: Shows breadcrumbs in search results, improves navigation understanding
- **Where**: All interior pages (except homepage)
- **Add**: List of breadcrumb items showing site hierarchy

#### 4. **Article Schema** (for blog posts)
- **Why**: Better than BlogPosting for news/blog content, enables rich results
- **Where**: Blog posts (enhance existing BlogPosting)
- **Enhance with**:
  - `datePublished` and `dateModified`
  - `articleSection` (category)
  - `keywords`
  - `articleBody` (full text)
  - `wordCount`

#### 5. **Service Schema Enhancements**
- **Current**: Basic implementation
- **Enhance with**:
  - `offers` (price, priceCurrency, availability)
  - `provider` with more details (logo, image, sameAs social links)
  - `serviceArea` (expand beyond just Duluth if you serve wider area)
  - `hoursAvailable` (service hours)
  - `audience` (targetCustomerType)

### Medium Priority Recommendations

#### 6. **VideoObject Schema**
- **Why**: If you have videos (YouTube embeds, service explanations), this enables video rich results
- **Where**: Pages with video content
- **Add**:
  - Video URL, thumbnail, duration
  - UploadDate, description
  - Embed URL

#### 7. **HowTo Schema**
- **Why**: If you create guides/tutorials, this can show as rich results
- **Where**: Blog posts or service pages with step-by-step guides
- **Add**: Step-by-step instructions with images

#### 8. **ItemList Schema**
- **Why**: For service listings, portfolio items, case studies
- **Where**: Homepage (service list), portfolio pages
- **Add**: Structured list of services, portfolio items

#### 9. **Person Schema**
- **Why**: For team members, founders, key staff
- **Where**: `about-us.html`
- **Add**: Person details (name, jobTitle, image, sameAs social profiles)

#### 10. **Product Schema** (for service packages)
- **Why**: If you sell specific packages/plans (Top Card Plans)
- **Where**: `top-card-plans.html`
- **Add**:
  - Product name, description
  - Offers with pricing
  - AggregateRating
  - Category

### Advanced / Nice-to-Have Recommendations

#### 11. **Event Schema**
- **Why**: If you host webinars, workshops, or events
- **Where**: Event pages
- **Add**: Event details, dates, location, organizer

#### 12. **Course Schema**
- **Why**: If you offer training or courses
- **Where**: Course/educational pages
- **Add**: Course details, provider, duration, pricing

#### 13. **SoftwareApplication Schema**
- **Why**: If you have any tools or applications
- **Where**: Tool/app pages
- **Add**: App details, operating system, offers

#### 14. **WebSite Schema Enhancement**
- **Why**: Add search functionality markup
- **Where**: `index.html`
- **Add**: `potentialAction` with SearchAction (if you have site search)

---

## Implementation Priority

### Phase 1 (Immediate Impact)
1. ✅ Enhance Organization → LocalBusiness/ProfessionalService
2. ✅ Add Review/AggregateRating (use existing testimonials)
3. ✅ Add BreadcrumbList to all pages
4. ✅ Enhance Service schemas with offers/price info

### Phase 2 (SEO Boost)
5. ✅ Enhance BlogPosting → Article with dates/keywords
6. ✅ Add VideoObject (if applicable)
7. ✅ Add Person schema for team

### Phase 3 (Advanced Features)
8. ✅ Add HowTo for tutorials
9. ✅ Add ItemList for services/portfolio
10. ✅ Add Product schema for service packages

---

## Quick Wins You Can Implement Now

### 1. Enhance Organization Schema (index.html)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Top Card Marketing",
  "url": "https://topcardmarketing.com",
  "logo": "https://topcardmarketing.com/images/logos/logo.png",
  "image": "https://topcardmarketing.com/images/logos/logo.png",
  "description": "Full service digital marketing agency...",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[ADD STREET ADDRESS]",
    "addressLocality": "Duluth",
    "addressRegion": "MN",
    "postalCode": "[ADD ZIP]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[ADD LAT]",
    "longitude": "[ADD LONG]"
  },
  "telephone": "[ADD PHONE]",
  "priceRange": "$$",
  "openingHours": "Mo-Fr 09:00-17:00",
  "sameAs": [
    "https://www.facebook.com/[PAGE]",
    "https://www.linkedin.com/company/[COMPANY]",
    "https://www.instagram.com/[HANDLE]"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "25"
  }
}
```

### 2. Add Review Schema (using existing testimonials)
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Organization",
    "name": "Top Card Marketing"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Daire Lyne"
  },
  "reviewBody": "Top Card Marketing designed and built a new website for us...",
  "datePublished": "2024-01-15"
}
```

### 3. Add BreadcrumbList (example for service page)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://topcardmarketing.com"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "Services",
    "item": "https://topcardmarketing.com/services"
  }, {
    "@type": "ListItem",
    "position": 3,
    "name": "Social Media Management",
    "item": "https://topcardmarketing.com/social-media.html"
  }]
}
```

---

## Testing Your Schema

After implementing, test using:
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/
- **Google Search Console**: Monitor for rich result eligibility

