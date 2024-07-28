import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";

// import Paginate from "../../../components/Paginate";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
import {
  useGetBlogQuery,
  useCreateBlogsMutation,
  useDeleteBlogMutation,
} from "../../../slices/blogsApiSlice";

const BlogListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetBlogQuery({
    pageNumber,
  });

  // console.log(products);
  const [createBlogs, { isLoading: loadingCreate }] = useCreateBlogsMutation();

  const [deleteBlog, { isLoading: loadingDelete }] = useDeleteBlogMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteBlog(id);
        refetch();
        toast.success("Blog deleted successfully");
      } catch (err) {
        console.error("Delete error:", err); // Log the error for debugging
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new Blog?")) {
      try {
        await createBlogs();
        refetch();
        toast.success("Blog created successfully");
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
            <h1>Blogs</h1>
          </Col>
          <Col className="text-end">
            <Button className="btn-sm m-3" onClick={createProductHandler}>
              <FaEdit /> Create Blog
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
                  <th>CATEGORY</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>{blog._id}</td>
                    <td>{blog.name}</td>
                    <td>{blog.category}</td>
                    <td>
                      <LinkContainer to={`/admin/blog/${blog._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(blog._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* <Paginate
              pages={data.pages}
              page={data.page}
              isAdmin={true}
              className="pagination"
            /> */}
          </>
        )}
      </Container>
    </>
  );
};

export default BlogListScreen;
