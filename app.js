// FETCH ITEMS

async function getItems() {
  let url = 'mock.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderItems() {
  let items = await getItems();
  let html = '';
  items.forEach(item => {
    let htmlSegment = ` <div class="card">
                        <img src="${item.image_url}" alt="placeholder">
                        <div class="descriptions">
                        <p>${item.product_name}</p>
                        <button>${item.price}</button>
                        </div>
                        </div>
                        `;
    html += htmlSegment;
  });

    let container = document.querySelector('.card-section');
    container.innerHTML = html;

    console.log(container);
}

renderItems();



