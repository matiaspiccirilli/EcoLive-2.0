import React, { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  changePage,
  getProductsByName,
} from "../../redux/action/actions";
import NavBar from "../navBar/NavBar";
import FilterAndOrder from "../filterAndOrder/FilterAndOrder";
import PromotionPopup from "../promotionPopup/PromotionPopup";
import Cards from "../cards/Cards";
import styles from "./landingPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "react-bootstrap";
import Footer from "../Footer/Footer";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import image5 from "../../assets/image5.png";

import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const LandingPage = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products?.data);
  const [products, setProducts] = useState([]);
  const isUser = useSelector((state) => state.isUser);
  const currentPage = useSelector((state)=> state.products.currentPage)
  const numMaxPages = useSelector((state)=> Math.ceil((state.products?.allProducts.length)/12))
  const numMaxPagesFil = useSelector((state)=> Math.ceil((state.products?.productsFiltered.length)/12))
  const [navBarHeight, setNavBarHeight] = useState(0);
  const [shouldRenderPromotionPopup, setShouldRenderPromotionPopup] =
    useState(false);
  const { isAuthenticated, loginWithRedirect, AuthenticationError } =
    useAuth0();

  const onSearch = (name) => {
    dispatch(getProductsByName(name));
  };

  useEffect(() => {
    if (isUser === "Admin") {
      setShouldRenderPromotionPopup(false);
    } else {
      setShouldRenderPromotionPopup(true);
    }
  }, [isUser]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    const errorDescription = urlParams.get("error_description");

    if (error && errorDescription) {
      toast.warn(`Please verify your email and Try to Login Again`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // theme: "light",

      });
    }
  }, []);



  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    // Filtrar productos activos después de obtenerlos
    if (allProducts) {
      let filteredProducts = allProducts.filter(
        
        (product) => product.active === true && product.stock > 0
      );
      setProducts(filteredProducts);
    }
  }, [allProducts]);

  const [filterCond, setFilterCond] = useState({
    type: "all",
    price: "all",
    order: "ascendent",
  });
  const [aux, setAux] = useState(false);

  const pagination = (event) => {
    dispatch(changePage(event.target.name));
  };

  const reset = (event) => {
    dispatch(getAllProducts());
    const selectElements = document.querySelectorAll("select");
    selectElements.forEach((select) => {
      select.value = "all";
    });
  };
  const handleNavBarHeightChange = (height) => {
    setNavBarHeight(height);
  };

  return (
    <div className={styles.container}>

      <NavBar
        onSearch={onSearch}
        setFilterCond={setFilterCond}
        filterCond={filterCond}
        setAux={setAux}
        aux={aux}
        onNavBarHeightChange={handleNavBarHeightChange}
      />

      <Carousel style={{ marginTop: `${navBarHeight}px` }}>
      </Carousel>

      <FilterAndOrder
        setFilterCond={setFilterCond}
        filterCond={filterCond}
        setAux={setAux}
      />

      <div className="pagination justify-content-center">
        <button
          type="button"
          className="form-control"
          style={{
            width: "50px",
            textAlign: "center",
            marginTop: "5px",
            height: "37.6px",
          }}
          onClick={reset}
        >
          <FontAwesomeIcon icon={faArrowsRotate} />
        </button>
      </div>

      <Cards products={products} />

      <nav aria-label="Page navigation example" style={{ marginTop: "22px" }}>
        <ul className="pagination justify-content-center">
        {numMaxPagesFil === 0 ? (
  <>
    <li className="page-item">
      <a
        className="page-link"
        onClick={pagination}
        name="prev"
        style={{
          cursor: currentPage === 0 ? "default" : "pointer",
          color: currentPage === 0 ? "gray" : "",
        }}
      >
        {"<<"} Previous
      </a>
    </li>
    <li
      className="page-item"
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      {Array.from({ length: numMaxPages }, (_, index) => (
        <div key={index} style={{ margin: "0 5px" }}>
          <label
            key={index}
            className={`page-link ${index === currentPage ? "active" : ""}`}
          >
            {index + 1}
          </label>
        </div>
      ))}
    </li>
    <li className="page-item">
      <a
        className="page-link"
        onClick={pagination}
        name="next"
        style={{
          cursor: currentPage === numMaxPages - 1 ? "default" : "pointer",
          color: currentPage === numMaxPages - 1 ? "gray" : "",
        }}
      >
        Next {">>"}
      </a>
    </li>
  </>
) : (
  <>
    <li className="page-item">
      <a
        className="page-link"
        onClick={pagination}
        name="prev"
        style={{
          cursor: currentPage === 0 ? "default" : "pointer",
          color: currentPage === 0 ? "gray" : "",
        }}
      >
        {"<<"} Previous
      </a>
    </li>
    <li
      className="page-item"
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      {Array.from({ length: numMaxPagesFil }, (_, index) => (
        <div key={index} style={{ margin: "0 5px" }}>
          <label
            key={index}
            className={`page-link ${index === currentPage ? "active" : ""}`}
          >
            {index + 1}
          </label>
        </div>
      ))}
    </li>
    <li className="page-item">
      <a
        className="page-link"
        onClick={pagination}
        name="next"
        style={{
          cursor: currentPage === numMaxPagesFil - 1 ? "default" : "pointer",
          color: currentPage === numMaxPagesFil - 1 ? "gray" : "",
        }}
      >
        Next {">>"}
      </a>
    </li>
  </>
)}
        </ul>
      </nav>
      <Footer />
    </div>
  );
};

export default LandingPage;
