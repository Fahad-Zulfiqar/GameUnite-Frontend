import { useNavigate } from "react-router-dom";
import {
  Badge,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Image,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";

import { useState, useEffect } from "react";

import SearchBox from "../SearchBox";
import Account from "../Account";

import fire from "../../assets/Images/fire.gif";

import sound from "../../assets/Sound/mu1.mp3";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  function play() {
    new Audio(sound).play();
  }

  const [accounts, setAccounts] = useState([]);

  const connect = async () => {
    const a = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccounts(a);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      const a = await window.ethereum.request({ method: "eth_accounts" });
      setAccounts(a);
    };

    fetchAccounts();

    // window.ethereum.on("accountsChanged", (a) => {
    //   setAccounts(a);
    // });
  }, []);

  return (
    <header>
      <Navbar
        style={{
          backgroundColor: "#0F0C29",
          height: "80px",
        }}
        variant="dark"
        expand="xl"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <span onClick={play}>GameUnite</span>
              <Image
                src={fire}
                alt="fire logo"
                style={{
                  width: "32px",
                  marginLeft: "5px",
                  marginBottom: "8px",
                }}
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{
              backgroundColor: "#0F0C29",
              zIndex: "99",
              padding: "0 7px",
            }}
          >
            <Nav>
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/product">
                <Nav.Link>Product</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/blog">
                <Nav.Link>Blog</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contactUs">
                <Nav.Link>Contact Us</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <SearchBox />

              <LinkContainer to="/cart" style={{ marginTop: "8px" }}>
                <Nav.Link>
                  <FaShoppingCart /> Card
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  style={{ marginTop: "8px" }}
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/Setting">
                    <NavDropdown.Item>Setting</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login" style={{ marginTop: "8px" }}>
                  <Nav.Link href="/login">
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="adminMenu"
                  style={{ marginTop: "8px" }}
                >
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/bloglist">
                    <NavDropdown.Item>Blogs</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {userInfo && userInfo.isSeller && (
                <NavDropdown
                  title="Seller"
                  id="sellerMenu"
                  style={{ marginTop: "8px" }}
                >
                  <LinkContainer to="/seller/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/seller/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              <Nav.Link>
                <Account accounts={accounts} connect={connect} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
