# Medventory

Medventory is a Next.js app (App Router) with an internal mock API route (`/api/mrn`) and no required environment variables.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for Production

```bash
npm run build
npm run start
```

## Host on Vercel (Recommended)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, click **Add New Project** and import the repository.
3. Keep defaults:
   - Framework: `Next.js`
   - Build command: `npm run build`
   - Output: `.next` (auto-detected)
4. Deploy.

No environment variables are needed for the current app.

## Host with Docker (Any VPS/Cloud)

Build and run:

```bash
docker build -t medventory .
docker run -d --name medventory -p 3000:3000 medventory
```

Then open `http://<your-server-ip>:3000`.

## Useful References

- Next.js deployment docs: https://nextjs.org/docs/app/building-your-application/deploying
- Vercel docs: https://vercel.com/docs
