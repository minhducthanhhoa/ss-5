let checkLogin = JSON.parse(localStorage.getItem("checkLogin")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let textElement = document.getElementById("text");

console.log(textElement);

let myCart;
for (let i = 0; i < users.length; i++) {
  if (checkLogin == users[i].id) {
    myCart = users[i].cart;
  }
}

function render() {
  let cartHTML = "";
  for (let i = 0; i < users.length; i++) {
    if (checkLogin == users[i].id) {
      let cartItems = users[i].cart;
      for (let j = 0; j < cartItems.length; j++) {
        let item = cartItems[j];
        let totalPrice = parseFloat(item.price.replace(/\./g, '').replace(',', '.')) * item.quantity;
        let formattedPrice = totalPrice.toLocaleString('vi-VN') + 'đ';

        cartHTML += `
          <tr>
            <td>${j + 1}</td>
            <td>
              <img width="100px" src=${item.image} alt="img" />
            </td>
            <td>${item.name}</td>
            <td>${item.price} ₫</td>
            <td>
              <button onclick="decrease(${item.id})">-</button>
              ${item.quantity}
              <button onclick="increase(${item.id})">+</button>
            </td>
            <td id='value${item.id}'>${formattedPrice}</td>
          </tr>
        `;
      }
    }
  }

  document.getElementById("cartBody").innerHTML = cartHTML;
}

render();

function total() {
  let count = 0;
  for (let i = 0; i < myCart.length; i++) {
    let item = myCart[i];
    count += parseFloat(item.price.replace(/\./g, '').replace(',', '.')) * item.quantity;
  }

  let formattedTotal = count.toLocaleString('vi-VN') + 'đ';

  textElement.innerHTML = `
    <td colspan="6" class="text">Tổng tiền: ${formattedTotal}</td>
  `;
}

total();

function increase(itemId) {
  for (let i = 0; i < users.length; i++) {
    let currentUser = users[i];
    if (checkLogin == currentUser.id) {
      let cartItems = currentUser.cart;
      for (let j = 0; j < cartItems.length; j++) {
        if (itemId == cartItems[j].id) {
          cartItems[j].quantity++;
          localStorage.setItem("users", JSON.stringify(users));
          render();
          total();
          break;
        }
      }
    }
  }
}

function decrease(itemId) {
  for (let i = 0; i < users.length; i++) {
    let currentUser = users[i];
    if (checkLogin === currentUser.id) {
      let cartItems = currentUser.cart;
      for (let j = 0; j < cartItems.length; j++) {
        if (itemId == cartItems[j].id) {
          if (cartItems[j].quantity == 1) {
            let confirmDelete = confirm("Bạn có muốn bỏ sản phẩm này?");
            if (!confirmDelete) {
              return;
            } else {
              cartItems.splice(j, 1);
              localStorage.setItem("users", JSON.stringify(users));
              render();
              total();
              window.location.href = "../pages/cart.html";
              break;
            }
          } else {
            cartItems[j].quantity--;
            localStorage.setItem("users", JSON.stringify(users));
            render();
            total();
            break;
          }
        }
      }
    }
  }
}