/* =========================================
   VerdeSicilia – catalogo.js
   ========================================= */

const catBtns    = document.querySelectorAll('.cat-btn');
const cards      = document.querySelectorAll('.cat-product-card');
const searchInput = document.getElementById('searchInput');
const noResults  = document.getElementById('noResults');

let activeFilter = 'all';
let searchQuery  = '';

function filterProducts() {
  let visible = 0;

  cards.forEach(card => {
    const category = card.dataset.category || '';
    const name     = card.querySelector('.cat-product-body p').textContent.toLowerCase();

    const matchCat    = activeFilter === 'all' || category === activeFilter;
    const matchSearch = name.includes(searchQuery.toLowerCase().trim());

    if (matchCat && matchSearch) {
      card.removeAttribute('data-hidden');
      card.style.display = '';
      visible++;
    } else {
      card.dataset.hidden = 'true';
      card.style.display = 'none';
    }
  });

  noResults.style.display = visible === 0 ? 'block' : 'none';
}

// Category buttons
catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    filterProducts();
  });
});

// Search input
searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value;
  filterProducts();
});

// Cookie banner
function acceptCookie() {
  document.getElementById('cookieBanner').style.display = 'none';
  localStorage.setItem('cookieAccepted', 'true');
}

if (localStorage.getItem('cookieAccepted') === 'true') {
  document.getElementById('cookieBanner').style.display = 'none';
}