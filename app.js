const filterBtns = document.querySelectorAll('.filter-btn');
const searchBar = document.querySelector('.input');
const container = document.querySelector('.card-section');
const dropdown = document.querySelector('#categories');
const sortDropdown = document.querySelectorAll('#sort');
const date = document.getElementById('date');
const select = document.querySelectorAll('.filter-select');
let item = [];


// Filter Through Search Bar
searchBar.addEventListener('keyup', e => {
  const searchString = e.target.value.toLowerCase();
  const filteredItems = item.filter(item => {
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

const renderItems = item => {
  const htmlString = item
    .map(item => {
      return ` <div class="card">
                  <img src="${item.image_url}" alt="placeholder">
                <div class="descriptions">
                  <p>${item.product_name}</p>
                  <button>$${item.price}</button>
                </div>
                </div>
    `;
    })
    .join('');

  container.innerHTML = htmlString;
};

getItems();

// Filter Medication, Reset, and OTC Buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    const category = e.currentTarget.dataset.id;
    const itemCategory = item.filter(itemCategory => {
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

select.forEach(select => {
  select.addEventListener('change', e => {
    const category = e.currentTarget.value;
    const itemCategory = item.filter(itemCategory => {
      if(itemCategory.category === category){
        return itemCategory;
      }
    });
    if(category === 'reset'){
      renderItems(item);
    } else {
      renderItems(itemCategory);
    }
  })
  
});


sortDropdown.forEach(sort => {
  sort.addEventListener('change', e => {
    const sortPrice = e.currentTarget.value;
    if(sortPrice === 'high') {
      sortProductsPriceAscending();
    } else if (sortPrice === 'low'){
      sortProductsPriceDecending();
    }
  });
});

const sortProductsPriceAscending = () => {
  item.sort((a, b) => a.price - b.price);
}

const sortProductsPriceDecending = () => {
  item.sort((b, a) => b.price - a.price);
}

















  

// Live Date
date.innerHTML = new Date().getFullYear();








