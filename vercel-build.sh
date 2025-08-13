#!/bin/bash

# Vercel build script for SpaceWeb
echo "🚀 Starting SpaceWeb build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Build the project
echo "🔨 Building project..."
npm run build

# Verify build output
echo "✅ Build completed successfully!"
echo "📁 Build output directory: dist/"
ls -la dist/

echo "🎉 SpaceWeb is ready for deployment!"
