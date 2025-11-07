# ConsenseTech Website

A modern, responsive landing page for ConsenseTech - Secure, decentralized consent management platform.

## Features

- 🎨 Modern, beautiful UI design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and lightweight
- 🔒 Privacy-focused
- 🌐 SEO optimized
- ♿ Accessible

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No framework dependencies
- **Google Fonts** - Inter font family

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd consensetech-website
```

2. Open `index.html` in your browser or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

### File Structure

```
consensetech-website/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── script.js           # JavaScript functionality
├── README.md           # This file
├── .gitignore          # Git ignore rules
└── .do/                # DigitalOcean App Platform config (optional)
    └── app.yaml
```

## Deployment

### DigitalOcean App Platform

This repository is configured for easy deployment on DigitalOcean App Platform.

#### Option 1: Using DigitalOcean Dashboard

1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Connect your GitHub/GitLab repository
4. Select this repository (`consensetech-website`)
5. DigitalOcean will auto-detect it as a static site
6. Deploy!

#### Option 2: Using App Spec File

If you have a `.do/app.yaml` file, you can deploy using the DigitalOcean CLI:

```bash
doctl apps create --spec .do/app.yaml
```

### Manual Deployment

You can also deploy to any static hosting service:

- **Netlify**: Drag and drop the folder or connect via Git
- **Vercel**: Connect repository or use CLI
- **GitHub Pages**: Enable in repository settings
- **AWS S3 + CloudFront**: Upload files to S3 bucket
- **Any web server**: Upload files via FTP/SFTP

## Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... more variables ... */
}
```

### Content

- Edit `index.html` to change text content
- Update contact email in the contact section
- Modify feature cards, use cases, etc.

### Styling

- All styles are in `styles.css`
- Uses CSS Grid and Flexbox for layouts
- Fully responsive with mobile-first approach

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external dependencies (except Google Fonts)
- Optimized images (when added)
- Minimal JavaScript
- Fast load times

## License

Copyright © 2024 ConsenseTech. All rights reserved.

## Contact

For questions or support, please contact: contact@consensetech.io

