// let products = [
//     {
//         id: 1,
//         name: "Iphone 6",
//         price: "2.500.000đ",
//         image: "./assets/images/iphone6.jpg",
//     },
//     {
//         id: 2,
//         name: "Iphone 7 plus",
//         price: "7.000.000đ",
//         image: "./assets/images/iphone7.jpg",
//     },
//     {
//         id: 3,
//         name: "Iphone 8 plus",
//         price: "8.000.000đ",
//         image: "./assets/images/iphone8.jpg",
//     },
//     {
//         id: 4,
//         name: "Iphone 10",
//         price: "10.000.000đ",
//         image: "./assets/images/iphone10.jpg",
//     },
//     {
//         id: 5,
//         name: "Iphone 11",
//         price: "16.000.000đ",
//         image: "./assets/images/iphone11.jpg"
//     },
//     {
//         id: 6,
//         name: "Iphone 12",
//         price: "20.000.000đ",
//         image: "./assets/images/iphone12.jpg",
//     },
//     {
//         id: 7,
//         name: "Iphone 13 promax",
//         price: "30.000.000",
//         image: "./assets/images/iphone13.jpg",
//     },
//     {
//         id: 8,
//         name: "Iphone 14 promax",
//         price: "35.000.000đ",
//         image: "./assets/images/iphon14.jpg",
//     },
//     {
//         id: 9,
//         name: "Iphone 15 promax",
//         price: "37.000.000đ",
//         image: "./assets/images/iphone15.jpg",
//     },
//     {
//         id: 10,
//         name: "Samsung S23 Ultra",
//         price: "9.000.000đ",
//         image: "./assets/images/samsung.jpg",
//     },
//     {
//         id: 11,
//         name: "OPPO A57",
//         price: "5.000.000đ",
//         image: "./assets/images/oppo.jpg",
//     },
//     {
//         id: 12,
//         name: "Redmi Note 12",
//         price: "12.000.000đ",
//         image: "./assets/images/redmi.jpg",
//     },
// ];

// localStorage.setItem("products",JSON.stringify(products));

// lấy dữ liệu về đi render
let products = JSON.parse(localStorage.getItem("products"));
// console.log("111111", products);

//  function render product
function renderProduct() {
    let element = "";
    for (let i = 0; i < products.length; i++) {
        element +=
            `
                    <div class="product__item">
                        <div class="image">
                            <img src="${products[i].image}" alt="">
                        </div>
                        <p>${products[i].name}</p>
                        <div>
                            <p>price:${products[i].price}</p>
                            <p><button onclick="addToCart(${products[i].id})">Mua</button></p>
                        </div>
                    </div>
                `
    }

}
renderProduct();
// function đi mua hàng
function addToCart(productId) {
    // console.log("1111111111",element);
    document.getElementById("products").innerHTML = element
    // console.log("đã gọi hàm");
    /* 
        khi nào cho user đi mua hàng
        khi đăng nhập thì mới cho mua
     */
    let checkLogin = JSON.parse(localStorage.getItem("checkLogin"));
    if (checkLogin == null) {
        console.log("bạn phải đăng nhập để đi mua hàng");
        return // gặp return dừng chương trình luôn
    }
    console.log("đi mua hàng bình thường");
    /* 
        lấy giỏ hàng của user để đi mua hàng
        và lấy giỏ hàng user dựa vào id của user
     */
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == checkLogin) {
            //lấy thông tin sản phẩm để đưa vào giỏ hàng
            // làm sao để lấy thông tin sản phẩm
            // console.log("11111", productId);
            // có id sản phẩm rồi làm sao lấy thông tin sản phẩm
            let product = JSON.parse(localStorage.getItem("products"));
            for (let j = 0; j < product.length; j++) {
                if (productId == product[j].id) {
                    // lấy thông tin sản phẩm
                    console.log("1111", product[j]);
                    console.log("giỏ hàng của user sẽ là ", users[i].cart);
                    // let a={...product[j],quantity:1}
                    /* 
                        trước khi thêm vào phải xem trong giỏ hàng có sản phẩm đó chưa
                        có rồi thì tăng số lượng còn chưa có thì thêm vào bt
                    */
                    // kiểm tra xem trong giỏ hàng có tồn tại sản phẩm đó chưa
                    // duyệt giỏ hàng
                    let index = users[i].cart.findIndex((item, index) => {
                        return item.id == productId
                    })
                    if (index == -1) {
                        //tức là không có thêm bình thường
                        console.log("chưa có ");
                        users[i].cart.push({ ...product[j], quantity: 1 });
                        localStorage.setItem("users", JSON.stringify(users));
                        showQuantityCart()
                    } else {
                        //có rồi đi tăng số lượng
                        // mình phải biết vị trí của cái cần tăng
                        users[i].cart[index].quantity = ++users[i].cart[index].quantity;
                        localStorage.setItem("users", JSON.stringify(users));
                    }
                    // for (let index = 0; index < users[i].cart.length; index++) {
                    //         if(users.cart[index].id==productId){
                    //         }
                    // }
                    // sau khi push xong thì lưu trên local
                }
            }
        }
    }
}
// function hiển thị số lượng sản phẩm
function showQuantityCart() {
    // lấy giỏ hàng ra.length là được
    let checkLogin = JSON.parse(localStorage.getItem("checkLogin"));
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == checkLogin) {
            // console.log(users[i].cart);
document.getElementsByClassName("itemInCart")[0].innerHTML = users[i].cart.length
        }
    }
}
showQuantityCart()