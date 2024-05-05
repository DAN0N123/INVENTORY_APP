import Navbar from "./Navbar"
import '../styles/shop.css'
import { useRef } from "react"
import { Link } from "react-router-dom"

import { useCart } from "./CartContext"

export default function Shop() {
    const { addItemToCart, cartItems, isItemInCart, getItemByName} = useCart();

    const cartText = useRef(0)
    const flyingBox = useRef(0)
    const flyingBox2 = useRef(0)
    const flyingBox3 = useRef(0)
    const flyingBox4 = useRef(0)
    const flyingBox5 = useRef(0)

    const boxes = [flyingBox, flyingBox2, flyingBox3, flyingBox4, flyingBox5]



    function handleIconHover(){
        cartText.current.classList.add('show')
    }
    function handleIconLeave(){
        cartText.current.classList.remove('show')
    }
    
    function handleAddToCart(e) {
        const item = e.currentTarget.parentElement
        let price = item.querySelector('.price').textContent.split('$')[1]
        const name = item.querySelector('.name').textContent
        if (isItemInCart(name)){
            const item = getItemByName(name)
            item.amount = item.amount + 1
        }else{
            if(price === "2 million") price = 2000000;
            addItemToCart( {name: name, price: price, amount: 1})
        }

    }

    function iBelieveiCanFly(item) {
            const flyingBox = boxes[item]
            flyingBox.current.style.opacity = '1'; 
            flyingBox.current.style.animation = 'none'; 
            if(item > 0){
                flyingBox.current.style.top = `calc(65% + ${item*530}px`
            }
            setTimeout(() => {
                flyingBox.current.style.animation = 'flyAnimation 0.5s linear forwards';
            }, 10); 
    }
    return (
        <div className="shop">
            <Navbar />
            <div className="cart">
                    <div className="cartText" ref={cartText}>
                        GO TO CART
                    </div>
                    <Link to="/cart" className="cartLink">
                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="black" className="bi bi-cart3" viewBox="0 0 16 16" onMouseEnter={handleIconHover} onMouseLeave={handleIconLeave}>
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                        
                    </Link>
                    <p>{cartItems.length}</p>
                    
            </div>
            <div className="items"> 
                <div className="item">
                    <img src="/neuralinkItem.png"/>
                    <div className="title">
                        <div className="name"> Neuralink </div>
                        <div className="price"> $499 </div>
                    </div>
                    <div className="addToCart" onClick={(e) => {
                        iBelieveiCanFly(0)
                        handleAddToCart(e)}}> Add to cart </div>
                    <div className="flyingBox" ref={flyingBox}></div>
                </div>
                <div className="item">
                    <img src="/neuralinkShirt.png"/>
                    <div className="title">
                        <div className="name"> Neuralink Shirt  </div>
                        <div className="price">$15</div>
                    </div>
                    <div className="addToCart" onClick={(e) => {
                        iBelieveiCanFly(1)
                        handleAddToCart(e)}}> Add to cart </div>
                    <div className="flyingBox" ref={flyingBox2}></div>
                </div>
                <div className="item">
                    <img src="/neuralinkTanktop.png"/>
                    <div className="title">
                        <div className="name"> Neuralink Tanktop  </div>
                        <div className="price">$15</div>
                    </div>
                    <div className="addToCart" onClick={(e) => {
                        iBelieveiCanFly(2)
                        handleAddToCart(e)}}> Add to cart </div>
                    <div className="flyingBox" ref={flyingBox3}></div>
                </div>
                <div className="item">
                    <img src="/elonJoint.jpg"/>
                    <div className="title">
                        <div className="name"> Joe Rogan Shirt  </div>
                        <div className="price">$30</div>
                    </div>
                    <div className="addToCart" onClick={(e) => {
                        iBelieveiCanFly(3)
                        handleAddToCart(e)}}> Add to cart </div>
                    <div className="flyingBox" ref={flyingBox4}></div>
                </div>
                <div className="item">
                    <img src="/marsTrip.jpg"/>
                    <div className="title">
                        <div className="name"> Trip to Mars  </div>
                        <div className="price">$2 million</div>
                    </div>
                    <div className="addToCart" onClick={(e) => {
                        iBelieveiCanFly(4)
                        handleAddToCart(e)}}> Add to cart </div>
                    <div className="flyingBox" ref={flyingBox5}></div>
                </div>
            </div>
        </div>
    )
}