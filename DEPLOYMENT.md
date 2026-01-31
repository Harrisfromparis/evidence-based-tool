# Deployment Checklist

## Pre-Deployment Verification

Use this checklist before sharing or deploying the Autism and Me application.

### ✅ Data Privacy Verification

- [ ] **Confirm data isolation**: Read `DATA_PRIVACY.md` to understand storage architecture
- [ ] **Verify no hardcoded data**: Check that no personal data is hardcoded in source files
- [ ] **Test clean deployment**: Deploy to test environment and verify empty storage
- [ ] **Check admin access**: Confirm admin dashboard only shows to deployment owner

### ✅ Content Review

- [ ] **Educational content current**: EBP library reflects latest evidence-based practices
- [ ] **Irish examples relevant**: Case studies use appropriate Irish educational context
- [ ] **Links functional**: All external resources and references work
- [ ] **Copyright compliance**: All content properly attributed (Copyright © 2026)

### ✅ Functional Testing

- [ ] **All tools working**: Test each planning tool and generator
- [ ] **AI features functional**: Verify LLM integration for script generation
- [ ] **Export features**: Test PDF and email export functionality
- [ ] **Audio narration**: Verify text-to-speech features work
- [ ] **Responsive design**: Test on mobile, tablet, and desktop

### ✅ Technical Health

- [ ] **No console errors**: Check browser console for errors
- [ ] **Performance acceptable**: Test load times and responsiveness
- [ ] **Dependencies updated**: Check for security updates
- [ ] **TypeScript builds**: No type errors in production build

### ✅ Documentation

- [ ] **README.md complete**: Clear explanation of features and data isolation
- [ ] **DATA_PRIVACY.md available**: Users can understand privacy guarantees
- [ ] **License current**: Copyright and licensing information up to date

## Deployment Process

### 1. For GitHub/Public Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Release version X.X.X"
git push origin main

# Tag release
git tag -a vX.X.X -m "Version X.X.X"
git push origin vX.X.X
```

### 2. For Spark Deployment

The Spark platform automatically:
- ✅ Creates isolated KV storage for each deployment
- ✅ Ensures no data crossover between instances
- ✅ Provides fresh environment for each user

### 3. Post-Deployment Verification

- [ ] **Access deployment URL**: Verify app loads correctly
- [ ] **Test storage isolation**: Run `spark.kv.keys()` in console - should return `[]`
- [ ] **Check admin dashboard**: Only deployment owner can access
- [ ] **Verify analytics start at zero**: No pre-existing usage data

## What Gets Deployed

### ✅ Included in Deployment

```
✅ Application code (React components, TypeScript)
✅ UI styling (Tailwind CSS, custom themes)
✅ Educational content (EBP library, case studies)
✅ Tool templates (planning tools, generators)
✅ Static assets (fonts, icons, images)
✅ Configuration files (Vite, TypeScript, etc.)
```

### ❌ NOT Included in Deployment

```
❌ Your saved lesson plans
❌ Your analytics data
❌ Your child profiles
❌ Your user preferences
❌ Your session history
❌ Your test data
❌ Your usage patterns
❌ Any personally identifiable information
```

## Common Scenarios

### Scenario 1: Sharing with Colleague
**Q**: I want to share this app with a colleague at another school.  
**A**: Send them the repository URL. They'll get a clean version with no data.

### Scenario 2: Public Distribution
**Q**: Can I make this publicly available?  
**A**: Yes. Each person who deploys it gets their own isolated instance.

### Scenario 3: Client Deployment
**Q**: I'm deploying for a client. Will they see my test data?  
**A**: No. They get a clean deployment with empty storage.

### Scenario 4: Multiple School Sites
**Q**: Can I deploy to multiple schools?  
**A**: Yes. Each school gets their own isolated deployment with private data.

## Data Management

### Exporting Your Data (Optional)

If you want to provide starter data or templates:

1. **Create Export Package**:
   - Use Admin Dashboard → Export Data
   - Save exported JSON file
   - Document how to import (requires manual implementation)

2. **Document Import Process**:
   - Provide instructions for importing data
   - Make it opt-in for new deployments
   - Ensure users understand data origin

### Clearing Development Data

If you want to reset your development instance:

```javascript
// In browser console
const keys = await spark.kv.keys()
for (const key of keys) {
  await spark.kv.delete(key)
}
console.log('All data cleared')
```

## Security Considerations

- [ ] **No secrets in code**: API keys, tokens stored securely (not in repo)
- [ ] **Owner-only features**: Admin dashboard restricted to deployment owner
- [ ] **Data validation**: All user inputs sanitized and validated
- [ ] **Error handling**: No sensitive data leaked in error messages

## Support and Issues

### For Developers Deploying This App

- Read `DATA_PRIVACY.md` for storage architecture details
- Check `README.md` for feature overview
- Review `PRD.md` for design decisions

### For End Users

- Each deployment is independent and private
- No data is shared between deployments
- Your data stays in your deployment only

## Final Confirmation

Before deploying, confirm:

✅ **I understand**: Each deployment has isolated data storage  
✅ **I verified**: No personal data is hardcoded in source files  
✅ **I tested**: Clean deployment shows empty storage  
✅ **I documented**: Users understand data privacy guarantees  

---

**Remember**: The architecture ensures data isolation by design. Your development data will never appear in other deployments. Each instance is completely independent.
