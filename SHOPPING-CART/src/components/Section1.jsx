import '../styles/section1.css'


export default function Section1() {
   
    return(
        <div className="section1">
            <div className="sectionText">
                <div className="mainText">
                    <p> The future </p>
                    <p> is </p>
                    <p> now</p>
                </div>
                <div className="mission">
                    Create a generalized brain interface to restore autonomy to those with unmet medical needs today and unlock human potential tomorrow.
                </div>
                <div className="startShopping">
                    Start Shopping
                </div>
            </div>
            <img className="neuralink" src="/neuralink.jpeg" alt="hand holding the neuralink device" />
        </div>
    )
}