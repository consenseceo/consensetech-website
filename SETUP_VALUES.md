# Setup Values - Fill These In

## 🔴 Required Values

### 1. Cloud Run Service URL
**What**: Your backend API URL from Google Cloud Run  
**Where to find**: Google Cloud Console → Cloud Run → Your service → URL  
**Format**: `https://<service-name>-<random-hash>.run.app`

**Example**:
```
https://consense-api-abc123xyz.run.app
```

**Where to use**:
- ✅ DigitalOcean Environment Variable: `API_BASE_URL`
- ✅ Backend CORS configuration
- ✅ Update in `index.html` meta tag (line 7) if not using build script

---

### 2. DigitalOcean App Name/Domain
**What**: Your app's auto-generated domain  
**Where to find**: DigitalOcean App Platform → Your app → Settings → Domains  
**Format**: `https://<app-name>-<random-hash>.ondigitalocean.app`

**Example**:
```
https://consensetech-website-xyz123.ondigitalocean.app
```

**Where to use**:
- ✅ Namecheap CNAME record value (for `www` subdomain)
- ✅ Backend CORS configuration

---

### 3. Namecheap DNS Records

#### CNAME Record (www subdomain)
- **Host**: `www`
- **Type**: `CNAME`
- **Value**: `<your-do-app>.ondigitalocean.app` (from #2 above, without https://)
- **TTL**: `Automatic` or `30 min`

**Example**:
```
Host: www
Type: CNAME
Value: consensetech-website-xyz123.ondigitalocean.app
```

#### URL Redirect (root domain - Recommended)
- **Host**: `@`
- **Type**: `URL Redirect Record`
- **Value**: `https://www.consensetech.com`
- **Redirect Type**: `301 Permanent`

**OR** A Records (if you prefer):
- **Host**: `@`
- **Type**: `A Record`
- **Value**: `<IP addresses from DigitalOcean>` (get from DO App → Settings → Domains)
- **TTL**: `Automatic`

---

## 📝 DigitalOcean App Platform Form Fields

### Step 1: Connect Repository
- **Source**: `GitHub`
- **Repository**: `consenseceo/consensetech-website`
- **Branch**: `main`
- **Root Directory**: `/` (default)

### Step 2: Configure Build
- **Build Strategy**: `HTML` (auto-detected)
- **Build Command**: `(leave empty)` or `node build.js` if using build script
- **Output Directory**: `(leave empty)` or `.`

### Step 3: Environment Variables
Click "Edit" next to Environment Variables, then add:

**Variable 1**:
- **Key**: `API_BASE_URL`
- **Value**: `https://<YOUR-CLOUD-RUN-SERVICE>.run.app` (from #1 above)
- **Scope**: `Build time`
- **Encrypt**: `ON` (recommended)

**Variable 2** (optional):
- **Key**: `NODE_ENV`
- **Value**: `production`
- **Scope**: `Build time`

### Step 4: Region
- **Region**: `NYC3` (recommended) or choose closest to your audience

### Step 5: Domain (after initial deploy)
- **Domain**: `www.consensetech.com`
- **Verify**: Wait 5-30 minutes for DNS propagation
- **Force HTTPS**: Enable after verification

---

## 🔧 Backend CORS Configuration

Add these exact origins to your Cloud Run/FastAPI backend:

```python
# Example for FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://www.consensetech.com",
        "https://consensetech.com",
        "https://<your-do-app>.ondigitalocean.app",  # Replace with actual DO app domain
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "X-Idempotency-Key"],
)
```

**Replace**: `<your-do-app>` with your actual DigitalOcean app domain (from #2 above)

---

## ✅ Quick Checklist

### Before Starting
- [ ] Have your Cloud Run service URL ready
- [ ] Have access to Namecheap DNS settings
- [ ] Have DigitalOcean account ready

### During Setup
- [ ] Create DigitalOcean app
- [ ] Set environment variable `API_BASE_URL`
- [ ] Deploy and note temporary domain
- [ ] Add CNAME record in Namecheap for `www`
- [ ] Add URL redirect in Namecheap for root domain
- [ ] Verify domain in DigitalOcean
- [ ] Enable Force HTTPS
- [ ] Update backend CORS with new domains

### After Setup
- [ ] Test website loads at `https://www.consensetech.com`
- [ ] Test contact form submission
- [ ] Verify mobile responsiveness
- [ ] Check browser console for errors
- [ ] Test CORS with curl command

---

## 🧪 Testing Commands

### Test CORS Configuration
```bash
curl -i https://<YOUR-CLOUD-RUN>.run.app/health/crypto \
  -H "Origin: https://www.consensetech.com"
```

**Expected response header**:
```
Access-Control-Allow-Origin: https://www.consensetech.com
```

### Check DNS Propagation
```bash
dig www.consensetech.com
# Should show CNAME pointing to your DO app domain
```

### Test Contact Form Endpoint
```bash
curl -X POST https://<YOUR-CLOUD-RUN>.run.app/public/contact \
  -H "Content-Type: application/json" \
  -H "Origin: https://www.consensetech.com" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

---

## 📍 Where to Find Information

### Cloud Run URL
1. Go to: https://console.cloud.google.com/run
2. Click on your service
3. Copy the URL from the top of the page

### DigitalOcean App Domain
1. Go to: https://cloud.digitalocean.com/apps
2. Click on your app
3. Go to Settings → Domains
4. Copy the `.ondigitalocean.app` domain

### Namecheap DNS
1. Go to: https://ap.www.namecheap.com/domains/list/
2. Click "Manage" next to `consensetech.com`
3. Go to "Advanced DNS" tab
4. Add/edit records there

---

## 💡 Pro Tips

1. **DNS Propagation**: Can take 5-30 minutes, sometimes up to 48 hours. Be patient!
2. **SSL Certificates**: DigitalOcean automatically provisions SSL - no manual setup needed
3. **CDN**: Enabled automatically for static sites - great for global performance
4. **Build Time**: Static sites deploy in ~1-2 minutes
5. **Cost**: Free tier available, then approximately $5/month for static sites

---

## 🆘 Troubleshooting

### Domain Not Verifying?
- Wait 30+ minutes for DNS propagation
- Double-check CNAME record points to correct DO app domain
- Use `dig www.consensetech.com` to verify DNS

### CORS Errors?
- Verify backend CORS includes exact domain (with `https://`)
- Test with curl command above
- Check browser console for specific error

### Contact Form Not Working?
- Check `API_BASE_URL` environment variable is set correctly
- Verify backend endpoint exists: `/public/contact`
- Check browser console for errors
- Ensure CORS allows your domain

