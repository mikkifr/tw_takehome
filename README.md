# <font color='red'>Premium account closed on 11/21/2025. Add your own premium key one if you have it, or contact me and I'll purchase another.</font>

## Technical decisions/FYI
- Created backend endpoints for bulk fetching of data (ideally calls to third-party APIs would be cached)
- Used Grafana UI which caused issues with SSR, so components are client side (SWR adds a bonus refresh) 
- Couldn't find reliable Grafana UI docs on how to pull cell values for use with link generation (e.g. __value.raw), so use Grid view to access company detail pages
- Couldn't find clear examples on responsive Grafana charts so used magic numbers here and there (also made responsive UI difficult implement)

## Getting Started
First ensure a premium Alpha Vantage API key is in your local .env file (provided in project submission), e.g. `ALPHA_API_KEY=XXXXXXX` 

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


