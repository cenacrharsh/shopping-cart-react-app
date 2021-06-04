import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebase from "firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
      // {
      //   price: 2000,
      //   title: "Watch",
      //   qty: 1,
      //   img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
      //   id: 1,
      // },
      // {
      //   price: 10000,
      //   title: "Mobile Phone",
      //   qty: 1,
      //   img: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
      //   id: 2,
      // },
      // {
      //   price: 35000,
      //   title: "Laptop",
      //   qty: 1,
      //   img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80",
      //   id: 3,
      // },
    };
    this.db = firebase.firestore();
  }

  componentDidMount() {
    // firebase
    //   .firestore()
    //   .collection("products")
    //   .get()
    //   .then((snapshot) => {
    //     console.log(snapshot);

    //     snapshot.docs.map((doc) => {
    //       console.log(doc.data());
    //     });

    //     const products = snapshot.docs.map((doc) => {
    //       const data = doc.data();
    //       data["id"] = doc.id;
    //       return data;
    //     });

    //     this.setState({
    //       products: products,
    //       loading: false,
    //     });
    //   });

    this.db
      .collection("products")
      // .where("price", "<=", 5000)
      // .where("title", "==", "Laptop")
      .orderBy("price", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot);

        snapshot.docs.map((doc) => {
          console.log(doc.data());
        });

        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });

        this.setState({
          products: products,
          loading: false,
        });
      });
  }

  handleIncreaseQuantity = (product) => {
    // console.log("increase this product", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;
    // this.setState({ products });
    //products:products (since key:value same we write once)

    const docRef = this.db.collection("products").doc(products[index].id);
    docRef
      .update({
        qty: products[index].qty + 1,
      })
      .then(() => {
        console.log("Product Incremented Succesfully");
      })
      .catch((error) => {
        console.log("Error occured in Increment", error);
      });
  };

  handleDecreaseQuantity = (product) => {
    // console.log("decrease this product", product);
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty === 0) {
      return;
    }
    // products[index].qty -= 1;
    // this.setState({ products });
    //products:products (since key:value same we write once)
    const docRef = this.db.collection("products").doc(products[index].id);
    docRef
      .update({
        qty: products[index].qty - 1,
      })
      .then(() => {
        console.log("Product Decremented Succesfully");
      })
      .catch((error) => {
        console.log("Error occured in Decrement", error);
      });
  };

  handleDeleteProduct = (id) => {
    // console.log("delete this product", id);
    const { products } = this.state;
    // const items = products.filter((item) => item.id !== id);
    // this.setState({ products: items });

    const docRef = this.db.collection("products").doc(id);
    docRef
      .delete()
      .then(() => {
        console.log("Product Deleted Succesfully");
      })
      .catch((error) => {
        console.log("Error occured in Deletion", error);
      });
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
      return "";
    });
    return cartTotal;
  };

  // addProduct = () => {
  //   this.db
  //     .collection("products")
  //     .add({
  //       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCxmlUFYSP1YWsmnS-0U7C5bVLmhftyrfERA&usqp=CAU",
  //       price: 10000,
  //       qty: 1,
  //       title: "Washing Machine",
  //     })
  //     .then((docRef) => {
  //       console.log("Product Added", docRef);
  //     })
  //     .catch((error) => {
  //       console.log("Error Occured", error);
  //     });
  // };

  addWashingMachine = () => {
    this.db
      .collection("products")
      .add({
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCxmlUFYSP1YWsmnS-0U7C5bVLmhftyrfERA&usqp=CAU",
        price: 5000,
        qty: 1,
        title: "Washing Machine",
      })
      .then((docRef) => {
        console.log("Product Added", docRef);
      })
      .catch((error) => {
        console.log("Error Occured", error);
      });
  };

  addLaptop = () => {
    this.db
      .collection("products")
      .add({
        img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80",
        price: 35000,
        qty: 1,
        title: "Laptop",
      })
      .then((docRef) => {
        console.log("Product Added", docRef);
      })
      .catch((error) => {
        console.log("Error Occured", error);
      });
  };
  addMobilePhone = () => {
    this.db
      .collection("products")
      .add({
        img: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        price: 10000,
        qty: 1,
        title: "Mobile Phone",
      })
      .then((docRef) => {
        console.log("Product Added", docRef);
      })
      .catch((error) => {
        console.log("Error Occured", error);
      });
  };
  addWatch = () => {
    this.db
      .collection("products")
      .add({
        img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        price: 10000,
        qty: 1,
        title: "Watch",
      })
      .then((docRef) => {
        console.log("Product Added", docRef);
      })
      .catch((error) => {
        console.log("Error Occured", error);
      });
  };

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct} style={{ padding: 20, fontSize: 20 }}>
          Add a Product
        </button> */}
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />

        {loading && <h1>loading products...</h1>}
        <div>
          <button
            onClick={this.addWashingMachine}
            style={{
              padding: 20,
              fontSize: 15,
              margin: 20,
              background: "#d5deef",
            }}
          >
            Add Washing Machine
          </button>
          <button
            onClick={this.addLaptop}
            style={{
              padding: 20,
              fontSize: 15,
              margin: 20,
              paddingLeft: 57,
              paddingRight: 57,
              background: "#d5deef",
            }}
          >
            Add Laptop
          </button>
          <button
            onClick={this.addMobilePhone}
            style={{
              padding: 20,
              fontSize: 15,
              margin: 20,
              paddingLeft: 33,
              paddingRight: 33,
              background: "#d5deef",
            }}
          >
            Add Mobile Phone
          </button>
          <button
            onClick={this.addWatch}
            style={{
              padding: 20,
              fontSize: 15,
              margin: 20,
              paddingLeft: 60,
              paddingRight: 60,
              background: "#d5deef",
            }}
          >
            Add Watch
          </button>
        </div>

        <div
          style={{ padding: 10, fontSize: 20, margin: 15, fontWeight: "bold" }}
        >
          TOTAL: {this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
