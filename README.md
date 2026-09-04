# Shahbaz Ahmed Portfolio

Production-ready personal site for Shahbaz Ahmed, App Developer in Dubai. Built with Next.js, TypeScript, Tailwind CSS, and live demo APIs.

## Pages

- `/` Home with hero, stats, featured projects, live Dubai time, and jokes
- `/about` CV with resume download
- `/projects` Seven project cards plus OCR, chatbot, weather, anime, jokes, and time widgets
- `/contact` Name, email, and message form

## Local setup

1. Copy `.env.example` to `.env.local`
2. Add Hugging Face, OpenWeather, and SendGrid keys
3. Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API routes

- `POST /api/chat` Hugging Face chatbot with KV/memory history
- `GET /api/weather?city=Dubai` OpenWeatherMap with 10-minute cache
- `GET /api/anime?search=Naruto` Jikan API with 1-hour cache
- `GET /api/joke` Official Joke API
- `POST /api/contact` SendGrid email

Without real keys, chat, weather, and contact still return safe local fallbacks so the site can be demoed.

## Deploy

Push to GitHub, import the repo in Vercel, and add:

- `HUGGING_FACE_API_KEY`
- `OPENWEATHER_API_KEY`
- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`
- `SENDGRID_TO_EMAIL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
