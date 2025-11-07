#!/usr/bin/env node

/**
 * Simple build script to inject environment variables into HTML
 * For DigitalOcean App Platform static sites
 * 
 * Usage: node build.js
 * 
 * This script reads API_BASE_URL from environment variables
 * and injects it into index.html
 */

const fs = require('fs');
const path = require('path');

const API_BASE_URL = process.env.API_BASE_URL || 'https://your-cloud-run-service.run.app';
const indexPath = path.join(__dirname, 'index.html');

try {
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Replace the meta tag with the actual API URL
    html = html.replace(
        /<meta name="api-base-url" content="[^"]*">/,
        `<meta name="api-base-url" content="${API_BASE_URL}">`
    );
    
    // Also inject as a window variable for direct access
    const scriptTag = `<script>window.API_BASE_URL = "${API_BASE_URL}";</script>`;
    
    // Insert before closing head tag
    html = html.replace('</head>', `${scriptTag}\n</head>`);
    
    fs.writeFileSync(indexPath, html, 'utf8');
    
    console.log(`✓ Injected API_BASE_URL: ${API_BASE_URL}`);
} catch (error) {
    console.error('Error building:', error);
    process.exit(1);
}

