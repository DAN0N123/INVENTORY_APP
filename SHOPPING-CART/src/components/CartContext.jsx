import { createContext, useContext, useState } from 'react';

const Cart = createContext();

export const useCart = () => useContext(Cart)

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    const isItemInCart = (itemName) => {
        return cartItems.some(item => item.name === itemName);
    }

    const getItemByName = (itemName) => {
        return cartItems.find(item => item.name === itemName);
    }
    const getTotal = () => {
        return cartItems.reduce( 
            (total, current) => total + current.price * current.amount, 0)
    }
    const removeItemFromCart = (itemName) => {
        setCartItems(cartItems.filter(item => item.name !== itemName));
    };

    return (
        <Cart.Provider value={{ cartItems, addItemToCart, removeItemFromCart, isItemInCart, getItemByName, setCartItems, getTotal}}>
            {children}
        </Cart.Provider>
    );
};