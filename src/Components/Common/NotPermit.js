import React from "react";
import { Card } from "react-bootstrap";

const NotPermit = () => {
  return (
    <div className="d-flex justify-content-center mt-4">
      <Card className="text-center" style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title>Access denied</Card.Title>
          <Card.Text>
            You don't have a permission to access this page.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NotPermit;
