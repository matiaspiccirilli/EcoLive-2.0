import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {
  GETALLPRODUCTS,
  GETUSERS,
  GETUSERBYID,
  GETPRODBYID,
  DELETEUSER,
  GETPRODCATEGORIES,
  GETPRODUCTBYNAME,
  CREATEPRODUCT,
  UPDATEPRODUCT,
  DELETEPRODUCT,
  PAGINATION,
  ORDERPRICE,
  ORDERNAME,
  FILTER,
  ERROR,
  POPUPINITIAL,
  CLEANSINGLEPROD,
  ADDTOCART,
  REMOVEALLCART,
  REMOVEONECART,
  INCREASEQUANTITY,
  DECREASEQUANTITY,
  CLEANSEARCHBAR,
  NAMESEARCH,
  TYPEUSER,
  LOGOUT,
  GENERATEUSER,
  UPDATEUSER,
  COUNTRY,
  POPUTSPROMOTIONS,
  GETALLCOUNTRIES,
  SETPAGEADMIN,
  GETORDERS,
  GETORDERSBYUSERID,
  GET_ALL_ORDERS,
  FILTER_ORDER_NAME_PURCHASE,
  UPDATE_ORDER_STATUS,
} from "../action/actionsType";

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/users`, user);
      dispatch({
        type: UPDATEUSER,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

// GET PARA TRAER PRODUCTOS, de momento se esta usando el que cree en el archivo data.js luego deberiamos de descomentar y modificar lo necesario
export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/products`);
      dispatch({
        type: GETALLPRODUCTS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const getProdCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/categories`);
      dispatch({
        type: GETPRODCATEGORIES,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};
export const getProductsByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/products/name?name=${name}`);
      dispatch({
        type: GETPRODUCTBYNAME,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/products`, product);
      dispatch({
        type: CREATEPRODUCT,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/products`, product);
      dispatch({
        type: UPDATEPRODUCT,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const getProductsById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/products/${id}`);
      dispatch({
        type: GETPRODBYID,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const cleanSingleProd = () => {
  return { type: CLEANSINGLEPROD, payload: "" };
};
export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/products`, {
        data: { id },
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: DELETEPRODUCT,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/users");
    dispatch({
      type: GETUSERS,
      payload: data,
    });
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/users/${id}`);
      dispatch({
        type: GETUSERBYID,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/users/${id}`);
      dispatch({
        type: DELETEUSER,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const orderPrice = (order) => {
  return { type: ORDERPRICE, payload: order };
};

export const orderName = (order) => {
  return { type: ORDERNAME, payload: order };
};

export const changePage = (order) => {
  return { type: PAGINATION, payload: order };
};

export const filter = (cond) => {
  console.log('Conditions filter:');
  console.log(cond);
  return async (dispatch) => {
    return dispatch({
      type: FILTER,
      payload: cond,
    });
  };
};
export const showThePopup = (bol) => {
  return async (dispatch) => {
    return dispatch({
      type: POPUPINITIAL,
      payload: bol,
    });
  };
};

export const resetError = () => {
  return {
    type: ERROR,
    payload: "",
  };
};

export const addToCart = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`products/${id}`);
      dispatch({
        type: ADDTOCART,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const removeOneCart = (id, all = false) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REMOVEONECART, payload: id });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const increaseQuantity = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: INCREASEQUANTITY, payload: id });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const decreaseQuantity = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DECREASEQUANTITY, payload: id });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const createUser = (email, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/users/create`,
        { email, token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: GENERATEUSER,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const getCountry = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`country/id?id=${id}`);
      dispatch({
        type: COUNTRY,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const typeUser = (typeUser) => {
  return (dispatch) => {
    dispatch({
      type: TYPEUSER,
      payload: typeUser,
    });
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
      payload: "",
    });
  };
};

export const getAllCountries = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/country");
      dispatch({
        type: GETALLCOUNTRIES,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const cleanSearchBar = () => {
  return {
    type: CLEANSEARCHBAR,
    payload: [],
  };
};
export const setNameSearch = (nameSearch) => {
  return {
    type: NAMESEARCH,
    payload: nameSearch,
  };
};

export const getPromotions = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/products`);
    dispatch({ type: "POPUTSPROMOTIONS", payload: data });
  } catch (error) {
    console.error("Error fetching promotions:", error);
  }
};

export const setPageAdmin = (pageAdmin) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SETPAGEADMIN, payload: pageAdmin });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/order/history`);
    dispatch({ type: GETORDERS, payload: data });
  } catch (error) {
    console.error("Error fetching promotions:", error);
  }
};

export const getOrdersByUserId = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/order/${id}`);
    dispatch({
      type: GETORDERSBYUSERID,
      payload: data,
    });
  };
};

export const allOrders = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/order/history`);
      dispatch({
        type: GET_ALL_ORDERS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};
export const filterOrderPurchase = (nameSearch) => {
  return {
    type: FILTER_ORDER_NAME_PURCHASE,
    payload: nameSearch,
  };
}

export const updateOrderStatus = (orderId, newStatus) => {
  return async (dispatch) => {
    try {
      const response = await axios.put('/order/update', {
        idOrder: orderId,
        statusDelivery: newStatus
      });
      dispatch({
        type: UPDATE_ORDER_STATUS,
        payload: response.data  // Esto puede variar según la estructura de tu respuesta
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message
      });
    }
  };
};