
# Getting Started

First, run the development server:

```bash

yarn dev

```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## To push more changes:
- check for api keys
- stripe login
- mongo atlas cluster0 test-ecommerce (may have to update database access and password)
- after mongodb.net/ in the mongodb connect url, test-ecommerce, must be added afterwards to connect to this specific cluster or else it will just conenct to cluster 0, but we want it to point towards a specific collection in the cluster
- stripe api keys are gathered from stripe sandbox dashboard, they expire every 90 days and must be put in .env

signing secret is attained by doing stripe listen --forward-to localhost:3000/webhook in powershell
- it needs to be put in webhook.js

ensure that all new png files are big enough and transparent preferably, around 1000-2000 picels wide/high
- must be put in public/products NOT out/products


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
