// ========================================================
// USERTESTING MOBILE DEMO - INTERACTIVE LOGIC
// ========================================================

// State
let currentTab = 'home';
let splashTimeout = null;

// DOM Elements
const screenSplash = document.getElementById('screenSplash');
const screenHome = document.getElementById('screenHome');
const screenHistory = document.getElementById('screenHistory');
const screenProfile = document.getElementById('screenProfile');
const screenMore = document.getElementById('screenMore');
const screenTestDetails = document.getElementById('screenTestDetails');
const deviceContainer = document.getElementById('deviceContainer');
const mobileFrame = document.getElementById('mobileFrame');
const bottomNav = document.getElementById('bottomNav');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const toggleFrameBtn = document.getElementById('toggleFrameBtn');
const replaySplashBtn = document.getElementById('replaySplashBtn');
const triggerPullRefreshBtn = document.getElementById('triggerPullRefreshBtn');

// Loaders elements
const pullRefreshIndicator = document.getElementById('pullRefreshIndicator');
const homeLoadingState = document.getElementById('homeLoadingState');
const homeBody = document.getElementById('homeBody');
const menuLoaderOverlay = document.getElementById('menuLoaderOverlay');

const screens = {
  home: screenHome,
  history: screenHistory,
  profile: screenProfile,
  more: screenMore
};

const navButtons = {
  home: document.getElementById('navHome'),
  history: document.getElementById('navHistory'),
  profile: document.getElementById('navProfile'),
  more: document.getElementById('navMore')
};

// ========================================================
// INITIALIZATION & PWA SERVICE WORKER REGISTRATION
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  // Start with Splash Screen
  showSplashScreen(true);

  // Register PWA Service Worker for mobile install
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.log('SW registration note:', err);
    });
  }
});

// PWA Install Prompt handling
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

// ========================================================
// SPLASH SCREEN LOGIC
// ========================================================
function showSplashScreen(autoDismiss = true) {
  if (splashTimeout) clearTimeout(splashTimeout);

  // Hide bottom navigation bar completely during splash screen
  if (mobileFrame) mobileFrame.classList.add('splash-active');
  if (bottomNav) bottomNav.style.display = 'none';

  // Hide all screens
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screenSplash.classList.add('active');

  if (autoDismiss) {
    splashTimeout = setTimeout(() => {
      dismissSplashScreen();
    }, 1800);
  }
}

function dismissSplashScreen() {
  if (splashTimeout) clearTimeout(splashTimeout);
  screenSplash.classList.remove('active');

  // Restore bottom navigation bar when splash screen ends
  if (mobileFrame) mobileFrame.classList.remove('splash-active');
  if (bottomNav) bottomNav.style.display = 'flex';

  // Open Home screen with Initial Loader (Image 3: "Loading your tests.")
  switchNavTab('home', false);
  triggerHomeInitialLoader(1400);
}

// Click on splash screen to skip instantly
screenSplash.addEventListener('click', () => {
  dismissSplashScreen();
});

replaySplashBtn.addEventListener('click', () => {
  showSplashScreen(true);
});

// ========================================================
// 3. INITIAL HOME LOADER (Image 3: "Loading your tests.")
// ========================================================
let homeLoaderTimeout = null;
function triggerHomeInitialLoader(duration = 1400) {
  if (homeLoaderTimeout) clearTimeout(homeLoaderTimeout);

  if (homeLoadingState && homeBody) {
    homeLoadingState.classList.add('active');
    homeBody.style.display = 'none';

    homeLoaderTimeout = setTimeout(() => {
      homeLoadingState.classList.remove('active');
      homeBody.style.display = 'flex';
    }, duration);
  }
}

// ========================================================
// 2. TAB / MENU CLICK LOADER (Image 2: Modal with blue spinner)
// ========================================================
let menuLoaderTimeout = null;
function switchNavTab(tabName, showLoader = true) {
  const previousTab = currentTab;
  currentTab = tabName;

  // Update nav buttons active state immediately
  Object.keys(navButtons).forEach(key => {
    if (key === tabName) {
      navButtons[key].classList.add('active');
    } else {
      navButtons[key].classList.remove('active');
    }
  });

  // Switch screens
  if (screenTestDetails) screenTestDetails.classList.remove('active');
  if (mobileFrame) mobileFrame.classList.remove('details-active');
  if (bottomNav) bottomNav.style.display = 'flex';

  Object.keys(screens).forEach(key => {
    if (key === tabName) {
      screens[key].classList.add('active');
    } else {
      screens[key].classList.remove('active');
    }
  });

  // If clicked a different menu and showLoader is true, show Loader 2 (Image 2)
  if (showLoader && previousTab !== tabName) {
    if (menuLoaderTimeout) clearTimeout(menuLoaderTimeout);
    if (menuLoaderOverlay) {
      menuLoaderOverlay.classList.add('active');
      menuLoaderTimeout = setTimeout(() => {
        menuLoaderOverlay.classList.remove('active');
      }, 700);
    }
  }
}

