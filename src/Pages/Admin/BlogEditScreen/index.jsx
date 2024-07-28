import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import FormContainer from "../../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetBlogDetailsQuery,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
} from "../../../slices/blogsApiSlice";
import JoditEditor from "jodit-react";

const BlogEditScreen = () => {
  const { id: blogId } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  // const [description, setDescription] = useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const {
    data: blog,
    isLoading,
    error,
    refetch,
  } = useGetBlogDetailsQuery(blogId);

  const [updateBlog, { isLoading: loadingUpdate }] = useUpdateBlogMutation();

  const [uploadBlogImage, { isLoading: loadingUpload }] =
    useUploadBlogImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (blog) {
      setName(blog.name);

      // setDescription(blog.description);
      setContent(blog.description);
      setImage(blog.image);

      setCategory(blog.category);
    }
  }, [blog]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const updateBlogs = {
        blogId,
        name,

        description: content,
        image,

        category,
      };

      const result = await updateBlog(updateBlogs);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Blog updated");
        navigate("/admin/bloglist");
        refetch(); // Refetch product details to ensure it's up-to-date
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadBlogImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Container>
        <Link to="/admin/bloglist" className="btn btn-light my-3">
          Go Back
        </Link>
        <FormContainer>
          <h1>Edit Blog</h1>
          {loadingUpdate && <Loader />}

          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="image" className="my-2">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.Control
                  label="Choose File"
                  onChange={uploadFileHandler}
                  type="file"
                ></Form.Control>
                {loadingUpload && <Loader />}
              </Form.Group>

              {/* <Form.Group controlId="category" className="my-2">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group> */}

              <Form.Group controlId="category" className="my-2">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Shooter">Shooter</option>
                  <option value="Family">Family</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="description" className="my-2">
                <Form.Label>Description</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                /> */}
                <JoditEditor
                  ref={editor}
                  value={content}
                  onChange={(newContent) => setContent(newContent)}
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="my-2">
                Update
              </Button>
            </Form>
          )}
        </FormContainer>
      </Container>
    </>
  );
};

export default BlogEditScreen;
