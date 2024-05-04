import Navbar from "./Navbar"
import '../styles/shop.css'
import { useRef } from "react"
import { Link } from "react-router-dom"

export default function Shop() {
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
                    
            </div>
            <div className="items"> 
                <div className="item">
                    <img src="/neuralink.jpeg"/>
                    <div className="name"> Neuralink $499 </div>
                    <div className="addToCart" onClick={() => iBelieveiCanFly(0)}> Add to cart </div>
                    <div className="flyingBox" ref={flyingBox}></div>
                </div>
                <div className="item">
                    <img src="/neuralinkShirt.png"/>
                    <div className="name"> Neuralink Shirt $15 </div>
                    <div className="addToCart" onClick={() => iBelieveiCanFly(1)}> Add to cart </div>
                    <div className="flyingBox" ref={flyingBox2}></div>
                </div>
                <div className="item">
                    <img src="/neuralinkTanktop.png"/>
                    <div className="name"> Neuralink Tanktop $15 </div>
                    <div className="addToCart" onClick={() => iBelieveiCanFly(2)}> Add to cart </div>
                    <div className="flyingBox" ref={flyingBox3}></div>
                </div>
                <div className="item">
                    <img src="/elonJoint.jpg"/>
                    <div className="name"> Joe Rogan Shirt $30 </div>
                    <div className="addToCart" onClick={() => iBelieveiCanFly(3)}> Add to cart </div>
                    <div className="flyingBox" ref={flyingBox4}></div>
                </div>
                <div className="item">
                    <img src="/marsTrip.jpg"/>
                    <div className="name"> Trip to Mars $2 million </div>
                    <div className="addToCart" onClick={() => iBelieveiCanFly(4)}> Add to cart </div>
                    <div className="flyingBox" ref={flyingBox5}></div>
                </div>
            </div>
        </div>
    )
}