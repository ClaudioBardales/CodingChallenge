const filterBtns = document.querySelectorAll('.filter-btn');
const searchBar = document.querySelector('.input');
const container = document.querySelector('.card-section');
const dropdown = document.querySelector('#categories');
const sort = document.querySelector('#sort');
const date = document.getElementById('date');
let item = [];

console.log(dropdown);


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
                  <button>${item.price}</button>
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

dropdown.addEventListener('change', () =>{
  console.log(dropdown);
})

// Sort with Dropdown
sort.addEventListener('change', () => {
    const sortItems = item => {
    if(item.value === value.price){
      item.sort((a, b) => {
        return a.price - b.price
      })
    }  
}
// console.log(sortItems(item));
console.log(sort);
})


  

// Live Date
date.innerHTML = new Date().getFullYear();








