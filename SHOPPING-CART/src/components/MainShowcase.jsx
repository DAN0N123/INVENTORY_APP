import '../styles/mainShowcase.css'
import { useRef } from 'react'

export default function MainShowcase() {
    const text = useRef(0)
    const bottomLine = useRef(0)
    function handleMouseEnter() {
        text.current.classList.add('show')
        bottomLine.current.classList.add('show')
    }

    function handleMouseLeave() {
        text.current.classList.remove('show')
        bottomLine.current.classList.remove('show')
    }

    return (
        <div className="bigbox">
            <img className="device" src='/device.jpg' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
            <div className="deviceText show" ref={text}>
                <p>Brain-computer interfaces have the potential to change lives for the better. </p>
                <p>We want to bring this technology from the lab into peoples' homes.</p>
                <div className="borderBottom" ref={bottomLine}></div>
            </div>

        </div>
    )
}