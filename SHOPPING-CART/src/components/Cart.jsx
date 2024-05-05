import Navbar from "./Navbar";
import '../styles/cart.css'
import { useCart } from "./CartContext";

export default function Cart() {
    const { cartItems, getItemByName, setCartItems, removeItemFromCart, getTotal} = useCart()

    function handleIncrement(e) {
        const name = e.currentTarget.parentElement.parentElement.id
        const cartItem = getItemByName(name)
        cartItem.amount = cartItem.amount + 1
        const newItems = [...cartItems]
        setCartItems(newItems)
    }
    function renderCheckout() {
        if(cartItems.length > 0){
            return (
                <div className="checkout">
                    <div className="total"> Total: ${getTotal()}</div>
                    <div className="pay"> PAY</div>
                </div>)
        }
    }
    function handleDecrement(e) {
        const name = e.currentTarget.parentElement.parentElement.id
        const cartItem = getItemByName(name)
        if(cartItem.amount === 1){
            return removeItemFromCart(cartItem.name)
        }
        cartItem.amount = cartItem.amount - 1
        const newItems = [...cartItems]
        setCartItems(newItems)

    }
    function handleRemovingItem(e) {
        const name = e.currentTarget.parentElement.id
        removeItemFromCart(name)
    }
    
    return (
        <div className="cartComponent">
            <Navbar />
            <div className="cartBox">
                <div className="cartItems">
                        <div className="itemsDisplay">
                            {cartItems.map( (item) => {
                                return <div key={item.name} id={item.name} className="cartItem"> 
                                            <div className="itemName"> {item.name} </div>
                                            <div className="amountInput"> 
                                                <div className="decrement" onClick={(e) => handleDecrement(e)}> - </div>
                                                <div className="amount"> {item.amount} </div>
                                                <div className="increment" onClick={(e) => handleIncrement(e)}> + </div>
                                            </div>
                                            <div className="itemPrice"> ${item.price} </div>
                                            <div className="deleteItem" onClick={ handleRemovingItem }> 
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="gray" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                </svg>
                                            </div>
                                       </div>
                            })}
                        </div>
                        {renderCheckout()}
                </div>
            </div>
        </div>
    )
}

