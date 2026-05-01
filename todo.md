# Salvere UI/UX Transformation Task List

This list outlines the necessary steps to transform the Salvere platform into a premium, medical-grade wellness experience, drawing inspiration from [Parsley Health](https://www.parsleyhealth.com/) and adhering to the client's specific color and typography requirements.

## 1. Design System & Foundation 🖋️

### Typography
- [x] **Serif Font (Headings)**: `Fraunces` loaded via `next/font/google` — applied to all H1-H3 headings.
- [x] **Sans-Serif Font (Body/UI)**: `Outfit` loaded via `next/font/google` — applied as primary body/UI font.
- [x] **Type Scale**: 
  - [x] Body `line-height: 1.6` set in globals.css.
  - [x] Headings use `letter-spacing: -0.025em` (tracking-tight).
  - [x] `.label-caps` utility class added: `uppercase tracking-widest` for section labels.

### Color Palette Update (`globals.css`)
- [x] **Orange (#F47C2A)**: Mapped to `--primary` and `--orange` tokens.
- [x] **Charcoal (#2E2E2E)**: Mapped to `--foreground` and `--charcoal` tokens.
- [x] **Warm Beige (#EFEAE4)**: Mapped to `--background` and `--warm-beige` tokens.
- [x] **Muted Sage (#7A8F7B)**: Mapped to `--secondary` and `--muted-sage` tokens.
- [x] **Soft White (#F9F9F7)**: Mapped to `--card` and `--soft-white` tokens.

### Component Styles
- [x] **Pill-Shaped Buttons**: All buttons now use `rounded-full` base + `rounded-full` per size variant.
- [x] **Button States**: 
  - [x] `transition-all duration-300` + `active:scale-[0.98]` press effect on all variants.
  - [x] Trailing `→` arrow added to `BookSessionButton` primary CTA.
- [x] **Organic Masking**: Hero image uses `rounded-[4rem]`; section cards use `rounded-[2rem]` to `rounded-[2.5rem]`.
- [x] **Section Spacing**: `py-16 lg:py-24` standardized across all home sections.

## 2. Global Components 🏗️

- [x] **Sticky Header**: 
  - [x] Transition from transparent to a solid/glassmorphism dark background on scroll.
  - [x] Add `underline-offset-[8px]` hover effects for navigation links.
- [x] **Footer**: 
  - [x] Multi-column layout with a pill-shaped newsletter input.
  - [x] Integrated social icons and clean categorization of links.

## 3. Page Section Transformation 📄

### Hero Section (HeroSection)
- [x] **Content Update**:
  - [x] H1: "Staying healthy doesn’t have to be so hard"
  - [x] Subtext: "We use what you do know to tell you what you don’t know — to achieve your optimal health..."
- [x] **Action Buttons**: 
  - [x] Primary: "Book a Discovery Call" (Orange solid).
  - [x] Secondary: "Take Assessment" (Muted Sage border or Warm Beige).
- [x] **Layout**: 50/50 split layout with a high-quality medical/lifestyle lifestyle image.

### Understand the Gap (New/Updated Section)
- [x] **Background**: Muted Sage (`#7A8F7B`) with Charcoal text.
- [x] **Layout**: 3-column grid for statistics:
  - [x] **30%+**: "of deaths in Nigeria are linked to chronic health conditions"
  - [x] **70%+**: "of routine health screenings provide results without structured lifestyle guidance"
  - [x] **80%+**: "of healthcare interactions focus on symptom management rather than underlying causes"
- [x] **Style**: Bold typography for percentages, clean supporting text.

### The Salvere Approach (SalvereApproachSection)
- [x] **Background**: Warm Beige (`#EFEAE4`).
- [x] **Content**: "We connect Lab results, Lifestyle & habits, Nutrition & hydration, Body patterns."
- [ ] **Visual**: Use clean icons connected by delicate arrows to visualize the flow from "What" to "Why" to "What to do next."

### Who We Help (WhoThisIsForSection)
- [x] **Background**: Warm Beige (`#EFEAE4`).
- [x] **Content**: 10 distinct categories (Digestive, Metabolic, Heart, Hormonal, etc.).
- [x] **Layout**: Responsive grid of cards using 🧩 (puzzle) icons or premium organic iconography.
- [x] **CTA**: "Discovery Call" and "Take Assessment" buttons at the bottom of the section.

### Services (HowWeWorkSection)
- [x] **Background**: Soft White (`#F9F9F7`).
- [x] **Service Cards**:
  - [x] Card 1: **Discovery Call**
  - [x] Card 2: **Single Session**
  - [x] Card 3 (⭐ FEATURED): **Salvere Personal Health Blueprint** (Add a border or highlight to emphasize importance).
  - [x] Card 4: **Management Package**
- [x] **Style**: Pill-shaped "Learn More" buttons on each card.

### For Organizations (New Section)
- [x] **Background**: Warm Beige (`#EFEAE4`).
- [x] **Content**: Bridge the gap between health data and real-life action for employees.
- [x] **Action Buttons**: "Explore Corporate Solutions" and "Request a Consultation".

### Reviews & Stories (TestimonialsSection)
- [x] **Title**: "Inside Salvere (real stories)"
- [x] **Layout**: Clean horizontal scroll or masonry grid for testimonials.

## 4. Polish & Motion ✨

- [x] **Scroll Animations**: Implement Framer Motion for subtle fade-in-up animations as sections enter the viewport.
- [x] **Micro-interactions**: Subtle scale-up on card hover.
- [x] **Navigation Underline**: Animate the underline expansion on link hover.

## 5. Revised Brief Alignment (Gaps) 📑

### Home Page Content Updates
- [x] **Hero Section**: Update subtext to match revised brief: "We help our clients manage chronic illnesses and drug-dependent conditions using natural foods and lifestyle changes."
- [x] **"Is This You?" Section**: Implement specific copy regarding chronic issues, low energy, weight gain, brain fog, etc., and the "65% of Nigerians" statistic.
- [x] **"The Shift" Section**: Update content to reflect the "Balance vs. Pressure" philosophy.
- [x] **"The Salvere Approach"**:
  - [x] Integrate Dewumi Ebuk's personal story.
  - [x] Update the 5 pillars: Functional Testing, Nutrition, Supplementation, Metabolic/Hormonal Balance, Expert Guidance.
- [x] **"Who This Is For"**: Consolidate into "For Individuals" and "For Organizations" as per the brief.
- [x] **"How We Work"**: Update service offerings to include "1:1 Coaching", "Corporate Wellness", and "The Salvere Open House".
- [x] **Footer/Nav**: Update emails to `dew@mysalvere.com` and `info@mysalvere.com`.

### Assessment & Results Logic
- [x] **Quiz Logic (14 Questions)**: Implement the optimized scoring system and the 14 specific questions from the brief.
- [x] **Category Mapping**: Ensure scores map to the 7 core categories (Stress, Hormones, Energy, Sleep, Gut, Inflammation, Mental).
- [x] **Result Screen Content**: 
  - [x] Add the "snapshot vs full picture" disclaimer.
  - [x] Update CTAs to "Book a Session" linking to the Flutterwave store.
  - [x] Implement the interpretation scale (0-20%: Balanced, 21-40%: Mild, etc.).
