const filterBtns = document.querySelectorAll('.filter-btn');
const searchBar = document.querySelector('.input');
const dropdown = document.querySelector('#categories');
const sortDropdown = document.querySelectorAll('#sort');
const date = document.getElementById('date');
const select = document.querySelectorAll('.filter-select');

//Shopping Cart Variables
const plus = document.querySelectorAll('.plus');
const minus = document.querySelectorAll('.minus');
const counter = document.querySelectorAll('.qty p');
const itemTotal = document.querySelectorAll('.item-total');
const total = document.querySelectorAll('.total span');
const cartContainer = document.querySelector('.shooping-cart');

console.log(cartContainer);

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
                <button class="add-to-cart" onclick="addToCart(${item.id})">Add To Cart</button>
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

// Display Item in Shopping Cart
let cart = [];

const addToCart = (id) => {
  if (cart.some((item) => item.id === id)) {
    alert('Product Already in Cart!');
  } else {
    const cartItem = item.find((item) => item.id === id);
    cart.push({
      ...cartItem,
      numberOfUnits: 1,
    });

    updateCart();
  }
};

// Update Cart

const updateCart = () => {
  renderCartItems();
  // renderSubtotal();
};

// Render Cart Items

const renderCartItems = () => {
  cart.forEach((item) => {
    cartContainer.innerHTML += `
     <div class="item">
     <img src="${item.image_url}" alt="${item.product_name}" width="150" height="150"/>
     <h2>${item.product_name}</h2>
     <p>$${item.price}</p>
     <div class="qty">
       <i class="fas fa-plus plus"></i>
       <p>${item.numberOfUnits}</p>
       <i class="fas fa-minus minus"></i>
     </div>
     <i class="fas fa-times times"></i>
   </div>
`;
  });
};

// Live Date
date.innerHTML = new Date().getFullYear();
