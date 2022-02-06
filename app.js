const filterBtns = document.querySelectorAll('.filter-btn');
const searchBar = document.querySelector('.input');
const dropdown = document.querySelector('#categories');
const sortDropdown = document.querySelectorAll('#sort');
const date = document.getElementById('date');
const select = document.querySelectorAll('.filter-select');
let item = [];

// Filter Through Search Bar
searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredItems = item.filter((item) => {
    return (
      item.product_name.toLowerCase().includes(searchString) ||
      item.category.toLowerCase().includes(searchString)
    );
  });
  renderItems(filteredItems);
});

// FETCH ITEMS

const getItems = async () => {
  let url = 'mock.json';
  try {
    const res = await fetch(url);
    item = await res.json();
    renderItems(item);
  } catch (err) {
    console.error(err);
  }
};

sortDropdown.forEach((sort) => {
  sort.addEventListener('change', (e) => {
    const sortPrice = e.currentTarget.value;
    if (sortPrice === 'high') {
      item.sort((a, b) => b.price - a.price);
      renderItems(item);
    } else if (sortPrice === 'low') {
      item.sort((a, b) => a.price - b.price);
      renderItems(item);
    }
  });
});

const renderItems = (item) => {
  const htmlString = item
    .map((item) => {
      return ` <div class="card">
                  <img src="${item.image_url}" alt="placeholder">
                <div class="descriptions">
                  <p>${item.product_name}</p>
                  <p>$${item.price}</p>
                </div>
                <div class="discount-ad">
                <p>Use EPX15 for 15% off</p>
                </div>
                <div class="rating">
                        <i class="fas fa-star star"></i>
                        <i class="fas fa-star star"></i>
                        <i class="fas fa-star star"></i>
                        <i class="fas fa-star star"></i>
                        <i class="fas fa-star star"></i>
                </div>
                <div class="free-shipping">
                <p>Free Shipping over 49$</p>
                </div>
                </div>
    `;
    })
    .join('');
  const container = document.querySelector('.card-section');
  container.innerHTML = htmlString;
};

getItems();

// Filter Medication, Reset, and OTC Buttons
filterBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const category = e.currentTarget.dataset.id;
    const itemCategory = item.filter((itemCategory) => {
      if (itemCategory.category === category) {
        return itemCategory;
      }
    });
    if (category === 'reset') {
      renderItems(item);
    } else {
      renderItems(itemCategory);
    }
  });
});

// Filter With Dropdown

select.forEach((select) => {
  select.addEventListener('change', (e) => {
    const category = e.currentTarget.value;
    const itemCategory = item.filter((itemCategory) => {
      if (itemCategory.category === category) {
        return itemCategory;
      }
    });
    if (category === 'reset') {
      renderItems(item);
    } else {
      renderItems(itemCategory);
    }
  });
});

// Live Date
date.innerHTML = new Date().getFullYear();
