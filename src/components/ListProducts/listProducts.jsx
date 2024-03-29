import React from "react";
import styles from "./listProducts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import FilterAndOrder from "../filterAndOrder/FilterAndOrder";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import {
  getAllProducts,
  changePage,
  increaseStock,
  decreaseStock,
  deleteProduct,
  updateProduct,
} from "../../redux/action/actions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../cards/Cards";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorView from "../error404/Error404";
import PopupConfirmation from "../popupConfirmation/PopupConfirmation";
import { setPageAdmin } from "../../redux/action/actions";

export default function ListProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useAuth0();
  const isUser = useSelector((state) => state.isUser);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const products = useSelector((state) => state.products?.data);
  const [dateProductDelet, setDateProductDelete] = useState({id: "", name: ""})    
  const currentPage = useSelector((state)=> state.products.currentPage)
    const numMaxPages = useSelector((state)=> Math.ceil((state.products?.allProducts.length)/12))
    const numMaxPagesFil = useSelector((state)=> Math.ceil((state.products?.productsFiltered.length)/12))

  const [filterCond, setFilterCond] = useState({
    type: "all",
    price: "all",
    order: "ascendent",
  });
  const [aux, setAux] = useState(false);
  const [prev, setPrev] = useState(true);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

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

  const handleCancel = () => {
    navigate(-1);
  };

  const handlePreview = () => {
    setPrev(false);
  };

  const handleClosePrev = () => {
    setPrev(true);
  };

  const IncreaseSTOCK = (id, stock) => {
    const stockup = stock + 1;
    dispatch(increaseStock(id, stockup));
  };

  const DecreaseSTOCK = (id, stock) => {
    const stockdown = stock - 1;
    dispatch(decreaseStock(id, stockdown));
  };

  const DeletePRODUCT = async () => {
    console.log("Envio el dispatch");
    console.log(dateProductDelet.id);
    await dispatch(deleteProduct(dateProductDelet.id));
    dispatch(getAllProducts());
    setShowConfirmation(false);
  };

  const handleConfirmationClose = () => {
    console.log("Cierro el popup");
    setShowConfirmation(false);
    dispatch(setPageAdmin("products"));
  };

  const openPopupConfirmation = (id, name) => {
    console.log(id, name);
    setDateProductDelete({ id, name });
    setShowConfirmation(true);
  }
  const handleActive = (value) => {
    value === null ? product.active : value;
  };

  
  if (
    !isLoading &&
    ((!isAuthenticated && isUser !== "Admin") || isUser === "User")
  ) {
    return (
      <div>
        <ErrorView />
      </div>
    );
  }
  return (
    !isLoading && (
      <div>
        <h5 style={{ marginBottom: "-55px" }}>List of Products:</h5>

        <div style={{ height: "60px" }}></div>
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

        {prev ? (
          <div>
            <div style={{ "text-align": "right" }}>
              <button
                style={{
                  color: "white",
                  padding: "10px 15px",
                  border: "none",
                  cursor: "pointer",
                  "border-radius": "5px",
                  "background-color": "limegreen",
                }}
                onClick={handlePreview}
              >
                Preview User View
              </button>
            </div>

            <table className="table table-hover" style={{ marginTop: "10px" }}>
              <thead>
                <tr>
                  <th className={styles.th} scope="col">
                    Image
                  </th>
                  <th className={styles.th} scope="col">
                    Name
                  </th>
                  <th className={styles.th} scope="col">
                    Category
                  </th>
                  <th className={styles.th} scope="col">
                    Price
                  </th>
                  <th className={styles.th} scope="col">
                    Stock
                  </th>
                  <th className={styles.th} scope="col">
                    Status
                  </th>
                  <th className={styles.th} scope="col">
                    Update
                  </th>
                  <th className={styles.th} scope="col">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className={styles.td}>
                      <img
                        className={styles.td}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                        }}
                        src={product.image[0]}
                        alt={product.nameProd}
                      />
                    </td>
                    <td className={styles.td}>{product.nameProd}</td>
                    <td className={styles.td}>{product.category}</td>
                    <td className={styles.td}>${product.price}</td>
                    <td className={styles.td}>
                      <div className="container">
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Botones de Suma y Resta"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              DecreaseSTOCK(product.id, product.stock)
                            }
                            className="btn btn-primary"
                            style={{ marginTop: "-6px" }}
                          >
                            -
                          </button>
                          <div
                            style={{
                              padding: "10px",
                              height: "1px",
                              marginTop: "-9px",
                            }}
                          >
                            <p>{product.stock}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              IncreaseSTOCK(product.id, product.stock)
                            }
                            className="btn btn-primary"
                            style={{ marginTop: "-6px" }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className={styles.td}>
                      {/*A PEDIDO DE DIEGO Z PUSE UN SELECT PARA EDITAR SU STATUS DESDE ACA, SI SE COMPLICA USAR SOLO EL UPDATE */}
                      {/*<Form.Select aria-label="Seleccionar ejemplo" className='form-select-sm'>
                                <option>Seleccionar...</option>*/}
                      <select
                        onChange={(e) =>
                          handleActive(e.target.value === "true" ? true : false)
                        }
                        value={product.active.toString()}
                        aria-label="Seleccionar ejemplo"
                        className="form-select-sm"
                        name=""
                        id=""
                      >
                        <option value={true}>Active</option>
                        <option value={false}>Disabled</option>
                      </select>
                      {/*</Form.Select>*/}
                    </td>
                    <td className={styles.td}>
                      <Link to={`/updateProduct/${product.id}`}>
                        <button className={styles.button}>
                          <FontAwesomeIcon
                            icon={faPencil}
                            style={{ color: "#badb43" }}
                          />
                        </button>
                      </Link>
                    </td>
                    <td className={styles.td}>
                      <button
                        onClick={() =>
                            openPopupConfirmation(product.id, product.nameProd)
                        }
                        className={styles.button}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "#dd3636" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div style={{ "text-align": "right" }}>
              <button
                style={{
                  color: "white",
                  padding: "10px 15px",
                  border: "none",
                  cursor: "pointer",
                  "border-radius": "5px",
                  "background-color": "orange",
                }}
                onClick={handleClosePrev}
              >
                Close User View
              </button>
            </div>
            <Cards products={products} />
          </div>
        )}

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
                </div>
    )
  );
}
