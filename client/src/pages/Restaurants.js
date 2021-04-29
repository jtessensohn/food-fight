import React from 'react'
import { Form, Col, Button, Card } from 'react-bootstrap'
import { useState } from 'react';
import '../css/restaurant.css'


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
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
          setRestaurantForm({
            name: '',
            category: ''
          })
        } else {
          alert(`Restaurant ${data.name} created. Get ready to fight`)
          setRestaurantForm({
            name: '',
            category: ''
          })
        }
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
      {/* // attach handle submit to form */}
      <Form onSubmit={handleSubmit} className="">
        <Card className="restaurantCard col-10 p-5 p-3 pb-5 bg-dark mx-auto">
          {/* <Card.Img url="../images/restaurant.jpg" alt="Card image" />
          <Card.ImgOverlay> */}
          <Card className="innerRestaurantCard col-10 p-5 mx-auto">
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail" className="col-12 mx-auto">
                <Form.Label className="">Restaurant Name</Form.Label>
                <Form.Control onChange={handleChange} value={restaurantForm.name} name='name' type="text" placeholder="Enter Restaurant" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formGridAddress2" className="col-12 mx-auto">
                <Form.Label className="">Category</Form.Label>
                <Form.Control onChange={handleChange} value={restaurantForm.category} name='category' placeholder="Category" />
              </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit" className="col-3 mx-auto">
              Submit
            </Button>
          </Card>
          {/* <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword" className="col-4 mx-auto">
              <Form.Label className="text-white">Zip Code</Form.Label>
              <Form.Control type="number" placeholder="Zip Code" />
              </Form.Group>
            </Form.Row> */}

          {/* // does your button have a submit type? */}
          {/* </Card.ImgOverlay> */}
        </Card>
      </Form>
      <Card className="innerRestaurantCard col-10 p-5 bg-dark mx-auto">
        <Card.Title className="text-white">What am I looking at?</Card.Title>
        <Card.Body className="text-white">
          While we can't all agree on what to eat, we can certainly agree that restaurants exist.
          The form above will allow you to submit your favorite restaurant to our database,
          giving it a fighting chance to be what you eat.
        </Card.Body>
      </Card>
      <br />
    </div>
  )
}
