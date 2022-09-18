import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Card, Row, Col, Container } from 'react-bootstrap';

export default function Notifications(props) {


  var [categoryNames, setCategoryNames] = useState([]);
  var [budgetsArray, setBudgetsArray] = useState([]);
  var [datesArray, setDatesArray] = useState([]);


  useEffect(
    () => {
      //handleShowNotification();
    }
  )

  function getFullData(item) {
    return (
      <Row>
        <Col md={12} style={{'border-bottom': '1px solid red'}}>
          <p>Expense on <span class="badge rounded-pill text-bg-primary">{item.categoryName}</span>
          <br />has crossed the <br /> budget amount
          <span class="badge rounded-pill text-bg-danger"> Rs. {item.budgetAmount}</span> <br />
          on the date 
          <span class="badge rounded-pill text-bg-success">{item.date.toDateString()}</span></p>
        </Col>
      </Row>
    );
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Container fluid="md">
          {props.data && props.data.map(getFullData)}
        </Container>
      </Card.Body>
    </Card>
  )
}
