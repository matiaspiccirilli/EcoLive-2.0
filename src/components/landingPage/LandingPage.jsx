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

const LandingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.data);
  const isUser = useSelector((state) => state.isUser)
  const [shouldRenderPromotionPopup, setShouldRenderPromotionPopup] = useState(false);
  const onSearch = (name) => {
    dispatch(getProductsByName(name));
  };


  useEffect(() => {
    if (isUser === "Admin") {
      setShouldRenderPromotionPopup(false);
    } else {
      setShouldRenderPromotionPopup(true)
    }
  }, [isUser]);



  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  
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

  return (
    <div className={styles.container}>

       
{shouldRenderPromotionPopup && <PromotionPopup />}

<Carousel style={{marginTop:"55px"}}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.fravega.com/f300/097a440178590fd98040afa5aea7ce48.jpg" 
            alt="First slide"
            style={{ maxWidth: "100%", height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.fravega.com/f300/a0ee87234cb6af25219a71973dd76de4.jpg" 
            alt="Second slide"
            style={{ maxWidth: "100%", height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://jugueteriascarrousel.com.ar/wp-content/uploads/2023/06/Recurso-5.webp" 
            alt="Third slide"
            style={{ maxWidth: "100%", height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://jugueteriascarrousel.com.ar/wp-content/uploads/2023/07/bannersok-bancos.jpg" 
            alt="Quarter slide"
            style={{ maxWidth: "100%", height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://senseiar.vteximg.com.br/arquivos/ids/160651/banner%20COTIZACION.png?v=638042853101730000" 
            alt="Fifth slide"
            style={{ maxWidth: "100%", height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.shutterstock.com/image-vector/christmas-sale-decorative-banner-template-600nw-2183237921.jpg" 
            alt="Fifth slide"
            style={{ maxWidth: "100%", height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
      </Carousel>
      

      <NavBar
          onSearch={onSearch}
          setFilterCond={setFilterCond}
          filterCond={filterCond}
          setAux={setAux}
          aux={aux}
        />

      <FilterAndOrder
          setFilterCond={setFilterCond}
          filterCond={filterCond}
          setAux={setAux}
        />


      <div className="pagination justify-content-center">
        <button 
          type="button" 
          className="form-control" 
          style={{ width: '50px', textAlign:"center", marginTop:"5px", height:"37.6px"}}
          onClick={reset}
        >
        <FontAwesomeIcon icon={faArrowsRotate} />
        </button>
      </div>

      <Cards products={products}/>

      <nav aria-label="Page navigation example" style={{ marginTop: "22px" }}>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a
              className="page-link"
              onClick={pagination}
              name="prev"
              style={{ cursor: "default" }}
            >
              {"<<"} Previous
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link"
              onClick={pagination}
              name="next"
              style={{ cursor: "default" }}
            >
              Next {">>"}
            </a>
          </li>
        </ul>
      </nav>
      <Footer />
    </div>
  );
};

export default LandingPage;