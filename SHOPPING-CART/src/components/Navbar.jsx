import { useState } from "react";
import '../styles/navbar.css'



export default function Navbar(){
    const [view, setView] = useState(null)

    return (
        <nav>
            <img src="/logo.png" alt="neuralink logo" width='auto' height='50px'/>
            <div className="home"> HOME </div>
            <div className="shop"> SHOP </div>
        </nav>
    )
}