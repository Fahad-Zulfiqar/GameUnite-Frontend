import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Blog from "../../components/Blogs/Blogs";
import Paginate from "../../components/Paginate";
import Meta from "../../components/Meta/Meta";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

import allGames from "../../assets/Images/All games.jpg";
import action from "../../assets/Images/Action.jpg";
import adventure from "../../assets/Images/Adventure.jpg";
import shooter from "../../assets/Images/Shooter.jpg";
import land from "../../assets/Images/Land.jpg";

import { useGetBlogQuery } from "../../slices/blogsApiSlice";

import sound from "../../assets/Sound/arcade.wav";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetBlogQuery({
    keyword,
    pageNumber,
  });
  const [filteredProducts, setFilteredProducts] = useState(data?.blogs || []);

  const [selectedCategory, setSelectedCategory] = useState("All Games Blog");

  useEffect(() => {
    setFilteredProducts(data?.blogs || []);
  }, [data]);

  const filterGenres = (Genres) => {
    if (Genres === "All games") {
      setFilteredProducts(data?.blogs || []);
    } else {
      const updateBlog =
        data?.blogs?.filter((blog) => blog.category.includes(Genres)) || [];
      setFilteredProducts(updateBlog);
    }
    setSelectedCategory(Genres);
  };

  function play() {
    new Audio(sound).play();
  }

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data.message || error.error}</Message>
      ) : (
        <>
          <Meta title="GameUnit || Blog" />

          <section id="sidebar">
            <div>
              <h3 className="p-1 border-bottom">Blogs</h3>
              <ul>
                <li onClick={() => filterGenres("All games")}>
                  <img
                    src={allGames}
                    className="img-genre"
                    alt="All Games"
                    onClick={play}
                  />
                  All Games
                </li>

                <li onClick={() => filterGenres("Action")}>
                  <img
                    src={action}
                    className="img-genre"
                    alt="Action"
                    onClick={play}
                  />
                  Action
                </li>
                <li onClick={() => filterGenres("Adventure")}>
                  <img
                    src={adventure}
                    className="img-genre"
                    alt="Adventure"
                    onClick={play}
                  />
                  Adventure
                </li>
                <li onClick={() => filterGenres("Shooter")}>
                  <img
                    src={shooter}
                    className="img-genre"
                    alt="Shooter"
                    onClick={play}
                  />
                  Shooter
                </li>
                <li onClick={() => filterGenres("Family")}>
                  <img
                    src={land}
                    className="img-genre"
                    alt="Family"
                    onClick={play}
                  />
                  Family
                </li>
              </ul>
            </div>
          </section>

          <h1 id="h1-Games">{selectedCategory}</h1>

          <Row>
            {filteredProducts.map((blog) => (
              <Col sm={12} md={6} lg={5} xl={4} key={blog._id}>
                <Blog blog={blog} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            className="pagination"
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </Container>
  );
};

export default HomeScreen;
