# UserTesting Mobile App - Frontend Demo (100% Matching)

A 100% pixel-perfect mobile frontend replica of the **UserTesting** contributor mobile application created strictly according to the provided screenshots.

---

## 📱 Features & Matching Details

1. **Splash Screen (Screen 6)**
   - Royal UserTesting blue background (`#1B5AF9`).
   - Authentic speech bubble with **"User"** in blue, tail pointing down, next to bold **"Testing®"** with registered trademark symbol.
   - Smooth pulse animation on launch, auto-transitions to Home screen after 1.8s (or click anywhere to skip).
   - **Full Screen Pure View**: Splash screen chalne ke dauran bottom navigation bar (Home, Test history, Profile, More) poori tarah hide rehta hai, taki screen par sirf 100% blue UserTesting screen dikhe.
   - "🔄 Splash" button in top toolbar to replay the splash screen anytime.

2. **Home Screen (Screens 2 & 4)**
   - Header with bold **"Home"** title.
   - Dual Tab bar: **"This device"** (active with blue underline) and **"Other devices"**.
   - **Both Tabs Message**: "This device" aur "Other devices" dono tabs par exact same message rehta hai:
     - Heading: **"Stay tuned!"**
     - Subtitle: *"As soon as there's an opportunity, we'll invite you to share your thoughts. Watch your email!"*
   - Handcrafted Vector SVG Illustration matching the original:
     - Person in purple-blue gradient jacket looking down at smartphone.
     - Little brown dog walking along rolling hills.
     - Survey checklist board with green checkmarks and "1" notification toast.
     - Soft pastel hill curves and background trees.

3. **Test History Screen**
   - Header with bold **"Test history"** title.
   - Stats Summary Card:
     - **Paid total (USD): $2** (with subtitle *"Pending $14"*)
     - **Total tests: 11**
   - Month Banner: **"Nov, 2026"**
     - Nov 13, 09:20 pm (`#34ea1f9f-661e-4c91-8c02-3e2fe388fbef`) with **~~$10~~** (strikethrough) `>`
     - Nov 13, 02:16 pm (`#43c442fd-ad7f-4c06-83dc-37bf36fc3dea`) with **~~$10~~** (strikethrough) `>`
     - Nov 13, 09:49 am (`#7512faab-93ee-45ca-81c8-7bacd0f1e4d8`) `>`
     - Nov 13, 07:17 am (`#9c17eb4c-233b-4c46-a525-c78c3c60c0d5`) `>`
     - Nov 11, 01:22 pm (`#a590df0f-feab-4784-aaeb-c3a447824612`) `>`
     - Nov 3, 09:23 pm (`#14f857bf-f8ce-4a2a-b0bb-70b5db837e08`) `>`
     - Nov 3, 01:29 pm (`#21966d22-2299-4643-a298-987b8bbe909d`) `>`
     - Nov 3, 01:18 pm (`#5e9a4d90-2ef4-45a2-9dc1-fe09f02ff9aa`) with **~~$10~~** (strikethrough) `>`
   - Month Banner: **"Oct, 2026"**
     - Oct 29, 02:14 pm (`#afe55c1d-cb86-446e-ab80-1877aba34ecb`) with **$1** `>`
     - Oct 27, 09:41 pm (`#bbf36608-baad-4324-8202-64ab8e7d8a2d`) with **~~$10~~** (strikethrough) `>`
     - Oct 27, 09:16 am (`#89696eb3-9936-4313-afe9-540557ffe2a8`) with **$1** `>`

4. **PWA Mobile Install Support (App Icon)**
   - `manifest.json` aur `sw.js` (Service Worker) configured hai.
   - Mobile browser (Chrome / Safari / Edge) mein **"Install app"** ya **"Add to Home screen"** karne par rounded UserTesting app icon banta hai.
   *(Note: The $10 and $1 strikethrough accurately reflects why the Paid Total is exactly $1 + $1 = $2).*

4. **More Screen (Screen 7)**
   - **About** `>` (displays version 6.14.0 modal)
   - **Payments** `>` (displays PayPal & payment schedule modal)
   - **Delete account** `>` (displays account deletion modal)
   - **Support center** (blue text link)
   - **Contact support** (blue text link)
   - **Log out** (centered blue button)

5. **Profile Screen (100% Screenshot Matching)**
   - Header with bold **"Profile"** title.
   - White rounded card at top with:
     - Label: **"Username"**
     - Value: **"devcoder5433"**
   - Centered message in the middle of screen:
     - *"To view or edit your profile details, check your profile on the UserTesting website."*
   - Bottom navigation bar with "Profile" selected (lavender capsule indicator).

6. **PWA App Icon (Powered by `download.png`)**
   - Browser se install karne par `img/download.png` se banaya gaya rounded squircle app icon set hota hai (`icons/icon-192.png`, `icons/icon-512.png`, `icons/apple-touch-icon.png`).

6. **Pure Clean App View**
   - Top status bar (hotspot, battery, network, time) and bottom virtual soft keys (back/home/recents) have been removed as requested.
   - The UI cleanly focuses only on the pure UserTesting application interface: Header, Content, and authentic Bottom Navigation Bar with the lavender active indicator.
   - "📱 Frame View" toggle button allows switching between phone frame mockup and edge-to-edge full mobile screen view.

7. **3 Realistic App Loaders (100% Screenshot Matching)**
   - **Loader 1 (Pull to Refresh on Home)**: Home screen par swipe-down / drag karne par (ya "⬇️ Pull Refresh" button se) floating circular white badge with dark spinning ring appear hota hai aur refresh karta hai (Screenshot 1).
   - **Loader 2 (Menu Click Card Loader)**: Kisi bhi tab (Profile, Test history, More) par click karne par grey overlay ke sath white rounded card mein blue circular spinner ghoomta hai (Screenshot 2).
   - **Loader 3 (Initial Home Load & Tab Switch)**: Home page khulte hi aur "This device" / "Other devices" tabs switch karne par center mein blue spinner aur text **"Loading your tests."** appear hota hai (Screenshot 3).

8. **Test Details Full Screen (Screenshots 1, 2, 3, 4)**
   - Test history ke kisi bhi session par tap karne par authentic **"Test details"** screen khulti hai:
     - Header: Blue back arrow `←` aur bold title **"Test details"**.
     - Top Summary: **Paid (USD)** value (Paid test ke liye **$1**, Canceled/cut test ke liye **$0**).
     - **Reward details**: `Status` (Paid, Canceled with blue `(i)` info icon, ya Pending), `Amount`, `Payment date` (**exact 15 days rule: test date + 15 din**), aur `PayPal` (`guptaankit957036@gmail.com`).
     - **Test details**: `Date`, `Time`, `ID` (with ellipsis), `Status` (Completed), `Type` (Survey).
     - Bottom: Full width rounded pill button **"Contact support"**.
     - `←` tap karne par wapas Test history screen par smoothly return hota hai aur bottom navigation bar restore ho jata hai.

---

## 🚀 How to Run

Simply double-click:
- [`run_app.bat`](file:///c:/Users/Gautam/Desktop/UserTesting/run_app.bat)
or open [`index.html`](file:///c:/Users/Gautam/Desktop/UserTesting/index.html) in any browser (Chrome, Edge, Safari, Firefox).
