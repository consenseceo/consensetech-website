# Quick Reference - DigitalOcean Setup

## 🔴 Critical Values to Fill In

### 1. Cloud Run Service URL
**Where**: Google Cloud Console → Cloud Run → Your service  
**Format**: `https://<service-name>-<hash>.run.app`  
**Example**: `https://consense-api-abc123xyz.run.app`

**Use for**:
- Environment Variable: `API_BASE_URL`
- CORS configuration in backend
- Contact form endpoint

---

### 2. DigitalOcean App Domain
**Where**: DigitalOcean App Platform → Your app → Settings → Domains  
**Format**: `https://<app-name>-<hash>.ondigitalocean.app`  
**Example**: `https://consensetech-website-xyz123.ondigitalocean.app`

**Use for**:
- Namecheap CNAME record value
- CORS configuration in backend
- Testing before custom domain

---

### 3. Namecheap DNS Records

#### CNAME Record (www)
- **Host**: `www`
- **Type**: `CNAME`
- **Value**: `<your-do-app>.ondigitalocean.app` (from #2 above)
- **TTL**: `Automatic` or `30 min`

#### URL Redirect (root domain - Option A)
- **Host**: `@`
- **Type**: `URL Redirect Record`
- **Value**: `https://www.consensetech.com`
- **Redirect Type**: `301 Permanent`

#### OR A Records (root domain - Option B)
- **Host**: `@`
- **Type**: `A Record`
- **Value**: `<IP addresses from DigitalOcean>`
- **TTL**: `Automatic`

---

## 📋 DigitalOcean App Platform Settings

### Build Configuration
```
Build Strategy: HTML
Build Command: (empty)
Output Directory: (empty) or "."
```

### Environment Variables
```
Key: API_BASE_URL
Value: https://<your-cloud-run-service>.run.app
Scope: Build time
Encrypt: ON (recommended)
```

### Region
```
Recommended: NYC3
Alternative: SFO3, AMS3, SGP1
```

---

## 🔧 Backend CORS Configuration

Add these origins to your Cloud Run backend:

```
https://www.consensetech.com
https://consensetech.com
https://<your-do-app>.ondigitalocean.app
```

**Methods**: `GET, POST, PUT, DELETE, OPTIONS`  
**Headers**: `Content-Type, X-Idempotency-Key`

---

## ✅ Verification Checklist

- [ ] DigitalOcean app deployed successfully
- [ ] Temporary domain works: `https://<app>.ondigitalocean.app`
- [ ] Namecheap DNS records added
- [ ] Domain verified in DigitalOcean (5-30 min wait)
- [ ] HTTPS enabled and forced
- [ ] Backend CORS updated with new domains
- [ ] Contact form tested and working
- [ ] Mobile responsiveness verified

---

## 🔗 Quick Links

- **DigitalOcean Apps**: https://cloud.digitalocean.com/apps
- **Namecheap DNS**: https://ap.www.namecheap.com/domains/list/
- **Google Cloud Run**: https://console.cloud.google.com/run
- **GitHub Repo**: https://github.com/consenseceo/consensetech-website

---

## 🧪 Test Commands

### Test CORS
```bash
curl -i https://<your-cloud-run>.run.app/health/crypto \
  -H "Origin: https://www.consensetech.com"
```

Expected header:
```
Access-Control-Allow-Origin: https://www.consensetech.com
```

### Test DNS Propagation
```bash
dig www.consensetech.com
# Should show CNAME pointing to your DO app
```

---

## 📝 Notes

- DNS propagation: 5-30 minutes (sometimes up to 48 hours)
- SSL certificates: Auto-provisioned by DigitalOcean
- CDN: Auto-enabled for static sites
- Cost: Free tier available, then ~$5/month

