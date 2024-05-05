import InitialSection from './InitialSection'
import ScrollingText from './ScrollingText'
import MainShowcase from './MainShowcase'
import Navbar from './Navbar'


export default function Homepage() {


    return( 
        <div className="homepage">
            <Navbar />
            <InitialSection />
            <ScrollingText />
            <MainShowcase />
        </div>
    )
}