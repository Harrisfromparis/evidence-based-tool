# Autism and Me Ltd - Evidence-Based Practice Platform

A comprehensive web application providing educators, parents, and professionals with evidence-based practices (EBPs) for supporting autistic students in Irish educational settings.

## 🔒 Data Privacy & Isolation

**IMPORTANT: Each deployment of this app has completely isolated data storage.**

When someone downloads or deploys this application:
- They get a **clean, empty database** with NO data from any other instance
- All user data is stored in their own isolated `spark.kv` storage
- Your development data, analytics, saved plans, and inputs are **NOT included** in their deployment
- Each app instance is completely independent and private

### What Gets Isolated Per Deployment:
- ✅ Admin analytics (tool usage, page views, session data)
- ✅ Saved lesson plans and intervention strategies
- ✅ User preferences and settings
- ✅ Audio narration preferences
- ✅ Custom child profiles
- ✅ All user-generated content

### What's Shared Across All Deployments:
- ✅ EBP library content (educational resources)
- ✅ Case studies and examples
- ✅ Tool templates and planners
- ✅ Rights & ethics information
- ✅ Visual design and functionality

## 🎯 Features

### For Educators
- 27 evidence-based practice guides with Irish school examples
- Interactive planning tools for interventions
- AI-powered lesson script generator
- Case studies from Irish educational settings
- Tools for creating visual supports, social narratives, task analyses

### For Parents
- Parent-friendly EBP guides
- Tools for home implementation
- Communication templates
- Progress tracking resources

### Admin Dashboard
- Usage analytics (tool usage, page views, sessions)
- Email template management
- Data export functionality
- Only visible to app owner (uses `spark.user().isOwner`)

## 🚀 Deployment

Each time this app is deployed to a new environment, the deployer gets:
1. A fresh instance with empty data storage
2. All the educational content and tools
3. Their own isolated analytics and user data
4. Complete privacy from other deployments

## 📦 Technical Architecture

### Data Storage
Uses Spark's `spark.kv` API for all data persistence:
- Browser-independent storage
- Persists across sessions
- Completely isolated per deployment
- No shared backend or database

### Key Technologies
- React 19 with TypeScript
- Tailwind CSS for styling
- Shadcn UI components
- Framer Motion for animations
- Spark Runtime SDK for LLM features

## 📄 License

Copyright © 2026 Autism and Me Ltd. All rights reserved.

The Spark Template files and resources from GitHub are licensed under the MIT license, Copyright GitHub, Inc.
