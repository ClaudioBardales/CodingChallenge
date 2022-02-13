const filterBtns = document.querySelectorAll('.filter-btn');
const searchBar = document.querySelector('.input');
const dropdown = document.querySelector('#categories');
const sortDropdown = document.querySelectorAll('#sort');
const date = document.getElementById('date');
const select = document.querySelectorAll('.filter-select');

//Shopping Cart Variables
const total = document.querySelector('.total span');
const cartContainer = document.querySelector('.cart');
const itemCount = document.querySelector('.item-count');

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
let cart = JSON.parse(localStorage.getItem('CART')) || [];

const addToCart = (id) => {
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits('plus', id);
  } else {
    const cartItem = item.find((item) => item.id === id);
    cart.push({
      ...cartItem,
      numberOfUnits: 1,
    });
  }
  updateCart();
};

// Update Cart

const updateCart = () => {
  renderCartItems();
  renderTotal();

  localStorage.setItem('CART', JSON.stringify(cart));
};

const renderTotal = () => {
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  total.innerHTML = `$${totalPrice.toFixed(2)}`;
  itemCount.innerHTML = totalItems;
};

// Render Cart Items

const renderCartItems = () => {
  cartContainer.innerHTML = '';
  cart.forEach((item) => {
    cartContainer.innerHTML += `
     <div class="item">
     <img src="${item.image_url}" alt="${item.product_name}" width="75" height="75"/>
     <h2>${item.product_name}</h2>
     <p>$${item.price}</p>
     <div class="qty">
       <i class="fas fa-plus plus" onclick="changeNumberOfUnits('plus', ${item.id})"></i>
       <p>${item.numberOfUnits}</p>
       <i class="fas fa-minus minus" onclick="changeNumberOfUnits('minus', ${item.id})"></i>
     </div>
     <i class="fas fa-times times" onclick="removeItem(${item.id})"></i>
   </div>
`;
  });
};

const removeItem = (id) => {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
};

const changeNumberOfUnits = (action, id) => {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === 'plus') {
        numberOfUnits++;
      } else if (action === 'minus' && numberOfUnits > 1) {
        numberOfUnits--;
      }

      return {
        ...item,
        numberOfUnits,
      };
    }
  });
  updateCart();
};

updateCart();

// Live Date
date.innerHTML = new Date().getFullYear();
