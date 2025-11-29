# Certificate Images

This folder contains diploma/certificate images for featured certifications.

## How to Add Featured Certificates

### Step 1: Prepare Your Certificate Images
1. Save your certificate/diploma images (screenshots or PDFs converted to images)
2. Recommended format: JPG or PNG
3. Recommended size: 1200x800px or similar aspect ratio (3:2)
4. Name them descriptively (e.g., `spring-cloud.jpg`, `machine-learning.jpg`)

### Step 2: Add Images to This Folder
Place your certificate images in this `public/certificates/` folder:
```
public/
  certificates/
    spring-cloud.jpg
    machine-learning.jpg
    react-basics.jpg
    ...
```

### Step 3: Update Translation Files
Open `src/i18n/locales/en.json` and `src/i18n/locales/fr.json`

Add `"featured": true` and `"image": "/certificates/your-image.jpg"` to any certificate you want to feature:

**Example:**
```json
{
  "title": "Advanced Spring Cloud Microservices & Deployment with Docker",
  "issuer": "Packt",
  "date": "Nov 2025",
  "credentialId": "XHTS8D3AGOCY",
  "link": "https://www.coursera.org/account/accomplishments/verify/XHTS8D3AGOCY",
  "featured": true,
  "image": "/certificates/spring-cloud.jpg"
}
```

### Step 4: Result
Featured certificates will appear at the top in a special 2-column grid with:
- Large diploma image display
- ⭐ Featured badge
- Hover zoom effect on image
- Larger card size with enhanced styling
- All other certificates appear in the regular 3-column grid below

## Tips
- Keep featured certificates to 2-4 for best visual impact
- Use high-quality images for professional appearance
- You can download certificate images from Coursera by opening the certificate and taking a screenshot
- Images are automatically optimized for display
