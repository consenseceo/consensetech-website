# 🔴 Fill In These Values

## Critical Values You Must Replace

### 1. Cloud Run Service URL ⚠️ REQUIRED
**Find it here**: Google Cloud Console → Cloud Run → Your service → URL

**Replace this**: `https://your-cloud-run-service.run.app`

**With your actual URL**, example:
```
https://consense-api-abc123xyz.run.app
```

**Use in**:
- DigitalOcean Environment Variable: `API_BASE_URL`
- Backend CORS configuration
- `index.html` line 7 (meta tag) - if not using build script

---

### 2. DigitalOcean App Domain ⚠️ REQUIRED
**Find it here**: DigitalOcean App Platform → Your app → Settings → Domains

**After you deploy**, you'll get something like:
```
https://consensetech-website-xyz123.ondigitalocean.app
```

**Use in**:
- Namecheap CNAME record (for `www` subdomain)
- Backend CORS configuration

---

### 3. Namecheap DNS Records ⚠️ REQUIRED

#### For `www.consensetech.com`:
- **Host**: `www`
- **Type**: `CNAME`
- **Value**: `<your-do-app>.ondigitalocean.app` (from #2, without https://)
- **Example**: `consensetech-website-xyz123.ondigitalocean.app`

#### For `consensetech.com` (root):
**Option A - Recommended**:
- **Host**: `@`
- **Type**: `URL Redirect Record`
- **Value**: `https://www.consensetech.com`
- **Redirect**: `301 Permanent`

**Option B - Alternative**:
- **Host**: `@`
- **Type**: `A Record`
- **Value**: `<IP addresses>` (get from DigitalOcean App → Settings → Domains)

---

## 📋 DigitalOcean Form Fields

### Environment Variables Section:
```
Key: API_BASE_URL
Value: https://<YOUR-CLOUD-RUN-SERVICE>.run.app  ← Replace this!
Scope: Build time
Encrypt: ON
```

### Build Settings:
```
Build Command: (leave empty)
Output Directory: (leave empty)
```

### Region:
```
NYC3 (or closest to your audience)
```

---

## 🔧 Backend CORS - Add These Origins

In your Cloud Run/FastAPI backend, add these exact URLs:

```
https://www.consensetech.com
https://consensetech.com
https://<your-do-app>.ondigitalocean.app  ← Replace with actual DO app domain
```

---

## ✅ Quick Checklist

- [ ] Have Cloud Run service URL ready
- [ ] Create DigitalOcean app
- [ ] Set `API_BASE_URL` environment variable
- [ ] Deploy and copy temporary DO domain
- [ ] Add CNAME in Namecheap for `www`
- [ ] Add URL redirect in Namecheap for root
- [ ] Verify domain in DigitalOcean (wait 5-30 min)
- [ ] Enable Force HTTPS
- [ ] Update backend CORS with new domains
- [ ] Test website and contact form

---

## 📍 Where to Find Everything

| What You Need | Where to Find It |
|---------------|------------------|
| Cloud Run URL | https://console.cloud.google.com/run → Your service |
| DO App Domain | https://cloud.digitalocean.com/apps → Your app → Settings → Domains |
| Namecheap DNS | https://ap.www.namecheap.com/domains/list/ → Manage → Advanced DNS |

---

## 🧪 Test After Setup

```bash
# Test CORS
curl -i https://<YOUR-CLOUD-RUN>.run.app/health/crypto \
  -H "Origin: https://www.consensetech.com"

# Check DNS
dig www.consensetech.com
```

---

**That's it!** Fill in these 2-3 values and you're good to go! 🚀

