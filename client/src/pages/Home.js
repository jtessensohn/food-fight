
import logov2 from '../images/logov2.png'
import '../css/Homepage.css'
import { Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import Navigation from '../components/Navigation';
import carousel1 from '../images/carousel1.png'
import carousel2 from '../images/carousel2.png'
import carousel3 from '../images/carousel3.png'
import Footer from '../components/Footer';



export default function Home() {
    const user = useSelector((state) => state.user);

    return (
        <div>
            <Navigation />
            <img className="logo py-0" src={logov2} alt='Food-fight-logo.png'></img>
            <Carousel className="carouselContainer">
                <Carousel.Item >
                    <img
                        className="d-block w-90 mx-auto carouselImg"
                        src={carousel1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item >
                    <img
                        className="d-block w-90 mx-auto carouselImg"
                        src={carousel2}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item >
                    <img
                        className="d-block w-90 mx-auto carouselImg"
                        src={carousel3}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <h2>Welcome to Food Fight!</h2>
            <p>Tired of Jim always choosing lunch?  <br />Does Sally always know the best foods…but not really?<br />
                Let’s fight about it!  Who ever said fights have to be bad? <br /> Here on Food Fight,You now have just as much say in as Jim or sally on what you get to eat for lunch<br />
                we make it fun to go into battle for YOUR choice in restaurants. <br /> You now have just as much say in as Jim or sally on what you get to eat for lunch</p>

            {user ? (
                <>
                    <SearchBar />
                </>
            ) : (
                <>
                    <Button className="registerloginButton" as={Link} to="/register" >Register</Button>
                    <Button as={Link} to="/login" className="registerloginButton">Login</Button>
                </>
            )}

            <Footer />
        </div>
    )
}
