const products = [
  { id: 1, title: 'Notebook', price: 1000 },
  { id: 2, title: 'Mouse', price: 100 },
  { id: 3, title: 'Keyboard', price: 250 },
  { id: 4, title: 'Gamepad', price: 150 },
];

const getProductHTMLString = (title, price, images) =>
  `<div class="product-item">
                <h3>${title}</h3>
                <p>${price} p.</p>
                <img class = "product-img" src = ${images =
  'https://st2.depositphotos.com/4641393/9871/i/600/' +
  'depositphotos_98718182-stock-photo-soft-colored-abstract-background-for.jpg\
                   width = 50%'} alt = >
                 <button class="by-btn">Добавить</button>
              </div>`;


const renderProducts = productList => {
  const list = productList.map((good) => getProductHTMLString(good.title, good.price));

  document.querySelector('.products').innerHTML = list.join('');
  // console.log(list);

};
//Почему через метод 'reduce' первый продукт выводится objekt Objekt
/*const renderProducts = (productList) => {
  const list = productList.reduce((acc, good) => acc + getProductHTMLString(good.title, good.price));
  document.querySelector('.products').innerHTML = list;
  console.log(list);
}*/


renderProducts(products);

