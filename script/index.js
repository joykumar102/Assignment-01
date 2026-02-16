const allProductsUrl = "https://fakestoreapi.com/products";
const categoriesUrl = "https://fakestoreapi.com/products/categories";

let allProductsData = [];

/* ===============================
   Trending Products
================================= */

const trendingProducts = () => {
  fetch(allProductsUrl)
    .then(res => res.json())
    .then(data => {
      allProductsData = data;
      showTrendingProduct(data);
      loadProducts();
    });
};

trendingProducts();

const showTrendingProduct = (products) => {
  const trendingContainer = document.getElementById("trending-container");
  trendingContainer.innerHTML = "";

  const topProduct = products
    .filter(product => product.rating?.rate > 4.6)
    .slice(0, 3);

  topProduct.forEach(product => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="card p-5 shadow transition-transform duration-300 hover:-translate-y-3 hover:shadow-xl">
            <img src="${product.image}" class="w-full h-72 object-contain mx-auto transition-transform duration-300 hover:-translate-y-3 hover:shadow-xl">
            
           <div class="flex items-center justify-between py-7">
          
      <p class="badge badge-info text-white">${product.category}</p>
     <h2 class="card-title"><i class="fa-regular fa-star text-yellow-500"></i>
      ${product.rating.rate} (${product.rating.count})</h2>
           </div>
            <h2 class="font-semibold text-lg mb-2">${product.title}</h2>
            <p class="text-xl font-bold">$${product.price}</p>
            
            

            <div class="flex justify-between mt-3">
              <button class="btn" onclick="showDetails(${product.id})"><i class="fa-regular fa-eye"></i> Details</button>
              <button class="btn btn-primary"><i class="fa-solid fa-cart-arrow-down text-xl"></i> Add Cart</button>
            </div>
          </div>
    `;

    trendingContainer.appendChild(div);
  });
};


/* ===============================
   Show / Hide Sections
================================= */

const showProducts = () => {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("products").classList.remove("hidden");
};

const showHome = () => {
  document.getElementById("products").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
};


/* ===============================
   Categories
================================= */

const productCategory = () => {
  fetch(categoriesUrl)
    .then(res => res.json())
    .then(data => {
      const categoryContainer = document.getElementById("category-container");
      categoryContainer.innerHTML = "";

      const allBtn = document.createElement("button");
      allBtn.innerText = "All Products";
      allBtn.className = "btn btn-outline active-btn";

      allBtn.onclick = () => {
        loadProducts();
        setActiveBtn(allBtn);
      };

      categoryContainer.appendChild(allBtn);

      data.forEach(category => {
        const btn = document.createElement("button");
        btn.innerText = category;
        btn.className = "btn btn-outline";

        btn.onclick = () => {
          loadProducts(category);
          setActiveBtn(btn);
        };

        categoryContainer.appendChild(btn);
      });
    });
};

productCategory();

const setActiveBtn = (clickedBtn) => {
  document.querySelectorAll("#category-container button")
    .forEach(btn => btn.classList.remove("active-btn"));

  clickedBtn.classList.add("active-btn");
};


/* ===============================
   Load Products
================================= */

const loadProducts = (category) => {
  showProducts();

  const url = category
    ? `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
    : allProductsUrl;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const productContainer = document.getElementById("product-container");
      productContainer.innerHTML = "";

      data.forEach(product => {
        const div = document.createElement("div");

        div.innerHTML = `
          <div class="card p-5 shadow transition-transform duration-300 hover:-translate-y-3 hover:shadow-xl">
            <img src="${product.image}" class="w-full h-52 object-contain mx-auto transition-transform duration-300 hover:-translate-y-3 hover:shadow-xl">
            
           <div class="flex items-center justify-between py-7">
          
      <p class="badge badge-info text-white">${product.category}</p>
     <h2 class="card-title"><i class="fa-regular fa-star text-yellow-500"></i>
      ${product.rating.rate} (${product.rating.count})</h2>
           </div>
            <h2 class="font-semibold text-lg mb-2">${product.title}</h2>
            <p class="text-xl font-bold">$${product.price}</p>
            
            

            <div class="flex justify-between mt-3">
              <button class="btn" onclick="showDetails(${product.id})"><i class="fa-regular fa-eye"></i> Details</button>
              <button class="btn btn-primary"><i class="fa-solid fa-cart-arrow-down text-xl"></i> Add Cart</button>
            </div>
          </div>
        `;

        productContainer.appendChild(div);
      });
    });
};


/* ===============================
   Modal Details
================================= */

const showDetails = (id) => {
  const product = allProductsData.find(p => p.id === id);

  const modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = `
    <div class="text-center space-y-4">
      <img src="${product.image}" class="w-48 h-60 object-contain mx-auto">

      <h2 class="text-2xl font-bold">${product.title}</h2>

      <p class="badge badge-info">${product.category}</p>

      <p class="text-gray-500">${product.description}</p>

      <div class="flex justify-center gap-6 text-lg">
        <p class="font-bold">$${product.price}</p>
        <p>
          <i class="fa-regular fa-star text-yellow-500"></i>
          ${product.rating?.rate}
        </p>
      </div>
    </div>
  `;

  document.getElementById("details_modal").showModal();
};