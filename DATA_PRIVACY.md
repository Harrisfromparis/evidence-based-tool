# Data Privacy & Isolation Guide

## Overview

This document explains how data works in the Autism and Me application and confirms that **each deployment is completely isolated** with no shared data between instances.

## How Data Storage Works

### Spark KV Storage Architecture

This application uses **Spark's Key-Value (KV) storage system** which provides:

1. **Complete Isolation**: Each deployed instance has its own separate storage
2. **No Shared Database**: There is no central database that stores data across deployments
3. **Privacy by Design**: One user's data can never access another user's data
4. **Browser Independence**: Data persists even if you clear browser cache (unlike localStorage)

### What This Means for Deployments

When someone downloads/forks/deploys this app:

```
Your Development Instance          Their New Deployment
├── Your analytics data            ├── Empty (starts at 0)
├── Your saved plans               ├── Empty (none saved)
├── Your user preferences          ├── Default settings
├── Your child profiles            ├── Empty (none created)
└── Your session history           └── Fresh start (no history)
```

**They DO NOT get any of your data.** Each deployment is a clean slate.

## Data Categories

### 1. Instance-Specific Data (Isolated Per Deployment)

These are stored in `spark.kv` and are **completely private** to each deployment:

#### Admin Analytics (`admin-analytics` key)
```typescript
{
  toolUsage: { [toolName: string]: number },
  ebpViews: { [ebpName: string]: number },
  totalSessions: number,
  totalUsers: number,
  emailsSent: number,
  lastUpdated: string
}
```

#### Saved Plans (`saved-plans` key)
```typescript
{
  [planId: string]: {
    id: string,
    type: string,
    title: string,
    content: any,
    createdAt: string,
    updatedAt: string
  }
}
```

#### User Preferences
- `user-has-visited`: Boolean tracking first visit
- `narration-enabled`: Audio narration preference
- `narration-rate`: Speech rate setting
- `narration-pitch`: Speech pitch setting
- `narration-voice`: Selected voice

#### Child Profiles (`child-profiles` key)
```typescript
{
  [childId: string]: {
    id: string,
    name: string,
    age: number,
    interests: string[],
    challenges: string[],
    strengths: string[],
    createdAt: string
  }
}
```

### 2. Shared Application Code (Same Across All Deployments)

These are part of the codebase and are **the same for everyone**:

#### Educational Content
- EBP library (27 evidence-based practices)
- Case studies with Irish examples
- Rights and ethics information
- Tool templates and frameworks

#### Application Features
- UI components and styling
- Planning tools
- AI integration
- Email templates
- Export functionality

## Verification

### How to Confirm Data Isolation

1. **Check Storage Keys**: Run this in browser console on any deployment:
   ```javascript
   spark.kv.keys().then(keys => console.log(keys))
   ```
   New deployments will return an empty array `[]`.

2. **Check Analytics**: Navigate to Admin Dashboard (owner only)
   - New deployments show 0 for all metrics
   - Your development instance shows your accumulated data
   - These numbers never cross between deployments

3. **Check Saved Plans**: Navigate to Tools → Saved Plans
   - New deployments have no saved plans
   - Your plans don't appear in other deployments

## Data Lifecycle

### Development Instance (Your Current Work)
```
Day 1: Install app → Empty storage
Day 2: Create plans, test tools → Data accumulates in YOUR storage
Day 3: Test analytics → Metrics specific to YOUR usage
Day 30: Export data → Only YOUR data is exported
```

### New Deployment (Someone Else's Instance)
```
Day 1: Deploy app → Empty storage (fresh start)
Day 2: Create their plans → Data accumulates in THEIR storage
Day 3: Check analytics → Only THEIR metrics show
Day 30: Export data → Only THEIR data is exported
```

**No crossover. No shared data. Complete isolation.**

## Privacy Guarantees

✅ **Your saved lesson plans**: Stay in your deployment only  
✅ **Your analytics data**: Never visible to other deployments  
✅ **Your child profiles**: Completely private to your instance  
✅ **Your preferences**: Isolated to your deployment  
✅ **Your usage patterns**: Only tracked in your storage  
✅ **Your custom content**: Never shared across deployments  

## Technical Implementation

### Storage API Usage Examples

All data operations use the isolated KV API:

```typescript
// Writing data (isolated to this deployment)
await spark.kv.set('my-data', { value: 'private' })

// Reading data (only reads from this deployment)
const data = await spark.kv.get('my-data')

// Listing keys (only shows keys from this deployment)
const keys = await spark.kv.keys()

// Deleting data (only affects this deployment)
await spark.kv.delete('my-data')
```

### No Shared Backend

This application has:
- ❌ No central database server
- ❌ No shared API endpoints for data
- ❌ No cross-deployment data sync
- ❌ No multi-tenant storage
- ✅ Complete per-deployment isolation
- ✅ Privacy by architecture

## FAQs

### Q: Can someone see my saved plans if they deploy the app?
**A: No.** Plans are stored in your deployment's KV storage only.

### Q: Will my analytics data be visible to others?
**A: No.** Analytics are per-deployment and only visible to the deployment owner.

### Q: If I input test data, will it appear in downloaded versions?
**A: No.** Test data stays in your development instance only.

### Q: Can I share my data with another deployment?
**A: Not automatically.** You would need to manually export and import data.

### Q: What happens if I delete all my data?
**A: Only your deployment is affected.** Other deployments remain unchanged.

### Q: Is there any way for deployments to share data?
**A: No.** The architecture prevents cross-deployment data access.

## Summary

🔒 **Complete Isolation**: Each deployment has its own private data storage  
🚫 **No Data Leakage**: Your data never appears in other deployments  
✨ **Clean Deployments**: New instances start with empty storage  
🛡️ **Privacy First**: Architecture prevents data sharing by design  
📦 **Content Included**: Educational resources are part of the code, not stored data  

**Bottom Line**: When someone downloads this app, they get a clean, empty version with all the tools and content, but NONE of your personal data, analytics, saved plans, or usage history.
