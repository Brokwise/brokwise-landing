# Scroll-Triggered Early Bird Popup - Design

## Goal

Show a one-time promotional popup on the landing page when a visitor scrolls past the hero copy, promoting the Early Bird offer and driving signups.

## Behavior

- Fires the first time the visitor scrolls below the hero section.
- Once dismissed or claimed, it never shows again (persisted in `localStorage`).

## Component

- New client component: `src/components/v2/EarlyBirdPopup.tsx`.
- Mounted once in `src/app/page.tsx`, alongside `FindBrokerWidget`.

## Trigger

- A 1px invisible sentinel `<div>` is rendered at the bottom of the popup component's own tree, positioned to sit just below the hero.
  Implementation: the component observes when the hero section leaves the viewport.
  Chosen approach: an `IntersectionObserver` on a sentinel element placed via a fixed reference, or a scroll-position check against the hero height.
  Concretely, we watch `window` scroll and open once `scrollY` exceeds the hero section's height (measured from the `<section>` element), which reliably means "scrolled below hero copy" across screen sizes.
- Guard: if `localStorage["brokwise_earlybird_popup_seen"]` is set, the listener is never attached and nothing opens.

## Visual (v2 design system)

- Full-screen `fixed` overlay: `bg-black/60 backdrop-blur-sm`, fade-in.
- Centered card: `bg-v2-navy-2`, `border border-v2-gold/40`, rounded, scale-in animation.
- Gold pulse-dot accent (reusing hero's `animate-ping` motif) above the headline.
- Headline: "Early Bird is Live" (display font, gold).
- Subcopy: "Get 3 months free when you sign up today." (typo "when if" corrected).
- CTA button: "Claim Offer" -> links to `REGISTER_URL` (`https://app.brokwise.com/get-started`), styled like the hero primary gold button.
- Close affordances: X button (top-right), overlay click, and Esc key.

## Dismissal and persistence

- Any of close / overlay-click / Esc / Claim-Offer click sets the `localStorage` flag so it never reappears.
- Body scroll is locked while the modal is open; restored on close.

## Analytics

- Consistent with the hero, `metaPixel.trackWithBrokwiseCustom` fires:
  - a view event on open, tagged `placement: "v2_scroll_popup"`.
  - a `Lead` event on "Claim Offer" click, tagged `placement: "v2_scroll_popup"`.

## Accessibility

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` / `aria-describedby`.
- Focus moved to the card (or close button) on open.
- Esc closes the modal.