// ========================================================
// HOME SCREEN TABS (This device / Other devices)
// ========================================================
function switchHomeTab(targetTab) {
  const tabThisDevice = document.getElementById('tabThisDevice');
  const tabOtherDevices = document.getElementById('tabOtherDevices');
  const stayTunedTitle = document.querySelector('.stay-tuned-title');
  const stayTunedDesc = document.querySelector('.stay-tuned-desc');

  // Exact same message on BOTH "This device" and "Other devices":
  if (stayTunedTitle) stayTunedTitle.textContent = "Stay tuned!";
  if (stayTunedDesc) stayTunedDesc.textContent = "As soon as there’s an opportunity, we’ll invite you to share your thoughts. Watch your email!";

  if (targetTab === 'thisDevice') {
    tabThisDevice.classList.add('active');
    tabOtherDevices.classList.remove('active');
  } else {
    tabThisDevice.classList.remove('active');
    tabOtherDevices.classList.add('active');
  }
}

// ========================================================
// 1. PULL-TO-REFRESH LOADER (Image 1: Floating spinner)
// ========================================================
let pullRefreshTimeout = null;
let isRefreshing = false;

function triggerPullToRefresh() {
  if (isRefreshing || !pullRefreshIndicator) return;
  isRefreshing = true;

  // Show floating pull-refresh indicator (Image 1)
  pullRefreshIndicator.classList.add('visible');

  if (pullRefreshTimeout) clearTimeout(pullRefreshTimeout);
  pullRefreshTimeout = setTimeout(() => {
    pullRefreshIndicator.classList.remove('visible');
    isRefreshing = false;
  }, 1200);
}

// Button in demo controls
if (triggerPullRefreshBtn) {
  triggerPullRefreshBtn.addEventListener('click', () => {
    if (currentTab !== 'home') switchNavTab('home', false);
    triggerPullToRefresh();
  });
}

// Touch and drag pull-to-refresh on home body
let startY = 0;
let pullDistance = 0;

