import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, Row, Col, Badge } from "reactstrap";

const Post = ({ post }) => {

  return (
      <Card className="mt-4">
        <Row xs="1" sm="1" md="2" lg="2">
          <Col>
            <CardImg src={post.imageLocation} alt={post.title} className="px-4 pt-4"/>
          </Col>
          <Col>
            <CardBody>
              <Row>
                <Col className="col-8">
                  <p className="text-left px-2">
                    Posted by: <Link to={`/users/${post.userProfileId}`}>{post.userProfile.fullName}</Link>
                  </p>
                </Col>
                <Col className="col-4">
                  <Badge className="float-end">{post.category.name}</Badge>
                </Col>
              </Row>
              <p className="text-left px-2">
                <Link to={`/posts/${post.id}`}>
                  <strong>{post.title}</strong>
                </Link>
              </p>
            </CardBody>
          </Col>
        </Row>
        <Row className="pt-5">
          <Col>
            <p className="text-left px-4">{post.content}</p>
          </Col>
        </Row>
      </Card>
  );
};

export default Post;