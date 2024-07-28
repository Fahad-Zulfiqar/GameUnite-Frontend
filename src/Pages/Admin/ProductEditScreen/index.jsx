import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import FormContainer from "../../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateGenreMutation,
  useUploadGenreImageMutation,
} from "../../../slices/productsApiSlice.js";

import JoditEditor from "jodit-react";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateGenreMutation();

  const [uploadGenreImage, { isLoading: loadingUpload }] =
    useUploadGenreImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      // setDescription(product.description);
      setContent(product.description);
      setImage(product.image);
      setPlatform(product.platform);
      setCategory(product.category);
      setCountInStock(product.countInStock);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const updatedProduct = {
        productId,
        name,
        price,
        description: content,
        image,
        platform,
        category,
        countInStock,
      };

      const result = await updateProduct(updatedProduct);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Product updated");
        navigate("/admin/productlist");
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
      const res = await uploadGenreImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Container>
        <Link to="/admin/productlist" className="btn btn-light my-3">
          Go Back
        </Link>
        <FormContainer>
          <h1>Edit Genre</h1>
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

              <Form.Group controlId="price" className="my-2">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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

              <Form.Group controlId="platform" className="my-2">
                <Form.Label>Platform</Form.Label>
                <Form.Control
                  as="select"
                  // type="text"
                  // placeholder="Enter Platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  <option value="PC">PC</option>
                  <option value="Mobile">Mobile</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="countInStock" className="my-2">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter countInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
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

export default ProductEditScreen;
