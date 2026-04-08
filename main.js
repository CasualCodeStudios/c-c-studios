// Initialize sidebar state on page load
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    // Set initial state as closed
    sidebar.setAttribute('data-open', 'false');
  }
  
  // Reset page transition state
  const transition = document.getElementById('page-transition');
  const container = transition?.querySelector('.page-container');
  if (transition) {
    transition.classList.remove('active');
  }
  if (container) {
    container.classList.remove('flipping');
  }
});

function toggleMenu() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    const isOpen = sidebar.getAttribute('data-open') === 'true';
    if (isOpen) {
      sidebar.classList.remove('open');
      sidebar.setAttribute('data-open', 'false');
    } else {
      sidebar.classList.add('open');
      sidebar.setAttribute('data-open', 'true');
    }
  }
}

// Close sidebar when clicking outside of it
document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.querySelector('.hamburger');
  
  if (sidebar && hamburger) {
    const isOpen = sidebar.getAttribute('data-open') === 'true';
    // Check if click is outside sidebar and hamburger button
    if (isOpen && !sidebar.contains(event.target) && !hamburger.contains(event.target)) {
      sidebar.classList.remove('open');
      sidebar.setAttribute('data-open', 'false');
    }
  }
});

// Close sidebar when clicking any navigation link inside it
document.addEventListener('DOMContentLoaded', function() {
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a, .sidebar .loginBtn');
  const sidebar = document.getElementById('sidebar');
  
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (sidebar) {
        sidebar.classList.remove('open');
        sidebar.setAttribute('data-open', 'false');
      }
    });
  });
});

// Page Transition System - Book-like flipping
const pageOrder = ['index.html', 'shop.html', 'meetTeam.html', 'career.html'];
let currentPageIndex = -1;

// Determine current page index
const currentPath = window.location.pathname.split('/').pop() || 
                   window.location.href.split('/').pop() || 
                   window.location.href.split('\\').pop(); // Handle Windows file paths

if (pageOrder.includes(currentPath)) {
  currentPageIndex = pageOrder.indexOf(currentPath);
} else {
  // Try to match by checking if the URL contains the page name
  for (let i = 0; i < pageOrder.length; i++) {
    if (window.location.href.includes(pageOrder[i])) {
      currentPageIndex = i;
      break;
    }
  }
}

function flipToPage(targetUrl) {
  if (!pageOrder.includes(targetUrl)) {
    // If not one of our main pages, just navigate normally
    window.location.href = targetUrl;
    return;
  }

  const targetIndex = pageOrder.indexOf(targetUrl);
  const transition = document.getElementById('page-transition');
  const container = transition.querySelector('.page-container');

  if (!transition || !container || currentPageIndex === -1) {
    window.location.href = targetUrl;
    return;
  }

  // Show transition overlay
  transition.classList.add('active');

  // Always show current page flipping to reveal target page
  const frontContent = transition.querySelector('.page-front .page-content');
  const backContent = transition.querySelector('.page-back .page-content');
  const frontNumber = transition.querySelector('.page-front .page-number');
  const backNumber = transition.querySelector('.page-back .page-number');

  // Current page becomes the front (what we're leaving)
  frontContent.innerHTML = `
    <h1>${getPageTitle(currentPageIndex)}</h1>
    <p>Page ${currentPageIndex + 1}</p>
  `;
  // Target page becomes the back (what we're going to)
  backContent.innerHTML = `
    <h1>${getPageTitle(targetIndex)}</h1>
    <p>Page ${targetIndex + 1}</p>
  `;
  frontNumber.textContent = currentPageIndex + 1;
  backNumber.textContent = targetIndex + 1;

  // Start the flip animation
  setTimeout(() => {
    container.classList.add('flipping');
  }, 100);

  // Navigate after animation completes
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 1300); // Match the CSS transition duration
}

function getPageTitle(index) {
  const titles = [
    'SunRise Valley Farms',
    'Our Shop',
    'Meet Our Team',
    'Careers'
  ];
  return titles[index] || 'Page';
}

// Intercept navigation links for main pages
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('a[href]');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const url = href.split('#')[0]; // Remove hash fragments
    
    if (pageOrder.includes(url)) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        flipToPage(url);
      });
    }
  });
});

//poultry scrolling
//left
function scrollContainerLeft() {
  document.getElementById("scrollable").scrollBy({
    left: -330, // adjust scroll distance
    behavior: "smooth"
  });
}
//right
function scrollContainerRight() {
  document.getElementById("scrollable").scrollBy({
    left: 330, // adjust scroll distance
    behavior: "smooth"
  });
}

