# DigitalOcean App Platform Setup Checklist

## Required Information & Values

### 1. GitHub Repository Details
- **Repository**: `consenseceo/consensetech-website`
- **Branch**: `main`
- **Root Path**: `/` (leave as default)

### 2. Build & Output Settings
- **Build Strategy**: `HTML` (auto-detected)
- **Build Command**: `(leave empty)`
- **Output Directory**: `(leave empty)` or `.` if required

### 3. Network & Routes
- **HTTP Route**: `/` → Static Site (default, no changes needed)

### 4. Environment Variables

#### Required Variable:
- **Key**: `API_BASE_URL`
- **Value**: `https://<your-cloud-run-service>.run.app`
  - ⚠️ **ACTION NEEDED**: Replace `<your-cloud-run-service>` with your actual Cloud Run service URL
  - Example: `https://consense-api-xyz123.run.app`
- **Scope**: `Build time`
- **Encrypt**: Optional (recommended: ON)

### 5. Region Selection
- **Recommended**: `NYC3` (for US/Ghana audience)
- **Alternative Options**: 
  - `SFO3` (US West Coast)
  - `AMS3` (Europe)
  - `SGP1` (Asia Pacific)
- **CDN**: Auto-enabled (no action needed)

### 6. Domain Configuration (Namecheap)

#### Primary Domain Setup:
- **Domain**: `www.consensetech.com`
- **Type**: `CNAME`
- **Host**: `www`
- **Value**: `<your-app>.ondigitalocean.app`
  - ⚠️ **ACTION NEEDED**: Replace `<your-app>` with your actual DO app name
  - Example: `consensetech-website-xyz123.ondigitalocean.app`

#### Root Domain Setup (Option A - Recommended):
- **Domain**: `consensetech.com`
- **Type**: `URL Redirect Record`
- **Value**: `https://www.consensetech.com`
- **Redirect Type**: `301 Permanent`

#### Root Domain Setup (Option B - Alternative):
- **Domain**: `consensetech.com`
- **Type**: `A Record`
- **Value**: `<IP addresses from DigitalOcean>`
  - ⚠️ **ACTION NEEDED**: Get IP addresses from DO App → Settings → Domains
- **Note**: Keep existing Gmail MX records untouched

### 7. DigitalOcean App Settings
- **Force HTTPS**: Enable (after domain verification)
- **Temporary Domain**: `*.ondigitalocean.app` (auto-generated)

### 8. CORS Configuration (Backend/Cloud Run)

#### Allowed Origins (add to your backend CORS config):
```
https://www.consensetech.com
https://consensetech.com
https://<your-do-app>.ondigitalocean.app
```

#### CORS Headers:
- **Methods**: `GET, POST, PUT, DELETE, OPTIONS`
- **Headers**: `Content-Type, X-Idempotency-Key`
- **Access-Control-Allow-Origin**: `<exact origin>` (not `*` if using credentials)

### 9. API Endpoint Configuration

#### Contact Form Endpoint:
- **URL**: `https://<your-cloud-run-service>.run.app/public/contact`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`

### 10. Testing URLs

#### Verify CORS:
```bash
curl -i https://<your-cloud-run>.run.app/health/crypto \
  -H "Origin: https://www.consensetech.com"
```

Expected response header:
```
Access-Control-Allow-Origin: https://www.consensetech.com
```

---

## Step-by-Step Checklist

### Phase 1: App Creation
- [ ] Go to DigitalOcean → Apps → Create App
- [ ] Connect GitHub account
- [ ] Select repository: `consenseceo/consensetech-website`
- [ ] Select branch: `main`
- [ ] Confirm Root path: `/`
- [ ] Verify Build Strategy: `HTML` (auto-detected)

### Phase 2: Build Configuration
- [ ] Build Command: Leave empty
- [ ] Output Directory: Leave empty (or `.` if required)

### Phase 3: Environment Variables
- [ ] Add variable: `API_BASE_URL`
- [ ] Set value: `https://<YOUR-CLOUD-RUN-URL>.run.app`
- [ ] Set scope: `Build time`
- [ ] Enable encryption (optional)

