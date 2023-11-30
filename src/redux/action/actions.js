import axios from "axios";
import {
  GETALLPRODUCTS,
  GETUSERS,
  GETPRODBYID,
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
} from "../action/actionsType";

const URLEXAMPLE = "http://localhost:3001";

// GET PARA TRAER PRODUCTOS, de momento se esta usando el que cree en el archivo data.js luego deberiamos de descomentar y modificar lo necesario
export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URLEXAMPLE}/products`);

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
      const response = await axios.get(`${URLEXAMPLE}/categories`);
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
      const response = await axios.get(
        `${URLEXAMPLE}/products/name?name=${name}`
      );
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
      const response = await axios.post(`${URLEXAMPLE}/products`, product);
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
      const response = await axios.put(`${URLEXAMPLE}/products`, product);
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
      const response = await axios.get(`${URLEXAMPLE}/products/${id}`);
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

export const cleanSingleProd =()=>{
  return { type: CLEANSINGLEPROD, payload: "" };
}
export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URLEXAMPLE}/products`, {
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
  return async function (dispatch) {
    const apiData = await axios.get("");
    const users = apiData.data;
    dispatch({ type: GETUSERS, payload: users });
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

export const filter = (cond, name) => {
  return async (dispatch) => {
    cond.name = name.toLowerCase();
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

export const resetError=()=>{
  return { 
      type: ERROR, 
      payload: ''
      }
    }

  export const addToCart = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${URLEXAMPLE}/products/${id}`);
        dispatch({
          type: ADDTOCART,
          payload: response.data,
        })
      } catch (error) {
        dispatch({
          type: ERROR,
          payload: error.message,
        });
      }
    };
};

export const removeOneCart = (id, all=false) => {
  return async (dispatch) => {
  try {
  dispatch({type: REMOVEONECART, payload: id
  })} 
  catch (error) {
  dispatch({
    type: ERROR,
    payload: error.message,
  });
  }
  }
  }

  export const increaseQuantity = (id) => {
    return async (dispatch) => {
      try{
        dispatch({type: INCREASEQUANTITY, payload: id})
      }
      catch(error) {
        dispatch({
          type: ERROR,
          payload: error.message,
        })
      }
    }
  }

  export const decreaseQuantity = (id) => {
    return async (dispatch) => {
      try{
        dispatch({type: DECREASEQUANTITY, payload: id})
      }
      catch(error) {
        dispatch({
          type: ERROR,
          payload: error.message,
        })
      }
    }
  }