//dairy scrolling
//left
function scrollContainer1Left() {
  document.getElementById("scrollable1").scrollBy({
    left: -330, // adjust scroll distance
    behavior: "smooth"
  });
}
//right
function scrollContainer1Right() {
  document.getElementById("scrollable1").scrollBy({
    left: 330, // adjust scroll distance
    behavior: "smooth"
  });
}

//farm produce scrolling
//left
function scrollContainer2Left() {
  document.getElementById("scrollable2").scrollBy({
    left: -330, // adjust scroll distance
    behavior: "smooth"
  });
}
//right
function scrollContainer2Right() {
  document.getElementById("scrollable2").scrollBy({
    left: 330, // adjust scroll distance
    behavior: "smooth"
  });
}

//merchandise scrolling
//left
function scrollContainer3Left() {
  document.getElementById("scrollable3").scrollBy({
    left: -330, // adjust scroll distance
    behavior: "smooth"
  });
}
//right
function scrollContainer3Right() {
  document.getElementById("scrollable3").scrollBy({
    left: 330, // adjust scroll distance
    behavior: "smooth"
  });
}

// video in the about section
// play local video in case the YouTube iframe fails
const iframe = document.getElementById('youtubeVideo');
const video = document.getElementById('localVideo');
if (iframe && video) {
  iframe.addEventListener('error', () => {
    iframe.style.display = 'none';
    video.style.display = 'block';
  });
}


// Cart for shop
const cartItems = [];

function loadCart(){
  try {
    const raw = localStorage.getItem('sunriseCart');
    if (raw){
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)){
        parsed.forEach(item => {
          // Normalize image path when loading from storage
          cartItems.push({
            ...item,
            img: normalizeImagePath(item.img)
          });
        });
      }
    }
  } catch (e){
    console.warn('Could not load cart', e);
  }
}

function saveCart(){
  localStorage.setItem('sunriseCart', JSON.stringify(cartItems));
}

function setCartVisible(show){
  const cartSection = document.getElementById('cartSection');
  if(!cartSection) return;
  cartSection.style.display = show ? 'block' : 'none';
  if(show){
    document.body.classList.add('cart-open');
  } else {
    document.body.classList.remove('cart-open');
  }
}

function updateCartCount(){
  const count = cartItems.reduce((sum,item)=> sum + item.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el=>{
    el.textContent = count;
  });
  return count;
}

