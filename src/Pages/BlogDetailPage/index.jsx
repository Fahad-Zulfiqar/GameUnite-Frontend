import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Button,
  Container,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import Meta from "../../components/Meta/Meta";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

import {
  useGetBlogDetailsQuery,
  useCreateBlogReviewMutation,
} from "../../slices/blogsApiSlice";

import { toast } from "react-toastify";
import BlogContent from "../../components/BlogContent";

const BlogScreen = () => {
  const { id: blogId } = useParams();

  const [comment, setComment] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: blog,
    isLoading,
    error,
    refetch,
  } = useGetBlogDetailsQuery(blogId);

  // console.log(blog);

  const [createBlogReview, { isLoading: loadingBlogReview }] =
    useCreateBlogReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createBlogReview({
        blogId,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review submitted");
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Container>
        <Link to="/blog" className="btn btn-light my-3">
          Go Back
        </Link>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data.message || error.error}
          </Message>
        ) : (
          <>
            <Meta title={blog.name} />
            <Row>
              <Col md={12}>
                <Image src={blog.image} alt={blog.name} fluid />
              </Col>
              <Col md={12}>
                <ListGroup variant="flush">
                  <ListGroup.Item bg="center">
                    <h3>{blog.name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Description: <BlogContent content={blog.description} />
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row className="review">
              <Col md={6}>
                <h2>Comments</h2>
                {blog.reviews.length === 0 && <Message>No Comments</Message>}
                <ListGroup variant="flush">
                  {blog.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong style={{ color: "#000" }}>{review.name}</strong>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2 style={{ color: "#000" }}>Write a Comment</h2>

                    {loadingBlogReview && <Loader />}

                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group className="my-2" controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingBlogReview}
                          type="submit"
                          variant="primary"
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">sign in</Link> to write a
                        review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default BlogScreen;
