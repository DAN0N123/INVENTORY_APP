import { useState } from "react";
import '../styles/navbar.css'



export default function Navbar(){
    const [view, setView] = useState(null)

    return (
        <nav>
            <div className="home"> HOME </div>
            <div className="shop"> SHOP </div>
        </nav>
    )
}