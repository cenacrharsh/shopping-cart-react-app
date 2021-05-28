import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          price: 2000,
          title: "Watch",
          qty: 1,
          img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
          id: 1,
        },
        {
          price: 10000,
          title: "Mobile Phone",
          qty: 1,
          img: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
          id: 2,
        },
        {
          price: 35000,
          title: "Laptop",
          qty: 1,
          img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80",
          id: 3,
        },
      ],
    };
  }

  handleIncreaseQuantity = (product) => {
    // console.log("increase this product", product);
    const { products } = this.state;
    const index = products.indexOf(product);
    products[index].qty += 1;
    this.setState({ products });
    //products:products (since key:value same we write once)
  };
  handleDecreaseQuantity = (product) => {
    // console.log("decrease this product", product);
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty === 0) {
      return;
    }
    products[index].qty -= 1;
    this.setState({ products });
    //products:products (since key:value same we write once)
  };
  handleDeleteProduct = (id) => {
    // console.log("delete this product", id);
    const { products } = this.state;
    const items = products.filter((item) => item.id !== id);
    this.setState({ products: items });
  };

  getCartCount = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.qty;
    });
    return count;
  };

  getCartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;
    products.map((product) => {
      cartTotal += product.qty * product.price;
    });
    return cartTotal;
  };

  render() {
    const { products } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={{ padding: 10, fontSize: 20 }}>
          TOTAL: {this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
