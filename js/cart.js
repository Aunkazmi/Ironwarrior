// Shopping Cart Logic
const cart = [];

// Function to Add Item to Cart
function addItemToCart(id, name, price, quantity = 1) {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    // If item already exists, update the quantity
    existingItem.quantity += quantity;
  } else {
    // Add new item to the cart
    cart.push({ id, name, price, quantity });
  }
  renderCartItems();
}

// Function to Update Item Quantity
function updateQuantity(id, newQuantity) {
  const item = cart.find((product) => product.id === id);
  if (item) {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      item.quantity = newQuantity;
    }
  }
  renderCartItems();
}

// Function to Remove Item from Cart
function removeItem(id) {
  const index = cart.findIndex((product) => product.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  renderCartItems();
}

// Function to Calculate Total Price
function calculateTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Function to Render Cart Items in HTML
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalAmountElement = document.getElementById("total-amount");

  cartItemsContainer.innerHTML = ""; // Clear previous items
  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <input type="number" class="form-control" value="${item.quantity}" min="1"
          onchange="updateQuantity(${item.id}, parseInt(this.value, 10))" />
      </td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})">
          Remove
        </button>
      </td>
    `;
    cartItemsContainer.appendChild(row);
  });

  // Update Total Price
  totalAmountElement.textContent = `$${calculateTotal().toFixed(2)}`;
}

// Example Usage
document.addEventListener("DOMContentLoaded", () => {
  // Adding some demo items to the cart for testing
  addItemToCart(1, "Dumbbell Set", 50, 1);
  addItemToCart(2, "Treadmill", 700, 1);
  addItemToCart(3, "Yoga Mat", 30, 2);

  // Render initial cart
  renderCartItems()
