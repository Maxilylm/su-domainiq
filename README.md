# DomainIQ

> Enter a domain name and get a valuation with a letter grade and a factor-by-factor breakdown.

**[Live demo](https://domainiq-mlx.vercel.app)**

Domain appraisal tools tend to be paywalled or opaque about how they reached a number. DomainIQ sends a domain to Groq's Llama 3.3 70B prompted as an appraiser and returns a low/mid/high USD range, a grade from A+ to F, and scores across six named factors with a written justification for each. The report also lists comparable sales — worth treating as model-generated illustrations rather than verified transaction records.

## Features

- Low, mid, and high USD value estimate for any domain
- Letter grade from A+ down to F
- Six scored factors out of 10 — Length, Brandability, Keyword Value, Extension, Memorability, Market Demand — each with an explanation
- AI-suggested comparable sales with price and year
- Actionable suggestions for raising the domain's value
- Copy the full valuation report to the clipboard

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Groq API — `llama-3.3-70b-versatile` in JSON response mode

## Running locally

```bash
npm install
npm run dev
```

Set `GROQ_API_KEY` in `.env.local`.

---

Part of a series of 91 small web apps. [Browse them all](https://lorenzoylosada.vercel.app).
