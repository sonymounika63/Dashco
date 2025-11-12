# Dashco - Dashboard Application

Modern React dashboard application built with React 19, Tailwind CSS 4, and Supabase backend.

## Tech Stack

- **Frontend**: React 19.1.1, React Router 7, Tailwind CSS 4.1.16
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Icons**: Font Awesome 7.1.0
- **Build Tool**: Vite 7.1.7

## Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Git

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Dashco
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase Connection

1. **Get your Supabase credentials:**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Select your project: **Dashco** (cpmjtrrbzupvgqcapxak)
   - Navigate to **Settings** > **API**
   - Copy your **Project URL** and **anon/public key**

2. **Create `.env` file from template:**
```bash
cp .env.example .env
```

3. **Edit `.env` and add your Supabase credentials:**
```env
VITE_SUPABASE_URL=https://cpmjtrrbzupvgqcapxak.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Note:** Your Supabase project URL is: `https://cpmjtrrbzupvgqcapxak.supabase.co`

Get your anon key from Supabase Dashboard > Settings > API > Project API keys > `anon` `public`

### 4. Verify Supabase Connection

Start the development server:

```bash
npm run dev
```

The app should start without errors. If you see environment variable errors, double-check your `.env` file.

### 5. Initialize Supabase CLI (Optional, for migrations)

```bash
# Install Supabase CLI globally (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref cpmjtrrbzupvgqcapxak
```

## Project Structure

```
Dashco/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── lib/            # Utilities (Supabase client, auth, etc.)
│   ├── hooks/          # React hooks
│   ├── config/         # Configuration files (OAuth, etc.)
│   └── assets/         # Static assets (CSS, images, fonts)
├── public/             # Public static files
├── scripts/            # Utility scripts (deployment, OAuth verification)
├── docs/               # Documentation (TASKS, progress, guides)
├── supabase/           # Database migrations and functions
│   └── migrations/     # SQL migration files
├── .env.example        # Environment variables template
├── .env                # Your local environment variables (gitignored)
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite build configuration
```

## Available Scripts

**Development:**
- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Deployment:**
- `npm run predeploy` - Build before deploying
- `npm run deploy` - Deploy to GitHub Pages
- `npm run deploy:commit` - Deploy specific git commit to GitHub Pages
- `npm run list:deployments` - List all deployed commits

**Verification:**
- `npm run verify-oauth` - Verify OAuth configuration

## Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in client-side code.

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-side only) | No |

## Security & Best Practices

- **Never commit `.env` file** - It's already in `.gitignore`
- **Never expose service_role key** in client-side code
- Use RLS (Row Level Security) policies in Supabase for data access control
- All API keys in `.env` should use `VITE_` prefix for Vite projects

## Troubleshooting

### "Missing Supabase environment variables" error

1. Ensure `.env` file exists in project root
2. Check that variables are prefixed with `VITE_`
3. Restart the dev server after changing `.env`

### Connection issues

1. Verify your Supabase project is active
2. Check that your API keys are correct
3. Ensure your Supabase project allows connections from your IP

### Google OAuth Errors

#### Error 1: "doesn't comply with Google's OAuth 2.0 policy"

This error means the callback URL is not registered in Google Cloud Console.

**Fix**:
1. Go to: https://console.cloud.google.com/apis/credentials
2. Edit your OAuth 2.0 Client ID
3. Add **Authorized redirect URI**: `https://cpmjtrrbzupvgqcapxak.supabase.co/auth/v1/callback`
4. Save and try again

#### Error 2: "This browser or app may not be secure"

This error occurs when:
- Your OAuth app is in **Testing** mode
- Your email is not added as a test user
- Browser/user agent is not recognized (common with automated browsers)

**Fix**:
1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. Scroll to **"Test users"** section
3. Click **"+ ADD USERS"**
4. Add your email: `sonymounika63@gmail.com` (or any email you want to test with)
5. Click **"ADD"** and wait 1-2 minutes
6. Try signing in again in a **regular browser** (Chrome, Firefox)

**Note**: MCP browser tools may not work with Google OAuth. Use a regular browser for OAuth testing.

#### Chrome-Specific OAuth Issues

If OAuth works in Firefox but not in Chrome, this is likely due to Chrome's stricter cookie and storage policies:

**Fix Chrome Cookie/Storage Issues**:
1. **Enable Third-Party Cookies**:
   - Chrome Settings → Privacy and security → Cookies and other site data
   - Enable "Allow third-party cookies" OR add `localhost:5173` as an exception
   - Disable "Block third-party cookies" for localhost

2. **Check Storage Permissions**:
   - Chrome Settings → Privacy and security → Site settings
   - Ensure localhost has storage permissions enabled

3. **Not in Incognito Mode**:
   - Incognito mode blocks cookies and storage by default
   - Use a regular Chrome window for OAuth testing

4. **Clear Cookies and Cache**:
   - Clear cookies for `localhost:5173` and `cpmjtrrbzupvgqcapxak.supabase.co`
   - Try again after clearing

**Code Improvements**: The code now includes:
- Custom storage adapter with fallback to sessionStorage (if localStorage is blocked)
- Enhanced OAuth callback handling with retries for Chrome (up to 5 retries with 500ms delay)
- Better error messages for Chrome-specific issues
- Chrome detection and specific error handling
- PKCE flow (default in Supabase, provides better security and Chrome compatibility)
- `prompt: 'select_account consent'` to force both account selection and consent screen (works in both Chrome and Firefox)
- **Important Note**: Google OAuth inherently signs you into your Google account, which includes Gmail. This is a fundamental limitation of Google's OAuth system. The prompts help by requiring explicit user action, but cannot completely prevent Gmail sign-in if using the same Google account.
- **To completely prevent Gmail sign-in**: Users should sign out of Gmail first, use a different browser profile, use incognito/private mode, or use a different Google account for the app.

#### Console Warnings (Informational)

**Chrome Bounce Tracking Warning**: Chrome may show a warning about "intermediate websites" in the navigation chain when using OAuth. This is expected behavior - Chrome flags the Supabase callback URL (`cpmjtrrbzupvgqcapxak.supabase.co`) as an intermediate site in the OAuth redirect flow. This does not affect functionality and is part of Chrome's privacy features.

**Self-XSS Warning**: Chrome displays a standard security warning in the console about Self-XSS attacks. This is Chrome's built-in security feature and not an error in the application.

**Quirks Mode Warning**: If you see a Quirks Mode warning, it refers to Google's own pages (accounts.youtube.com, accounts.google.com), not this application. Our HTML uses the correct `<!DOCTYPE html>` declaration.

## Next Steps

See `TASKS.md` for sprint planning and development roadmap.

## License

Private project - All rights reserved.

