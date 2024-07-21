// src/Cart.js
import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { placeOrder } from './api';
import { Plus, Minus, Trash } from 'phosphor-react';
import './styles/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [paymentOption, setPaymentOption] = useState('cash');
  const [roomNumber, setRoomNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const validateOrderData = (orderData) => {
    if (!orderData.name || !orderData.surname) {
      return 'Name and surname are required.';
    }
    if (orderData.deliveryOption === 'delivery' && !orderData.roomNumber) {
      return 'Room number is required for delivery.';
    }
    if (!orderData.orderItems || orderData.orderItems.length === 0) {
      return 'No items in the order.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderItems = cartItems.map((item) => ({
      dishName: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderData = {
      name,
      surname,
      deliveryOption,
      paymentOption,
      roomNumber: deliveryOption === 'delivery' ? roomNumber : null,
      total,
      orderItems,
    };

    const validationError = validateOrderData(orderData);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const response = await placeOrder(orderData); // Use placeOrder function from the API module
      console.log('Order placed successfully:', response);
      handleModalClose();
      setLoading(false);
    } catch (error) {
      console.error('Error placing order:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.name} - ₽{item.price.toFixed(2)} (x{item.quantity})</span>
            <div className="cart-item-controls">
              <button onClick={() => decreaseQuantity(item.id)}><Minus size={20} /></button>
              <button onClick={() => increaseQuantity(item.id)}><Plus size={20} /></button>
              <button onClick={() => removeFromCart(item.id)}><Trash size={20} /></button>
            </div>
          </li>
        ))}
      </ul>
      <p>Total: ₽{total.toFixed(2)}</p>
      <button onClick={handleModalOpen} disabled={cartItems.length === 0 || loading}>
        {loading ? 'Loading...' : 'Go to Pay'}
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>Order Details</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                Surname:
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </label>
              <label>
                Delivery Option:
                <select
                  value={deliveryOption}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                >
                  <option value="pickup">Pickup</option>
                  <option value="delivery">Delivery</option>
                </select>
              </label>
              {deliveryOption === 'delivery' && (
                <label>
                  Room Number:
                  <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required={deliveryOption === 'delivery'}
                  />
                </label>
              )}
              <label>
                Payment Option:
                <select
                  value={paymentOption}
                  onChange={(e) => setPaymentOption(e.target.value)}
                >
                  <option value="cash">Cash</option>
                  <option value="card">Send: +7(xxx)(xxx)(xxx)</option>
                </select>
              </label>
              <button type="submit" disabled={loading}>Submit Order</button>
              {error && <p className={`error ${error ? 'shake' : ''}`}>{error}</p>}
            </form>
          </div>
        </div>
        
      )}
       <div className="contact-info">
        <h3>Contact Us</h3>
        <p>Address: 123 Food Street, Food City, FC 12345</p>
        <p>Phone: +7 (234) 567-8901</p>
        <p>Email: contact@foodmenu.com</p>
      </div>
    </div>
    
  );
};

export default Cart;
