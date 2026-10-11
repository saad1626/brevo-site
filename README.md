# Brevo Email Marketing Website (PHP version for Hostinger shared hosting)

Basic Hostinger shared plans can NOT run Node.js. They run **PHP**.
So this version uses:

- **Frontend:** React (same as before), built into plain HTML/CSS/JS files
- **Backend (API):** PHP, in `public_html/api`
- **Database:** a JSON file, `public_html/data/db.json` (protected, no MySQL needed)

## Folder structure

```
brevo-site/
  client/              React source code (you edit this)
  public_html/         EVERYTHING that goes on Hostinger
    .htaccess          sends /api to PHP, every other URL to React
    index.html         built React app   (made by npm run build)
    assets/            built CSS and JS  (made by npm run build)
    images/            your images       (copied from client/public/images)
    api/
      index.php        every /api request starts here
      config.php       ADMIN PASSWORD + SECRET KEY  <- change these!
      helpers.php      read/save data, send JSON, login check
      routes/          one file per feature
    data/
      .htaccess        blocks the browser from opening this folder
      db.example.json  clean starting data
      db.json          live data (created automatically)
    uploads/           uploaded logo and blog images
  dev-router.php       only for testing on your computer
  package.json
  vite.config.mjs
```

## Upload to Hostinger (no Node.js needed on the server)

The `public_html` folder in this zip is ALREADY BUILT. You can upload it straight away.

1. Open `public_html/api/config.php` and change `ADMIN_PASSWORD` and `SECRET_KEY`.
2. In hPanel, open **File Manager** and go into your domain's `public_html` folder.
   Delete the default files there (like `default.php`).
3. Upload the CONTENTS of our `public_html` folder (not the folder itself).
   Tip: zip the contents, upload the zip, then use File Manager's **Extract**.
4. Make sure hidden files were uploaded: `.htaccess` (3 of them).
5. Open `yourdomain.com` and `yourdomain.com/dashboard`.

If you can not log in or save, check that the `data` and `uploads`
folders have permission **755** (right click > Permissions in File Manager).

## Changing the React code later

You need Node.js on YOUR computer only (not on Hostinger).

```
npm install
npm run build
```

This updates `index.html`, `assets/` and `images/` inside `public_html`.
Upload only those three again. Do NOT re-upload `data/` or `uploads/`,
or you will overwrite your live blogs and settings.

## Testing on your computer

You need PHP installed (or XAMPP). Open two terminals:

```
php -S localhost:8000 -t public_html dev-router.php
```

```
npm run dev
```

Open http://localhost:5173 (auto reload while you code).
Or, after `npm run build`, just open http://localhost:8000.

## Back up your data

Download `public_html/data/db.json` and `public_html/uploads/`
from File Manager from time to time.

## Reset all data

Delete `public_html/data/db.json`. A fresh copy is made automatically.
