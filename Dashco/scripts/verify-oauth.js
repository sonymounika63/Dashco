/**
 * OAuth Configuration Verification Script
 * 
 * Run this script to verify OAuth is properly configured:
 * node verify-oauth.js
 * 
 * This script checks:
 * 1. Environment variables are set
 * 2. Supabase URL is correct
 * 3. Required files exist
 * 4. OAuth callback URI is documented
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('\n🔍 Verifying OAuth Configuration...\n');

let hasErrors = false;

// 1. Check .env file
console.log('1️⃣  Checking .env file...');
const envPath = join(projectRoot, '.env');
if (!existsSync(envPath)) {
  console.log('   ❌ .env file not found!');
  console.log('   → Create .env file from .env.example');
  hasErrors = true;
} else {
  const envContent = readFileSync(envPath, 'utf-8');
  
  // Check VITE_SUPABASE_URL
  if (envContent.includes('VITE_SUPABASE_URL=')) {
    const urlMatch = envContent.match(/VITE_SUPABASE_URL=(.+)/);
    const url = urlMatch ? urlMatch[1].trim() : '';
    
    if (url === 'https://cpmjtrrbzupvgqcapxak.supabase.co') {
      console.log('   ✅ VITE_SUPABASE_URL: Correct');
    } else if (url) {
      console.log(`   ⚠️  VITE_SUPABASE_URL: ${url}`);
      console.log('   ⚠️  Expected: https://cpmjtrrbzupvgqcapxak.supabase.co');
      hasErrors = true;
    } else {
      console.log('   ❌ VITE_SUPABASE_URL: Not set');
      hasErrors = true;
    }
  } else {
    console.log('   ❌ VITE_SUPABASE_URL: Not found in .env');
    hasErrors = true;
  }
  
  // Check VITE_SUPABASE_ANON_KEY
  if (envContent.includes('VITE_SUPABASE_ANON_KEY=')) {
    const keyMatch = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/);
    const key = keyMatch ? keyMatch[1].trim() : '';
    
    if (key && key.length > 20) {
      console.log('   ✅ VITE_SUPABASE_ANON_KEY: Set');
    } else {
      console.log('   ❌ VITE_SUPABASE_ANON_KEY: Invalid or not set');
      hasErrors = true;
    }
  } else {
    console.log('   ❌ VITE_SUPABASE_ANON_KEY: Not found in .env');
    hasErrors = true;
  }
}

// 2. Check OAuth callback URI in auth.js
console.log('\n2️⃣  Checking OAuth configuration...');
const authPath = join(projectRoot, 'src', 'lib', 'auth.js');
if (!existsSync(authPath)) {
  console.log('   ❌ src/lib/auth.js not found!');
  hasErrors = true;
} else {
  const authContent = readFileSync(authPath, 'utf-8');
  
  if (authContent.includes('signInWithOAuth')) {
    console.log('   ✅ signInWithGoogle() function exists');
    
    // Check for proper OAuth configuration
    if (authContent.includes("provider: 'google'")) {
      console.log('   ✅ Google OAuth provider configured');
    }
    
    if (authContent.includes('redirectTo')) {
      console.log('   ✅ Redirect URL configuration found');
    }
    
    if (authContent.includes('select_account consent')) {
      console.log('   ✅ Account selection prompt configured');
    }
  } else {
    console.log('   ❌ OAuth function not found in auth.js');
    hasErrors = true;
  }
}

// 3. Verify documentation
console.log('\n3️⃣  Checking documentation...');
const oauthDocPath = join(projectRoot, 'OAUTH_SETUP.txt');
if (existsSync(oauthDocPath)) {
  console.log('   ✅ OAUTH_SETUP.txt exists');
  const docContent = readFileSync(oauthDocPath, 'utf-8');
  
  if (docContent.includes('cpmjtrrbzupvgqcapxak.supabase.co/auth/v1/callback')) {
    console.log('   ✅ Callback URI documented correctly');
  } else {
    console.log('   ⚠️  Callback URI not found in documentation');
  }
} else {
  console.log('   ⚠️  OAUTH_SETUP.txt not found');
  hasErrors = true;
}

const readmePath = join(projectRoot, 'README.md');
if (existsSync(readmePath)) {
  const readmeContent = readFileSync(readmePath, 'utf-8');
  
  if (readmeContent.includes('cpmjtrrbzupvgqcapxak.supabase.co/auth/v1/callback')) {
    console.log('   ✅ Callback URI documented in README.md');
  } else {
    console.log('   ⚠️  Callback URI not documented in README.md');
  }
}

// 4. Final Report
console.log('\n' + '='.repeat(60));

if (hasErrors) {
  console.log('❌ VERIFICATION FAILED - Please fix the issues above');
  console.log('\nRequired Actions:');
  console.log('1. Ensure .env file exists with correct values');
  console.log('2. Verify VITE_SUPABASE_URL matches: https://cpmjtrrbzupvgqcapxak.supabase.co');
  console.log('3. Check that VITE_SUPABASE_ANON_KEY is set');
  process.exit(1);
} else {
  console.log('✅ ALL CHECKS PASSED');
  console.log('\n📋 OAuth Callback URI:');
  console.log('   https://cpmjtrrbzupvgqcapxak.supabase.co/auth/v1/callback');
  console.log('\n✓ Configuration is correct');
  console.log('✓ Ready for Google OAuth');
  console.log('\n⚠️  Manual Verification Required:');
  console.log('   → Verify this URI is registered in Google Cloud Console');
  console.log('   → Go to: https://console.cloud.google.com/apis/credentials');
  console.log('   → Check OAuth 2.0 Client ID → Authorized redirect URIs');
  console.log('\n');
}

