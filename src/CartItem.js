import React from "react";

class CartItem extends React.Component {
  increaseQuantity = () => {
    this.setState(
      (prevState) => {
        return {
          qty: prevState.qty + 1,
        };
      },
      () => {
        console.log("this.state", this.props);
      }
    );
  };

  decreaseQuantity = () => {
    const { qty } = this.state;
    // destructuring
    if (qty === 0) {
      return;
    }
    this.setState(
      (prevState) => {
        return {
          qty: prevState.qty - 1,
        };
      },
      () => {
        console.log("this.state", this.state);
      }
    );
  };

  render() {
    // console.log("this.props", this.props);
    const { price, title, qty } = this.props.product;
    return (
      <div className="cart-item">
        <div className="left-block">
          <img
            style={styles.image}
            alt=""
            src="https://image.flaticon.com/icons/png/512/2920/2920329.png"
          />
        </div>
        <div className="right-block">
          <div style={{ font: 25 }}>{title}</div>
          <div style={{ color: "#777" }}>Rs:{price}</div>
          <div style={{ color: "#777" }}>Qty:{qty}</div>
          <div className="cart-item-actions">
            <img
              alt="increase"
              className="action-icons"
              src="https://image.flaticon.com/icons/png/512/992/992651.png"
              onClick={this.increaseQuantity}
            />
            <img
              alt="decrease"
              className="action-icons"
              src="https://image.flaticon.com/icons/png/512/992/992683.png"
              onClick={this.decreaseQuantity}
            />
            <img
              alt="delete"
              className="action-icons"
              src="https://image.flaticon.com/icons/png/512/1345/1345874.png"
            />
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  image: {
    height: 110,
    width: 110,
    borderRadius: 4,
    background: "#ccc",
  },
};
export default CartItem;
