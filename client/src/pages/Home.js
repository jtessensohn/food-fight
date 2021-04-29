
import logov2 from '../images/logov2.png'
import '../css/Homepage.css'
import { Button, Card, Carousel, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import carousel1 from '../images/carousel1.png'
import carousel2 from '../images/carousel2.png'
import carousel3 from '../images/carousel3.png'
import '../css/carousel.css'
import Search from '../components/Search';
// import Footer from '../components/Footer';

export default function Home() {
    const user = useSelector((state) => state.user);
    const theme = useSelector((state) => state.theme);

    return (
        <div>
            <Row className={`firstRow homePageCardBody ${theme === "light" ? "homePageCardBody" : "homePageCardBodyDark"}`}>
                <div className="col-6 my-auto mx-auto">
                    <Card className={`homePageCard ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}>
                        <Card.Body>
                            <Card.Title>Welcome to Food Fight!</Card.Title>
                            <Card.Text>
                                Consider this: it's nearing lunch time and someone proposes that the office get lunch together. A well-meaning proposal, but deep down everyone knows what's about to happen. <br />
                                What would be an innocent and civil discussion about where to grub-down, sides are taken instead, hurtful remarks from all sides, and worst of all, lunch is somehow almost over. <br />
                                Skip the bickering, skip the HR complaints, and let's get this Food Fight started.
                            </Card.Text>
                            {/* <Card.Text>
                                Tired of Jim always choosing lunch?  <br />Does Sally always know the best foods…but not really?<br />
                                Let’s fight about it!  Who ever said fights have to be bad? <br /> Here on Food Fight,You now have just as much say in as Jim or sally on what you get to eat for lunch<br />
                                we make it fun to go into battle for YOUR choice in restaurants. <br /> You now have just as much say in as Jim or sally on what you get to eat for lunch
                            </Card.Text> */}
                        </Card.Body>
                    </Card>
                </div>


                <div className="col-6 m-auto">
                    <img className="logo py-0" src={logov2} alt='Food-fight-logo.png'></img>
                </div>
            </Row>

            <Row className={`secondRow homePageCardBody ${theme === "light" ? "homePageCardBody" : "homePageCardBodyDark"}`}>
                <div className="col-6 mx-auto my-auto">
                    {user ? (
                        <div className="col-12">
                            <Carousel className={`carouselContainer ${theme === "light" ? "text-dark" : "text-light"}`}>
                                <Carousel.Item >
                                    <img
                                        className="mx-auto carouselImg"
                                        src={carousel1}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item >
                                    <img
                                        className="mx-auto carouselImg"
                                        src={carousel2}
                                        alt="Second slide"
                                    />

                                    <Carousel.Caption>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item >
                                    <img
                                        className="mx-auto carouselImg"
                                        src={carousel3}
                                        alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    ) : (

                        <div className="col-12 my-auto mx-auto">
                            <Card className="homePageCard">
                                <Card.Body>
                                    <Card.Title>
                                        Lookin' for a fight? Register or log in below:
                                    </Card.Title>
                                    <Card.Text>
                                        <Button className="registerloginButton" as={Link} to="/register" >Register</Button>
                                        <Button as={Link} to="/login" className="registerloginButton">Login</Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    )}
                </div>


                <div className="col-6 my-auto mx-auto">
                    <Card className={`homePageCard ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}>
                        <Card.Body>
                            <Card.Title>How to let your food fight for you!</Card.Title>
                            <Card.Text>
                                Step 1: Create or search for a team.<br />
                                Step 2: Add your favorite restaurants <Link to="/restaurants">here.</Link><br />
                                Step 3: Have your voice heard and eat where you want to eat and not where Jim says everyday!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Row>


            {user ? (
                <>
                    <Search />
                </>
            ) : (
                <div className="col-0">

                </div>
            )}
            {/* <Footer /> */}
        </div>
    )
}
