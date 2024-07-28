import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";

import Paginate from "../../../components/Paginate";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux"; // Importing useSelector
import {
  useGetProductsQuery,
  useCreateGenreMutation,
  useDeleteGenreMutation,
} from "../../../slices/productsApiSlice";

const SproductListScreen = () => {
  const { pageNumber } = useParams();
  const { userInfo } = useSelector((state) => state.auth); // Accessing userInfo from Redux state

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  // Filter products to show only products created by the logged-in seller
  const sellerProducts = data?.products.filter(
    (product) => product.user._id === userInfo._id
  );

  const [createGenre, { isLoading: loadingCreate }] = useCreateGenreMutation();

  const [deleteGenre, { isLoading: loadingDelete }] = useDeleteGenreMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteGenre(id);
        refetch();
        toast.success("Product deleted successfully");
      } catch (err) {
        console.error("Delete error:", err);
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
              {sellerProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/seller/product/${product._id}/edit`}>
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
            isSeller={true}
            keyword=""
            className="pagination"
          />
        </>
      )}
    </>
  );
};

export default SproductListScreen;
