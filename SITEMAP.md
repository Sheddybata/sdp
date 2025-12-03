# SDP Website - High-Level Sitemap

## Overview
This document outlines the complete site structure for the Social Democratic Party (SDP) website, transforming it from a single-page application into a comprehensive multi-page platform designed to engage, inform, and mobilize Nigerian citizens.

---

## Site Hierarchy

```
/
├── / (Homepage - The Action Center)
├── /who-we-are (Party Structure & History)
├── /our-stand (Manifesto & Shadow Government)
├── /e-membership (The "Verified" Portal)
│   └── /dashboard (Member Dashboard - Protected)
├── /election-center (Candidates & Grassroots Map)
│   ├── /candidates (Candidate Finder)
│   └── /polling-units (Polling Unit Locator)
├── /media-room (News, Press Releases, Whistleblower)
│   └── /whistleblower (Whistleblower Portal)
└── /contact (National & State Offices)
```

---

## Detailed Page-by-Page Breakdown

### 1. Homepage (/)
**Title:** The Action Center  
**Purpose:** Main landing page that serves as the primary engagement hub

#### Hero Section
- **Visual:** High-quality video background of Prince Adebayo or diverse Nigerian youth (not static handshake photo)
- **Headline:** "The Alternative is Here. Good Governance for Nigeria."
- **Primary CTA:** "Join the Party" (Red Button)
- **Secondary CTA:** "Donate N500" (Green Button)

#### The "Shadow Gov" Tracker (Widget)
- **Live Stats Bar:**
  - Current Inflation Rate vs. SDP Target Rate
  - Real-time economic indicators

#### Latest Wins
- **3-column grid layout:**
  - "Senator Wadada Moves Motion for X"
  - "SDP Nasarawa distributes fertilizer"
  - "Party Chairman visits IDP camp"
- Auto-rotating or expandable for more wins

#### The "Why SDP?" Block
- **Icon-based value propositions:**
  - Social Justice
  - True Federalism
  - Youth Inclusion
- Interactive hover states with brief explanations

#### Footer Pre-Emptive
- "Find your Ward Chairman" search bar
- Quick access to grassroots connections

---

### 2. Who We Are (/who-we-are)
**Title:** Party Structure & History  
**Purpose:** Establish legitimacy, trust, and transparency

#### History Timeline
- **Visual Timeline:** From M.K.O. Abiola (1993) to Prince Adebayo (2025)
- Connects legacy to future vision
- Interactive scroll-through timeline with key milestones

#### Leadership Structure (The Organs)

##### The NWC (National Working Committee)
- **Profiles Section:**
  - Chairman (Prince Adebayo)
  - Secretary
  - Other key NWC members
- Photo, bio, and contact information

##### The Senate Caucus
- **Dedicated Section:**
  - Senator Wadada profile
  - Senator Akwashiki profile
- Shows legislative power and representation
- Links to their legislative achievements

##### Board of Trustees
- Photos of the elders
- Shows stability and institutional memory
- Brief profiles highlighting experience

#### Constitution
- **Downloadable PDF:** Party Constitution
- Vital for legal transparency
- Interactive preview before download

---

### 3. Our Stand (/our-stand)
**Title:** The "Shadow Government" Dashboard  
**Purpose:** Present policy positions and solutions

#### Manifesto 2.0
- **Interactive Tabs Interface:**
  - Economy
  - Security
  - Education
  - Agro-Allied
  - Healthcare
  - Infrastructure
  - Others as needed

- **Content Example (Economy Tab):**
  - "Our plan to stabilize the Naira in 18 months"
  - Detailed policy proposals
  - Visual data representations

#### The Solution Room
- **Library of Whitepapers:**
  - "The SDP Plan for Fuel Subsidy Removal"
  - "Agricultural Revolution Roadmap"
  - "Education Reform Framework"
  - "Security Architecture Proposal"
- Downloadable PDFs with executive summaries
- Search and filter functionality

#### Policy Comparisons
- SDP positions vs. Current Government positions
- Visual comparison charts

---

### 4. E-Membership (/e-membership)
**Title:** The "Verified" Portal  
**Purpose:** Digital membership registration and management

#### Registration Wizard

##### Step 1: Basic Info
- Name (First, Last)
- Phone Number
- Email Address
- Date of Birth

##### Step 2: Location
- State selection (dropdown)
- LGA selection (dynamic based on state)
- Ward selection (dynamic based on LGA)
- Crucial for the "Grassroots Grid"

##### Step 3: Upload ID
- NIN (National Identification Number)
- PVC (Permanent Voters Card) upload
- Image validation and verification

##### Step 4: Payment
- N100 card fee via Paystack integration
- Secure payment gateway
- Payment confirmation

#### Member Dashboard (/e-membership/dashboard) - Protected Route
- **Digital ID Card:**
  - Downloadable PNG with QR Code
  - Member number
  - Membership tier/status

- **Referral System:**
  - Personal referral link
  - "Invite 5 friends to earn a 'Party Agent' Badge"
  - Referral tracking dashboard

- **Member Benefits:**
  - Exclusive content access
  - Event invitations
  - Volunteer opportunities

- **Profile Management:**
  - Update information
  - Change password
  - Membership renewal

---

### 5. Election Center (/election-center)
**Title:** The 2027 Engine  
**Purpose:** Candidate discovery and electoral engagement

