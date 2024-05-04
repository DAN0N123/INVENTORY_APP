import '../styles/navbar.css'
import { Link } from "react-router-dom";


export default function Navbar(){
    return (
        <nav>
            <img src="/logo.png" alt="neuralink logo" width='auto' height='50px'/>
            <div className="home">
                <Link to="/" className='link'> HOME </Link>
            </div>
            <div className="shop">
                <Link to="/shop" className='link'> SHOP </Link>
            </div>
        </nav>
    )
}