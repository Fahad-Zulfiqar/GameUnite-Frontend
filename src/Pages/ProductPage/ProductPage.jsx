import { useState, useEffect } from "react";
import { Row, Col, Dropdown, Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

import Product from "../../components/Products/Products";
import Paginate from "../../components/Paginate";
import Meta from "../../components/Meta/Meta";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ProductSlider from "../../components/ProductSlider";

import allGames from "../../assets/Images/All games.jpg";
import action from "../../assets/Images/Action.jpg";
import adventure from "../../assets/Images/Adventure.jpg";
import shooter from "../../assets/Images/Shooter.jpg";
import land from "../../assets/Images/Land.jpg";

import { useGetProductsQuery } from "../../slices/productsApiSlice";

import sound from "../../assets/Sound/arcade.wav";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const [filteredProducts, setFilteredProducts] = useState(
    data?.products || []
  );

  const [selectedCategory, setSelectedCategory] = useState([""]);
  const [selectedSort, setSelectedSort] = useState("latest");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  useEffect(() => {
    setFilteredProducts(data?.products || []);
  }, [data]);

  const filterGenres = (Genres) => {
    console.log("Filtering by genre:", Genres);
    console.log("Available products:", data?.products);

    if (Genres === "All games") {
      setFilteredProducts(data?.products || []);
    } else {
      const updateGenre =
        data?.products?.filter((product) =>
          product.category.includes(Genres)
        ) || [];
      console.log("Filtered products:", updateGenre);
      setFilteredProducts(updateGenre);
    }
    setSelectedCategory(Genres);
  };

  const sortProducts = (criteria) => {
    let sortedProducts = [...filteredProducts];

    switch (criteria) {
      case "latest":
        sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "lowest":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "highest":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "averageRating":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "atoz":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "ztoa":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
    setSelectedSort(criteria);
  };

  const filterPlatform = (platform) => {
    let platformFilteredProducts = [...(data?.products || [])];

    if (platform !== "all") {
      platformFilteredProducts = platformFilteredProducts.filter(
        (product) => product.platform === platform
      );
    }
    setFilteredProducts(platformFilteredProducts);
    setSelectedPlatform(platform);
  };

  function play() {
    new Audio(sound).play();
  }

  return (
    <Container>
      {!keyword ? (
        <ProductSlider />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data.message || error.error}</Message>
      ) : (
        <>
          <Meta title="Welcome to GameUnite" />

          <section id="sidebar">
            <div>
              <h3 className="p-1 border-bottom">Genres</h3>
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

          <Dropdown style={{ marginLeft: "245px", top: "38px" }}>
            <Dropdown.Toggle
              style={{ backgroundColor: "#0F0C29", border: "none" }}
            >
              Platform: {selectedPlatform === "all" ? "All" : selectedPlatform}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => filterPlatform("all")}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => filterPlatform("pc")}>
                PC
              </Dropdown.Item>
              <Dropdown.Item onClick={() => filterPlatform("mobile")}>
                Mobile
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown style={{ marginLeft: "405px", bottom: "10px" }}>
            <Dropdown.Toggle
              style={{ backgroundColor: "#0F0C29", border: "none" }}
            >
              Sort By:{" "}
              {selectedSort === "latest" ? "Latest Products" : selectedSort}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => sortProducts("latest")}>
                Latest Products
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortProducts("lowest")}>
                Lowest Price
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortProducts("highest")}>
                Highest Price
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortProducts("averageRating")}>
                Average Rating
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortProducts("atoz")}>
                Product A-Z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortProducts("ztoa")}>
                Product Z-A
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Row>
            {filteredProducts.map((product) => (
              <Col sm={12} md={6} lg={5} xl={4} key={product._id}>
                <Product product={product} />
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