#### Candidate Finder (/election-center/candidates)
- **Search Interface:**
  - Dropdown: Select State
  - Dropdown: Select Office (Presidential, Gubernatorial, Senatorial, House of Reps, State Assembly, etc.)

- **Candidate Profile Display:**
  - "Meet [Candidate Name], running for [Office] in [Constituency]"
  - Candidate photo
  - Bio and qualifications
  - Campaign platform
  - Contact information

- **Action Buttons:**
  - "Volunteer for [Candidate]"
  - "Donate to [Candidate]"
  - "Share Campaign"

#### Polling Unit Locator (/election-center/polling-units)
- Integration with INEC data (if available)
- Interactive map of SDP Party Agents
- Search by location
- Contact information for polling unit agents

#### Grassroots Map
- Visual representation of SDP presence
- State-by-state breakdown
- Ward-level coverage indicators

---

### 6. Media Room (/media-room)
**Title:** The "Truth" Hub  
**Purpose:** Information dissemination and citizen engagement

#### Press Releases
- Official statements from the National Publicity Secretary
- Chronological listing (newest first)
- Filter by category/topic
- Download as PDF option
- Social sharing buttons

#### SDP TV
- YouTube API feed integration
- Prince Adebayo's interviews and speeches
- Party events and rallies
- Categorized video library
- Embed and play functionality

#### News Section
- Latest party news
- Media coverage highlights
- Opinion pieces
- Photo galleries

#### The Whistleblower Portal (/media-room/whistleblower)
- **Headline:** "See Something? Say Something."
- **Form Interface:**
  - Anonymous text field (rich text editor)
  - Image upload (multiple files)
  - File upload (documents)
  - Category selection
- **Privacy Promise:**
  - "Your identity is encrypted and never shared"
  - Encryption notice
  - Terms and conditions
- **Submission Confirmation:**
  - Reference number for tracking
  - Follow-up instructions

---

### 7. Contact (/contact)
**Title:** National & State Offices  
**Purpose:** Accessibility and local connection

#### National Secretariat
- Full address in Abuja
- Google Map embed
- Contact phone numbers
- Email addresses
- Office hours

#### State Chapter Directory
- **List of all 36 States:**
  - State Chairman name
  - Phone number
  - Email address
  - Office address
  - LGA coverage
- Searchable/filterable table
- Proves "National Spread"

#### Regional Offices
- Zonal coordination offices
- Special purpose offices

#### WhatsApp Direct
- Floating button on all pages
- Opens chat with "SDP Help Desk"
- Quick access for inquiries

#### Contact Form
- General inquiry form
- Category selection (Membership, Media, Partnership, etc.)
- File upload capability

---

## Navigation Structure

### Main Navigation (Header)
1. Home
2. Who We Are
3. Our Stand
4. E-Membership
5. Election Center
6. Media Room
7. Contact

### Footer Navigation
- Quick Links (all main pages)
- Legal (Privacy Policy, Terms of Service)
- Resources (Downloads, FAQs)
- Social Media Links
- Newsletter Signup

---

## Technical Requirements

### Authentication & Authorization
- Protected routes for member dashboard
- JWT or session-based authentication
- Role-based access control (Member, Party Agent, Admin)

### Integration Points
- Paystack (Payment processing)
- YouTube API (Video feeds)
- Google Maps API (Location services)
- INEC API (If available for polling unit data)
- Email service (Notifications)

### Database Schema Needs
- User/Member profiles
- Candidate information
- Press releases
- Whistleblower submissions (encrypted)
- Event calendar
- Contact directory

### Performance Optimization
- Image optimization and lazy loading
- Video background optimization
- API caching strategies
- CDN for static assets

---

## Design Principles

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- High contrast mode support

### Mobile Responsiveness
- Mobile-first design approach
- Touch-friendly interactions
- Responsive images and videos
- Mobile navigation menu

### User Experience
- Clear call-to-action placement
- Fast page load times
- Intuitive navigation
- Progressive disclosure of information
- Visual hierarchy and typography

### Brand Identity
- Consistent color scheme (Red, Green, Blue palette)
- Professional imagery
- Nigerian cultural context awareness
- Youth-focused design language

---

## Content Management

### Dynamic Content Areas
- Latest Wins (Admin-editable)
- Press Releases (Admin-editable)
- Candidate profiles (Admin-editable)
- News articles (Admin-editable)
- Events calendar (Admin-editable)

### Static Content Areas
- Party History
- Constitution
- Leadership profiles (semi-static)
- Policy positions (semi-static)

---

## SEO Considerations

### Page-Specific Meta Tags
- Unique titles and descriptions for each page
- Open Graph tags for social sharing
- Structured data markup (Schema.org)

### Content Strategy
- Keyword optimization for Nigerian political terms
- Local SEO for state chapters
- Multilingual considerations (English, major Nigerian languages)

---

## Future Enhancements

### Phase 2 Features
- Live streaming for events
- Mobile app integration
- SMS notifications
- WhatsApp bot integration
- Advanced analytics dashboard
- Social media feed aggregation

---

## Implementation Notes

### Technology Stack (Current)
- React + TypeScript
- Vite (Build tool)
- React Router (Routing)
- Tailwind CSS (Styling)
- shadcn/ui components

### Recommended Additions
- State management (Redux or Zustand)
- Form handling library (React Hook Form)
- File upload handling
- PDF generation library
- Email service integration

---

**Document Version:** 1.0  
**Last Updated:** 2025  
**Created By:** Senior UI/UX Design Team  
**Status:** Ready for Development

