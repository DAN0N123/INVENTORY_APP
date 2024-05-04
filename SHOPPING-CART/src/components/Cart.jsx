import { useState } from "react";
import Navbar from "./Navbar";
import '../styles/cart.css'

export default function Cart() {
    const [items, setItems] = useState({})

    return (
        <div className="cartComponent">
            <Navbar />
            <div className="cartItems">
                
            </div>
        </div>
    )
}