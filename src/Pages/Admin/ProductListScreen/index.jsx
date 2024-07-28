import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";

import Paginate from "../../../components/Paginate";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  useGetProductsQuery,
  useCreateGenreMutation,
  useDeleteGenreMutation,
} from "../../../slices/productsApiSlice";

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const { userInfo } = useSelector((state) => state.auth);

  const AdminProducts = data?.products.filter(
    (product) => product.user._id === userInfo._id
  );

  // console.log(products);
  const [createGenre, { isLoading: loadingCreate }] = useCreateGenreMutation();

  const [deleteGenre, { isLoading: loadingDelete }] = useDeleteGenreMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteGenre(id);
        refetch();
        toast.success("Product deleted successfully");
      } catch (err) {
        console.error("Delete error:", err); // Log the error for debugging
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createGenre();
        refetch();
        toast.success("Product created successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col>
            <h1>Products</h1>
          </Col>
          <Col className="text-end">
            <Button className="btn-sm m-3" onClick={createProductHandler}>
              <FaEdit /> Create Product
            </Button>
          </Col>
        </Row>
        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {AdminProducts.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate
              pages={data.pages}
              page={data.page}
              isAdmin={true}
              className="pagination"
            />
          </>
        )}
      </Container>
    </>
  );
};

export default ProductListScreen;
