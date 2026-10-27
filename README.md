# life-stacker.com

The Life Stacker landing page and waiting list, served by GitHub Pages from
the `main` branch. Plain HTML and CSS, no build step.

Sign-ups go to Supabase through the `join_waitlist` function (`config.js` holds
the public URL and publishable key; the SQL lives in the private
`life-stacker/life-stacker` repo under `supabase/`).
