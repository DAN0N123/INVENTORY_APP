/* eslint-disable react/no-unescaped-entities */

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
            <div className="imgBox">
                <img className="device" src='/device.jpg' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
                <div className="shadow"></div>
            </div>
            <div className="deviceText" ref={text}>
                <p>Brain-computer interfaces have the potential to change our lives. </p>
                <p>We want to bring this technology from the lab into  peoples' homes.</p>
                <div className="borderBottom" ref={bottomLine}></div>
            </div>

        </div>
    )
}