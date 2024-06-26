import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faTimes,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { SAVE_ART } from "../utils/mutations";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useCart } from "../context/CartContext.jsx";
import "../App.css";

function Modal({ art, onClose, onSave }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [saveArt] = useMutation(SAVE_ART);
  const { addToCart } = useCart();
  const [buttonText, setButtonText] = useState("Add to Cart");
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
  });

  useEffect(() => {}, [art]);

  const handleSaveClick = async () => {
    setIsFavorite(true);
    if (typeof onSave === "function") {
      onSave(art);
    } else {
      console.error("onSave is not a function", onSave);
    }

    const artData = {
      id: art.id,
      title: art.title,
      artist_titles: art.artist_titles,
      description: art.description,
      imageUrl: art.imageUrl,
    };

    try {
      const { data } = await saveArt({ variables: { artData } });
      console.log("Artwork saved:", data.saveArt);
    } catch (error) {
      console.error("Error saving artwork:", error);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setButtonText("Your art has been added!");
    setTimeout(() => setButtonText("Add to Cart"), 3000);
  };

  if (!art) {
    return null;
  }

  const imageUrl = `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-8 relative max-w-4xl w-full mx-4 my-4 overflow-auto"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-auto mb-4 flex justify-center">
          <Zoom>
            <img
              src={art.imageUrl}
              alt={art.title}
              className="max-w-full max-h-96 object-contain rounded-lg"
            />
          </Zoom>
        </div>
        <h2 className="text-2xl pl-4 pr-4 font-bold mt-4">{art.title}</h2>
        <p className="text-xl mt-2 pr-4 pl-4">
          <strong>Artist:</strong> {art.artist_titles || "Unknown"}{" "}
        </p>
        <p className="pl-4 pr-4 text-xl mb-4 mt-2">
          <strong>Description:</strong> {art.description}
        </p>
        <div className="hidden md:flex justify-between items-center pl-4 pr-4 mt-4">
          <button
            className="bg-transparent text-black border border-red-500 px-4 py-2 rounded-full hover:text-red-600 flex items-center space-x-2"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} className="hover:text-red-600" />
            <span>Close</span>
          </button>
          <button
            className="add-to-cart-btn py-2 px-6 text-white rounded-full"
            onClick={() => handleAddToCart({ ...art, price: 15 })}
          >
            <FontAwesomeIcon
              icon={faCartPlus}
              className="text-white-500 pr-3 cursor-pointer "
            />
            {buttonText}
          </button>
          <button
            className="bg-transparent text-black border border-green-500 px-4 py-2 rounded-full hover:text-green-600 flex items-center space-x-2"
            onClick={handleSaveClick}
          >
            <FontAwesomeIcon
              icon={isFavorite ? faHeartSolid : faHeartRegular}
              className="heart-icon"
            />
            <span>Save</span>
          </button>
        </div>
        <div className="flex flex-col md:hidden justify-between items-center pl-4 pr-4 mt-4 space-y-4">
          <div className="flex justify-between w-full">
            <button
              className="bg-transparent text-black border border-red-500 px-4 py-2 rounded-full hover:text-red-600 flex items-center space-x-2"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faTimes} className="hover:text-red-600" />
              <span>Close</span>
            </button>
            <button
              className="bg-transparent text-black border border-green-500 px-4 py-2 rounded-full hover:text-green-600 flex items-center space-x-2"
              onClick={handleSaveClick}
            >
              <FontAwesomeIcon
                icon={isFavorite ? faHeartSolid : faHeartRegular}
                className="heart-icon"
              />
              <span>Save</span>
            </button>
          </div>
          <div className="flex justify-center w-full">
            <button
              className="add-to-cart-btn py-2 px-6 text-white rounded-full"
              onClick={() => handleAddToCart({ ...art, price: 15 })}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
      {notification.visible && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-md shadow-lg transition-all duration-300">
          {notification.message}
        </div>
      )}
    </div>
  );
}

Modal.propTypes = {
  art: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Modal;