### Phase 4: Region & Deploy
- [ ] Select region: `NYC3` (or preferred)
- [ ] Review settings
- [ ] Click "Create Resources" / "Deploy"
- [ ] Wait for deployment
- [ ] Note temporary domain: `https://<app-name>.ondigitalocean.app`

### Phase 5: Domain Setup (Namecheap)
- [ ] Go to Namecheap → Advanced DNS
- [ ] Add CNAME record:
  - Host: `www`
  - Value: `<your-do-app>.ondigitalocean.app`
- [ ] Add URL Redirect (Option A):
  - Type: `URL Redirect Record`
  - Value: `https://www.consensetech.com`
  - Redirect: `301 Permanent`
- [ ] OR Add A Records (Option B):
  - Get IPs from DigitalOcean
  - Add A records pointing to those IPs
- [ ] Keep existing Gmail MX records unchanged

### Phase 6: Domain Verification (DigitalOcean)
- [ ] Go to App → Settings → Domains
- [ ] Click "Add Domain"
- [ ] Enter: `www.consensetech.com`
- [ ] Click "Verify"
- [ ] Wait for DNS propagation (5-30 minutes)
- [ ] Enable "Force HTTPS"

### Phase 7: Backend CORS Update
- [ ] Update Cloud Run backend CORS configuration
- [ ] Add allowed origins:
  - `https://www.consensetech.com`
  - `https://consensetech.com`
  - `https://<your-do-app>.ondigitalocean.app`
- [ ] Verify CORS with curl test
- [ ] Test contact form submission

### Phase 8: Final Testing
- [ ] Visit `https://www.consensetech.com`
- [ ] Verify HTTPS redirect works
- [ ] Test all page sections load
- [ ] Test contact form submission
- [ ] Verify mobile responsiveness
- [ ] Check browser console for errors

---

## Values You Need to Fill In

### 🔴 Critical - Must Replace:

1. **Cloud Run Service URL**
   - Current placeholder: `<your-cloud-run-service>`
   - Where to find: Google Cloud Console → Cloud Run → Your service → URL
   - Example format: `consense-api-abc123xyz.run.app`

2. **DigitalOcean App Name**
   - Current placeholder: `<your-app>`
   - Where to find: DigitalOcean App Platform → Your app → Settings
   - Example format: `consensetech-website-xyz123`

3. **DigitalOcean App Domain**
   - Current placeholder: `<your-do-app>`
   - Same as above
   - Full format: `https://consensetech-website-xyz123.ondigitalocean.app`

### 🟡 Optional - May Need:

4. **Custom API Endpoints**
   - If your contact form uses a different endpoint
   - Current: `/public/contact`
   - Update in `script.js` if different

5. **Additional Environment Variables**
   - If you add more API keys or configs later
   - Add them in the same Environment Variables section

---

## Quick Reference URLs

### DigitalOcean
- **App Platform Dashboard**: https://cloud.digitalocean.com/apps
- **Your App**: https://cloud.digitalocean.com/apps/<your-app-id>

### Namecheap
- **Domain Management**: https://ap.www.namecheap.com/domains/list/
- **DNS Settings**: Advanced DNS tab for `consensetech.com`

### Google Cloud
- **Cloud Run Console**: https://console.cloud.google.com/run
- **Your Service**: Find your service URL here

### GitHub
- **Repository**: https://github.com/consenseceo/consensetech-website

---

## Notes

- **DNS Propagation**: Can take 5-30 minutes, sometimes up to 48 hours
- **HTTPS**: DigitalOcean automatically provisions SSL certificates
- **CDN**: Enabled automatically for static sites
- **Build Time**: Static sites deploy in ~1-2 minutes
- **Cost**: Static sites on DO App Platform have a free tier, then ~$5/month

---

## Troubleshooting

### Domain Not Verifying?
- Wait 30+ minutes for DNS propagation
- Use `dig www.consensetech.com` to check DNS records
- Verify CNAME points to correct DO app domain

### CORS Errors?
- Check backend CORS configuration includes your domain
- Verify exact origin match (including `https://`)
- Test with curl command provided above

### Contact Form Not Working?
- Check browser console for errors
- Verify `API_BASE_URL` environment variable is set
- Confirm backend endpoint exists and accepts POST requests
- Check CORS allows your domain