if (homeBody) {
  homeBody.addEventListener('touchstart', (e) => {
    if (homeBody.scrollTop === 0) {
      startY = e.touches[0].pageY;
      pullDistance = 0;
    }
  }, { passive: true });

  homeBody.addEventListener('touchmove', (e) => {
    if (homeBody.scrollTop === 0 && startY > 0) {
      const currentY = e.touches[0].pageY;
      pullDistance = currentY - startY;
      if (pullDistance > 15 && pullDistance < 100) {
        pullRefreshIndicator.classList.add('visible');
      }
    }
  }, { passive: true });

  homeBody.addEventListener('touchend', () => {
    if (pullDistance > 50) {
      triggerPullToRefresh();
    } else {
      pullRefreshIndicator.classList.remove('visible');
    }
    startY = 0;
    pullDistance = 0;
  });

  // Mouse drag support for desktop demo
  let isMouseDown = false;
  homeBody.addEventListener('mousedown', (e) => {
    if (homeBody.scrollTop === 0) {
      isMouseDown = true;
      startY = e.pageY;
      pullDistance = 0;
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (isMouseDown && homeBody.scrollTop === 0) {
      pullDistance = e.pageY - startY;
      if (pullDistance > 25) {
        pullRefreshIndicator.classList.add('visible');
      }
    }
  });

  window.addEventListener('mouseup', () => {
    if (isMouseDown) {
      isMouseDown = false;
      if (pullDistance > 60) {
        triggerPullToRefresh();
      } else {
        pullRefreshIndicator.classList.remove('visible');
      }
      startY = 0;
      pullDistance = 0;
    }
  });
}

// ========================================================
// 4. TEST DETAILS SCREEN LOGIC (Screenshots 1, 2, 3, 4)
// ========================================================
const testDetailsData = [
  // Index 0: Nov 13, 09:20 pm ($10 cut)
  {
    date: "Nov 13, 2026",
    time: "09:20 pm",
    hash: "34ea1f9f-661e-4c91-8c02-3e2fe388fbef",
    paidUsd: "$0",
    status: "Canceled",
    amount: "$10",
    paymentDate: "Nov 13, 2026",
    paypal: "guptaankit957036@gmail.com",
    testStatus: "Completed",
    type: "Survey"
  },
  // Index 1: Nov 13, 02:16 pm ($10 cut)
  {
    date: "Nov 13, 2026",
    time: "02:16 pm",
    hash: "43c442fd-ad7f-4c06-83dc-37bf36fc3dea",
    paidUsd: "$0",
    status: "Canceled",
    amount: "$10",
    paymentDate: "Nov 13, 2026",
    paypal: "guptaankit957036@gmail.com",
    testStatus: "Completed",
    type: "Survey"
  },
  // Index 2: Nov 13, 09:49 am ($10 pending - 15 days payment: Nov 28)
  {
    date: "Nov 13, 2026",
    time: "09:49 am",
    hash: "7512faab-93ee-45ca-81c8-7bacd0f1e4d8",
    paidUsd: "$0",
    status: "Pending",
    amount: "$10",
    paymentDate: "Nov 28, 2026",
    paypal: "guptaankit957036@gmail.com",
    testStatus: "Completed",
    type: "Survey"
  },
  // Index 3: Nov 13, 07:17 am ($1 pending - 15 days payment: Nov 28)
  {
    date: "Nov 13, 2026",
    time: "07:17 am",
    hash: "9c17eb4c-233b-4c46-a525-c78c3c60c0d5",
    paidUsd: "$0",
    status: "Pending",
    amount: "$1",
    paymentDate: "Nov 28, 2026",
    paypal: "guptaankit957036@gmail.com",
    testStatus: "Completed",
    type: "Survey"
  },
  // Index 4: Nov 11, 01:22 pm ($1 pending - 15 days payment: Nov 26)
  {
    date: "Nov 11, 2026",
    time: "01:22 pm",
    hash: "a590df0f-feab-4784-aaeb-c3a447824612",
    paidUsd: "$0",
    status: "Pending",
    amount: "$1",
    paymentDate: "Nov 26, 2026",
    paypal: "guptaankit957036@gmail.com",
    testStatus: "Completed",
    type: "Survey"
  },
  // Index 5: Nov 3, 09:23 pm ($1 Paid / 15 days payment: Nov 18, 2026)
  {
    date: "Nov 3, 2026",
    time: "09:23 pm",
    hash: "14f857bf-f8ce-4a2a-b0bb-70b5db837e08",
    paidUsd: "$1",
    status: "Paid",
    amount: "$1",
    paymentDate: "Nov 18, 2026",
    paypal: "guptaankit957036@gmail.com",
    testStatus: "Completed",
    type: "Survey"
  },
  // Index 6: Nov 3, 01:29 pm ($1 Paid / 15 days payment: Nov 18, 2026)
  {
    date: "Nov 3, 2026",
    time: "01:29 pm",
    hash: "21966d22-2299-4643-a298-987b8bbe909d",
    paidUsd: "$1",
    status: "Paid",
    amount: "$1",
    paymentDate: "Nov 18, 2026",
    paypal: "guptaankit957036@gmail.com",
    testStatus: "Completed",
    type: "Survey"
  },
  // Index 7: Nov 3, 01:18 pm (Screenshots 2 & 4: $10 cut / Canceled)
  {
    date: "Nov 3, 2026",
    time: "01:18 pm",
    hash: "5e9a4d90-2ef4-45a2-9dc1-fe09f02ff9aa",
    paidUsd: "$0",
    status: "Canceled",
    amount: "$10",
    paymentDate: "Nov 3, 2026",
    paypal: "guptaankit957036@gmail.com",
    testStatus: "Completed",
    type: "Survey"
  },
  // Index 8: Oct 29, 02:14 pm (Screenshots 1 & 3: $1 Paid / 14-15 days payment: Nov 12, 2026)
  {
    date: "Oct 29, 2026",
    time: "02:14 pm",
    hash: "afe55c1d-cb86-446e-ab80-1877aba34ecb",
    paidUsd: "$1",
    status: "Paid",
    amount: "$1",
    paymentDate: "Nov 12, 2026",
    paypal: "guptaankit957036@gmail.com",
    testStatus: "Completed",
    type: "Survey"
  },
  // Index 9: Oct 27, 09:41 pm ($10 cut / Canceled)
  {
    date: "Oct 27, 2026",
    time: "09:41 pm",
    hash: "bbf36608-baad-4324-8202-64ab8e7d8a2d",
    paidUsd: "$0",
    status: "Canceled",
    amount: "$10",
    paymentDate: "Oct 27, 2026",
    paypal: "guptaankit957036@gmail.com",
    testStatus: "Completed",
    type: "Survey"
  },
  // Index 10: Oct 27, 09:16 am ($1 Paid / 15 days payment: Nov 11, 2026)
  {
    date: "Oct 27, 2026",
    time: "09:16 am",
    hash: "89696eb3-9936-4313-afe9-540557ffe2a8",
    paidUsd: "$1",
    status: "Paid",
    amount: "$1",
    paymentDate: "Nov 11, 2026",
    paypal: "guptaankit957036@gmail.com",
    testStatus: "Completed",
    type: "Survey"
  }
];

function openTestDetailsPage(index) {
  const item = testDetailsData[index];
  if (!item) return;

  // Populate data matching screenshots
  const detailPaidVal = document.getElementById('detailPaidVal');
  const detailRewardStatus = document.getElementById('detailRewardStatus');
  const detailAmount = document.getElementById('detailAmount');
  const detailPaymentDate = document.getElementById('detailPaymentDate');
  const detailPayPal = document.getElementById('detailPayPal');
  const detailDate = document.getElementById('detailDate');
  const detailTime = document.getElementById('detailTime');
  const detailID = document.getElementById('detailID');
  const detailTestStatus = document.getElementById('detailTestStatus');
  const detailType = document.getElementById('detailType');

  if (detailPaidVal) detailPaidVal.textContent = item.paidUsd;
  if (detailAmount) detailAmount.textContent = item.amount;
  if (detailPaymentDate) detailPaymentDate.textContent = item.paymentDate;
  if (detailPayPal) detailPayPal.textContent = item.paypal;
  if (detailDate) detailDate.textContent = item.date;
  if (detailTime) detailTime.textContent = item.time;

  if (detailID) {
    const truncatedHash = item.hash.length > 32 ? item.hash.substring(0, 32) + '...' : item.hash;
    detailID.textContent = truncatedHash;
    detailID.title = item.hash;
  }

  if (detailTestStatus) detailTestStatus.textContent = item.testStatus;
  if (detailType) detailType.textContent = item.type;

  // Reward status badge
  if (detailRewardStatus) {
    if (item.status === 'Canceled') {
      detailRewardStatus.innerHTML = `
        <span class="status-canceled">Canceled</span>
        <svg class="info-circle-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
      `;
    } else {
      detailRewardStatus.innerHTML = `<span class="status-${item.status.toLowerCase()}">${item.status}</span>`;
    }
  }

  // Switch to Test details screen
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  if (screenTestDetails) screenTestDetails.classList.add('active');

  // Hide bottom nav on details screen (Screenshots 1, 2, 3, 4)
  if (mobileFrame) mobileFrame.classList.add('details-active');
  if (bottomNav) bottomNav.style.display = 'none';

  // Scroll to top
  const detailsBody = document.getElementById('detailsBody');
  if (detailsBody) detailsBody.scrollTop = 0;
}

function closeTestDetailsPage() {
  if (screenTestDetails) screenTestDetails.classList.remove('active');

  // Restore bottom navigation bar
  if (mobileFrame) mobileFrame.classList.remove('details-active');
  if (bottomNav) bottomNav.style.display = 'flex';

  // Return to test history screen
  switchNavTab('history', false);
}

// ========================================================
// MODAL SHEET (Interactive Details)
// ========================================================
function openTestModal(date, hash, status, amount) {
  modalTitle.textContent = `Test Session Details`;
  modalBody.innerHTML = `
    <strong>Date & Time:</strong> ${date}<br>
    <strong>Session ID:</strong> <span style="font-size:12px; font-family:monospace; color:#4B5563;">${hash}</span><br>
    <strong>Status:</strong> <span style="color:${status === 'Paid' ? '#10B981' : '#F59E0B'}; font-weight:600;">${status}</span><br>
    <strong>Reward Amount:</strong> ${amount}<br>
    <strong>Device:</strong> Android Smartphone (Primary)<br>
    <strong>Duration:</strong> 15 mins 24 secs<br>
    <strong>Recording:</strong> Uploaded & Verified
  `;
  modalOverlay.classList.add('open');
}

function openModal(title, text) {
  modalTitle.textContent = title;
  modalBody.textContent = text;
  modalOverlay.classList.add('open');
}

function closeModal() {
  modalOverlay.classList.remove('open');
}

function confirmLogout() {
  if (confirm("Are you sure you want to log out of UserTesting?")) {
    showSplashScreen(true);
  }
}

// ========================================================
// FRAME TOGGLE (Phone Frame vs Full Screen)
// ========================================================
toggleFrameBtn.addEventListener('click', () => {
  deviceContainer.classList.toggle('fullscreen');
  if (deviceContainer.classList.contains('fullscreen')) {
    toggleFrameBtn.textContent = '🖥️ Mockup View';
  } else {
    toggleFrameBtn.textContent = '📱 Frame View';
  }
});