function renderCart(){
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  if(!cartItemsContainer || !cartTotalEl) return;

  const count = updateCartCount();

  if(cartItems.length === 0){
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalEl.textContent = 'Kes. 0';
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = '';
  cartItems.forEach((item, index) => {
    total += item.price * item.qty;
    const itemRow = document.createElement('div');
    itemRow.className = 'cart-item';
    itemRow.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="cart-item-details">
        <p>${item.name}</p>
        <p>Kes. ${item.price} x ${item.qty}</p>
        <div class="qty-control">
          <button data-index="${index}" data-action="dec" class="qty-btn">-</button>
          <span>${item.qty}</span>
          <button data-index="${index}" data-action="inc" class="qty-btn">+</button>
        </div>
      </div>
      <button data-index="${index}" class="remove-item">Remove</button>
    `;
    cartItemsContainer.appendChild(itemRow);
  });

  cartTotalEl.textContent = `Kes. ${total}`;

  cartItemsContainer.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function(){
      const idx = Number(this.dataset.index);
      cartItems.splice(idx,1);
      renderCart();
      saveCart();
    });
  });

  cartItemsContainer.querySelectorAll('.qty-btn').forEach(btn=>{
    btn.addEventListener('click', function(){
      const idx = Number(this.dataset.index);
      const product = cartItems[idx];
      if(!product) return;
      if(this.dataset.action === 'inc'){
        product.qty += 1;
      } else if(this.dataset.action === 'dec'){
        product.qty = Math.max(1, product.qty - 1);
      }
      renderCart();
      saveCart();
    });
  });
}


function normalizeImagePath(imgPath) {
  if (!imgPath) return '';
  // For now, just return the path as-is since the HTML already has correct relative paths
  return imgPath;
}

function addToCart(product){
  // Normalize the image path to use relative paths from main folder
  const normalizedProduct = {
    ...product,
    img: normalizeImagePath(product.img)
  };
  
  const existing = cartItems.find(i => i.name === normalizedProduct.name);
  if(existing){
    existing.qty += 1;
  } else {
    cartItems.push({...normalizedProduct, qty:1});
  }
  renderCart();
  setCartVisible(true);
  const cartSection = document.getElementById('cartSection');
  if(cartSection){
    cartSection.classList.add('cart-open');
  }
}

function initializeCartForShop(){
  loadCart();
  renderCart();
  const cartButtons = document.querySelectorAll('.add-to-cart');
  cartButtons.forEach(btn => {
    btn.addEventListener('click', (e)=>{
      const card = e.target.closest('.productCard');
      if(!card) return;
      const textName = card.querySelector('.priceText p')?.textContent?.trim();
      const textPrice = card.querySelector('.priceText p:nth-of-type(2)')?.textContent || '';
      const parsedPrice = Number((textPrice.match(/[0-9]+(?:\.[0-9]+)?/) || [0])[0]);
      const product = {
        name: card.dataset.name?.trim() || textName || 'Unknown Product',
        price: Number(card.dataset.price || parsedPrice || 0),
        img: card.dataset.img || card.querySelector('img')?.src || '',
      };
      addToCart(product);
    });
  });
  const closeCartBtn = document.getElementById('closeCartBtn');
  if(closeCartBtn){
    closeCartBtn.addEventListener('click', ()=>{
      setCartVisible(false);
      const cartSection = document.getElementById('cartSection');
      if(cartSection) cartSection.classList.remove('cart-open');
    });
  }
  const checkoutBtn = document.getElementById('checkoutBtn');
  if(checkoutBtn){
    checkoutBtn.addEventListener('click', ()=>{
      if(cartItems.length === 0){
        alert('Your cart is empty.');
        return;
      }
      alert('Checkout is not yet connected. Your order summary is: ' + cartItems.map(i => i.name + ' x' + i.qty).join(', '));
    });
  }
  // Product search functionality
  const searchInput = document.getElementById('productSearch');
  if(searchInput){
    searchInput.addEventListener('input', function(){
      const query = this.value.toLowerCase();
      const products = document.querySelectorAll('.productCard');
      products.forEach(product => {
        const name = (product.dataset.name || product.querySelector('.priceText p')?.textContent || '').toLowerCase();
        const priceText = product.querySelector('.priceText p:nth-of-type(2)')?.textContent.toLowerCase() || '';
        const altText = product.querySelector('img')?.alt.toLowerCase() || '';
        const visible = name.includes(query) || priceText.includes(query) || altText.includes(query);
        product.style.display = visible ? '' : 'none';
      });
    });
  }
  renderCart();
}

if(typeof window !== 'undefined'){
  document.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname.includes('shop.html')){
      initializeCartForShop();
    } else if(window.location.pathname.includes('career.html') || window.location.pathname.includes('meetTeam.html')){
      // Job search functionality for career and team pages
      const jobSearchInput = document.getElementById('jobSearch');
      if(jobSearchInput){
        const jobs = Array.from(document.querySelectorAll('.job-card'));
        const jobTitles = jobs.map(job => (job.dataset.title || '').toLowerCase());

        jobSearchInput.addEventListener('input', function() {
          const query = this.value.trim().toLowerCase();

          jobs.forEach((job, index) => {
            const title = jobTitles[index];
            const visible = query === '' || title.includes(query);
            job.style.display = visible ? '' : 'none';
          });
        });
      }
    } else {
      loadCart();
      updateCartCount();
    }
  });
}



// Authentication system
// Regiter form submission handler
document.getElementById('registerForm').addEventListener('submit', function(e){
      e.preventDefault();
      const userName = document.getElementById('name').value;
      localStorage.setItem('sunriseLoggedIn', 'true');
      localStorage.setItem('sunriseUserName', userName);
      alert('Account created and logged in as ' + userName);
      window.location.href = 'shop.html';
    });

// Login form submission handler
document.getElementById('loginForm').addEventListener('submit', function(e){
      e.preventDefault();
      const userEmail = document.getElementById('email').value;
      const userName = userEmail.split('@')[0] || 'user';
      localStorage.setItem('sunriseLoggedIn', 'true');
      localStorage.setItem('sunriseUserName', userName);
      alert('Signed in successfully as ' + userName);
      window.location.href = 'shop.html';
    });

// Login and register animation toggle

function showDiv(divId) {
  // Hide both forms first
  document.querySelectorAll('.authWrapper').forEach(authWrapper => {
    authWrapper.classList.remove('visible');
  });
  // Show the selected form
  const targetDiv = document.getElementById(divId);
  if (targetDiv) {
    targetDiv.classList.add('visible');
  }
}


