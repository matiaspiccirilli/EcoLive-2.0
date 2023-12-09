import React, { useState } from "react";
import styles from "./orderDetailUserByIdPopup.module.css";
import { useSelector } from "react-redux";

const StarRating = ({ selectedStars, onSelectStar }) => {
  const totalStars = 5;

  return (
    <div>
      {Array.from({ length: totalStars }).map((_, index) => (
        <span
          key={index}
          className={index < selectedStars ? styles.selectedStar : styles.unselectedStar}
          onClick={() => onSelectStar(index + 1)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

const OrderDetailUserByIdPopup = ({ orderDetails, onClose, idUser }) => {
  const isUser = useSelector((state) => state.isUser);
  const [reviews, setReviews] = useState([]);
  const products = orderDetails
console.log(orderDetails);
  
  console.log(reviews);

  const sendReview = () => {
    const updatedReviews = reviews.map((review) => ({
      ...review,
      idUser: 4,
      email: "example@email.com"
    }));
  
    setReviews(updatedReviews);
    console.log("Sending review for product:", updatedReviews);
  };

  const existingReview = (productId) => {
    return reviews.find((review) => review.idProd === productId);
  };

  const handleStarRating = (productId, stars) => {
    const existing = existingReview(productId);

    if (existing) {
      const updatedReviews = reviews.map((review) =>
        review.idProd === productId ? { ...review, stars: stars } : review
      );
      setReviews(updatedReviews);
    } else {
      setReviews([...reviews, { idProd: productId, stars: stars }]);
    }
  };

  const handleComment = (productId, comment) => {
    const existing = existingReview(productId);

    if (existing) {
      const updatedReviews = reviews.map((review) =>
        review.idProd === productId ? { ...review, comment: comment } : review
      );
      setReviews(updatedReviews);
    } else {
      setReviews([...reviews, { idProd: productId, comment: comment }]);
    }
  };
  return (
    <div>
      {isUser === "Admin" ? (
        <div>
          <div className={styles.overlay}></div>
          <div className={styles.popup}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className={styles.th} scope="col">Id product</th>
                  <th className={styles.th} scope="col">Name product</th>
                  <th className={styles.th} scope="col">Price product</th>
                  <th className={styles.th} scope="col">Price on sale</th>
                  <th className={styles.th} scope="col">Stock</th>
                  <th className={styles.th} scope="col">Quantity</th>
                  <th className={styles.th} scope="col">Category</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(orderDetails) &&
                  products.map((product) => (
                    <tr key={product.id}>
                      <td className={styles.td}>{product?.id}</td>
                      <td className={styles.td}>{product?.nameProd}</td>
                      <td className={styles.td}>${parseFloat(product?.price).toFixed(2)}</td>
                      <td className={styles.td}>${parseFloat(product?.priceOnSale).toFixed(2)}</td>
                      <td className={styles.td}>{product?.stock}</td>
                      <td className={styles.td}>{product?.quantityProd}</td>
                      <td className={styles.td}>{product?.category}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.overlay}></div>
          <div className={styles.popup}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className={styles.th} scope="col">Product code</th>
                  <th className={styles.th} scope="col">Quantity</th>
                  <th className={styles.th} scope="col">Name product</th>
                  <th className={styles.th} scope="col">Price product</th>
                  <th className={styles.th} scope="col">Price on sale</th>
                  <th className={styles.th} scope="col">Category</th>
                  <th className={styles.th} scope="col">Review</th>
                  <th className={styles.th} scope="col">Comment</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(orderDetails) &&
                  orderDetails.map((product) => (
                    <React.Fragment key={product.id}>
                      <tr>
                        <td className={styles.td}>{product?.id}</td>
                        <td className={styles.td}>{product?.quantityProd}</td>
                        <td className={styles.td}>{product?.nameProd}</td>
                        <td className={styles.td}>${parseFloat(product?.price).toFixed(2)}</td>
                        <td className={styles.td}>${parseFloat(product?.priceOnSale).toFixed(2)}</td>
                        <td className={styles.td}>{product?.category}</td>
                        <td className={styles.td}>
                          <StarRating
                            selectedStars={existingReview(product.id)?.stars || 0}
                            onSelectStar={(stars) => handleStarRating(product.id, stars)}
                            />
                        </td>
                        <td>
                        <input
                  type="text"
                  value={existingReview(product.id)?.comment || ''}
                  onChange={(e) => handleComment(product.id, e.target.value)}
                />
            </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
            <button onClick={onClose}>Close</button>
            <button onClick={sendReview}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailUserByIdPopup;
