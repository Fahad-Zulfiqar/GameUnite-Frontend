import "./slider.css";
import { useState } from "react";
import { useUpdateUserMutation } from "../../../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { toast } from "react-toastify";

const Slider = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [updateUser] = useUpdateUserMutation();

  const [isSeller, setIsSeller] = useState("false");

  const handleBecomeSeller = async () => {
    if (!userInfo) {
      // Redirect user to login if not logged in
      navigate("/login");
      return;
    }

    try {
      // Optimistically update UI
      setIsSeller(true);

      // Call the updateUser mutation function with the user ID and updated isSeller property
      await updateUser({ userId: userInfo._id, isSeller: true });

      toast.success("congrats! you are now a seller. login again");

      console.log("User is now a seller!");
    } catch (error) {
      // Handle any errors here
      console.error("Error updating user:", error.message);

      // Revert UI update on error
      setIsSeller(false);
    }
  };
  return (
    <div className="slider__section" style={{ marginTop: "-20px" }}>
      <div className="slider__head">
        <div className="heading">
          <h1>Connect with gamers.</h1>
          <h1>Leading marketplace all around the world.</h1>
          <p>Secure trades and transactions.</p>
        </div>
        {!userInfo?.isSeller && !userInfo?.isAdmin && (
          <Nav.Link onClick={handleBecomeSeller} style={{ marginTop: "8px" }}>
            <button className="heading__btn">Become a Seller</button>
          </Nav.Link>
        )}
      </div>
    </div>
  );
};

export default Slider;
