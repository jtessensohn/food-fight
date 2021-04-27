import React from 'react'
import { Form, Col, Button, Card } from 'react-bootstrap'
import { useState } from 'react';
import Navigation from '../components/Navigation';
import '../css/restaurant.css'
import Footer from '../components/Footer';


export default function Restaurants() {
  // make a hook
  const [restaurantForm, setRestaurantForm] = useState({
    name: '',
    category: '',
  });

  // create a handle submit for the button
  const handleSubmit = (e) => {
    //fetch the post route.
    e.preventDefault();
    fetch('api/v1/restaurants', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: restaurantForm.name,
        category: restaurantForm.category,
      }),
    })
  }
  // create an handle Change for the fields.(don't forget your value's and names)
  const handleChange = (e) => {
    setRestaurantForm({
      ...restaurantForm,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div>
      <Navigation />
      {/* // attach handle submit to form */}
      <Form onSubmit={handleSubmit} className="">
        <Card className="restaurantCard col-6 m-5 p-5 shadow-lg p-3 mb-5 bg-dark rounded mx-auto">
          {/* <Card.Img url="../images/restaurant.jpg" alt="Card image" />
          <Card.ImgOverlay> */}
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail" className="col-4 mx-auto">
                <Form.Label className="text-white">Restaurant Name</Form.Label>
                <Form.Control onChange={handleChange} value={restaurantForm.name} name='name' type="text" placeholder="Enter Restaurant" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formGridAddress2" className="col-4 mx-auto">
                <Form.Label className="text-white">Category</Form.Label>
                <Form.Control onChange={handleChange}value={restaurantForm.category} name='category' placeholder="Category" />
              </Form.Group>
            </Form.Row>
            {/* <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword" className="col-4 mx-auto">
              <Form.Label className="text-white">Zip Code</Form.Label>
              <Form.Control type="number" placeholder="Zip Code" />
              </Form.Group>
            </Form.Row> */}

            {/* // does your button have a submit type? */}
            <Button variant="primary" type="submit" className="col-3 mx-auto">
              Submit
            </Button>
          {/* </Card.ImgOverlay> */}
        </Card>
      </Form>
      <Footer />
    </div>
  )
}
