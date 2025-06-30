document.addEventListener('DOMContentLoaded', () => {
  setupAddToCartButtons();
  updateCartCount();
  renderCart();
  setupContactForm();
  setupLogoutButton();
  setupCheckoutButton();
  setupShippingListener();
});

function setupAddToCartButtons() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const card = btn.closest('.pro');
      const id = card.getAttribute('data-id');
      const name = card.querySelector('h5').innerText;
      const brand = card.querySelector('span').innerText;
      const price = parseFloat(card.querySelector('h4').innerText.replace(/Rs\.?/, '').trim());
      const img = card.querySelector('img').src;
      const sizeSelect = card.querySelector('.size-select');
      const size = sizeSelect ? sizeSelect.value : '';
      if (!size || size === 'Select size') {
        alert('Please select a size before adding to cart.');
        return;
      }
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const idx = cart.findIndex(x => x.productId === id && x.size === size);
      if (idx > -1) cart[idx].quantity++;
      else cart.push({ productId: id, name, brand, img, price, size, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Item added to cart!');
      updateCartCount();
      renderCart();
    });
  });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, i) => sum + i.quantity, 0);
  const elDesktop = document.getElementById('cart-count');
  const elMobile  = document.getElementById('cart-count-mobile');
  if (elDesktop) elDesktop.textContent = total || '';
  if (elMobile)  elMobile.textContent = total || '';
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const tbody = document.getElementById('cart-items');
  if (!tbody) return;
  if (!cart.length) {
    tbody.innerHTML = '<tr><td colspan="7">Your cart is empty.</td></tr>';
    document.getElementById('cart-subtotal').textContent = 'Rs.0';
    document.getElementById('cart-total').textContent = 'Rs.0';
    localStorage.setItem('cartTotal', 0);
    return;
  }
  let subtotal = 0;
  tbody.innerHTML = cart.map((item, i) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    return `
      <tr>
        <td><button onclick="removeItem(${i})">Remove</button></td>
        <td><img src="${item.img}" width="50"/></td>
        <td>${item.name}</td>
        <td>${item.size || '-'}</td>
        <td>Rs.${item.price.toFixed(2)}</td>
        <td>${item.quantity}</td>
        <td>Rs.${itemTotal.toFixed(2)}</td>
      </tr>
    `;
  }).join('');
  document.getElementById('cart-subtotal').textContent = `Rs.${subtotal.toFixed(2)}`;
  // Use discounted total if present
  let cartTotal = localStorage.getItem('cartTotal');
  if (cartTotal && !isNaN(cartTotal) && Number(cartTotal) < subtotal) {
    document.getElementById('cart-total').textContent = `Rs.${Number(cartTotal).toFixed(2)}`;
  } else {
    document.getElementById('cart-total').textContent = `Rs.${subtotal.toFixed(2)}`;
    localStorage.setItem('cartTotal', subtotal);
  }
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function clearCart() {
  localStorage.removeItem('cart');
  updateCartCount();
  renderCart();
}

function setupCheckoutButton() {
  const btn = document.getElementById('checkoutBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('ShopFusion_user'));
    if (!user) {
      alert('Please log in or register to proceed to checkout.');
      window.location.href = '/FrontEnd/login.html';
      return;
    }
    proceedToCheckout();
  });
}

function proceedToCheckout() {
  document.getElementById('cart-add').style.display = 'none';
  document.getElementById('checkout-form').style.display = 'block';
}

function setupShippingListener() {
  const form = document.getElementById('shippingForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const shippingDetails = {
      fullName: form.fullName.value,
      contactNumber: form.contactNumber.value,
      email: form.email.value,
      address: form.address.value,
      state: form.state.value
    };
    const total = document.getElementById('cart-total').textContent.replace('Rs.', '').trim();
    localStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));
    localStorage.setItem('cartTotal', total);
    document.getElementById('checkout-form').style.display   = 'none';
    document.getElementById('payment-container').style.display = 'block';
    document.getElementById('paymentAmount').textContent      = `Rs.${total}`;
  });
}

function setupContactForm() {}

function setupLogoutButton() {
  const btn = document.getElementById('logoutBtn');
  if (!btn) return;
  btn.addEventListener('click', ()=> {
    localStorage.removeItem('ShopFusion_user');
    updateCartCount();
    window.location.href = '/';
  });
}

function applyCoupon() {
  alert('Coupon applied!');
}
