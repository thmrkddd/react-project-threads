import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Home from "../../img/home (1).png";
import Threads from "../../img/threadslogo.svg";
import Like from "../../img/heart-shape.png";
import User from "../../img/icons8-user-32.png";
import Post from "../../img/more.png";
import Search from "../../img/search.png";
import Menu from "../../img/menu (1).png";
import Gallery from "../../img/gallery.png";
import Hash from "../../img/hash (1).png";
import User2 from "../../img/user.webp";
import Cross from "../../img/cross-mark.png";
const Navbar = () => {
  const [isTop, setIsTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const categories = ["здоровье", "спорт", "еда"];

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsTop(scrollTop === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setShowCategories(false);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal3 = () => {
    setIsModalOpen3(false);
  };
  const toggleModal3 = () => {
    setIsModalOpen3(!isModalOpen3);
    setIsMenuOpen(false);
  };
  const closeModal4 = () => {
    setIsModalOpen4(false);
  };
  const toggleModal4 = () => {
    setIsModalOpen4(!isModalOpen4);
    setIsMenuOpen(false);
  };
  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleHashClick = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryClick = (category) => {
    const input = document.querySelector('.modal-actions input[type="text"]');
    if (input) {
      input.value += ` #${category} `;
    }
  };
  const handleSearchClick = () => {
    // логика для поиска
  };
  const clearImageClick = () => {
    setSelectedImage(null);
    fileInputRef.current.value = null;
  };
  return (
    <div className={`navbar-wrapper ${isTop ? "" : "fixed"}`}>
      <nav className="nav-bar">
        <Link className="logo" to="/">
          <img alt="img" src={Threads} className="d-inline-block align-top" />
        </Link>

        <div className="nav-links">
          <Link to="/" className="link">
            <img className="" src={Home} alt="" />
          </Link>

          <Link to="/searchPage" className="link" onClick={handleSearchClick}>
            <img src={Search} alt="" />
          </Link>
          <Link to="/" className="link" onClick={toggleModal}>
            <img src={Post} alt="" />
          </Link>
          <Link to="/like" className="link">
            <img src={Like} alt="" />
          </Link>
          <Link to="/user" id="userIcon" className="link">
            <img src={User} alt="" />
          </Link>
        </div>
        <div className="burger-menu" onClick={toggleMenu}>
          <img src={Menu} alt="" />
        </div>
        {isMenuOpen && (
          <ul className="dropdown-menu">
            <li onClick={toggleModal4}>Внешний вид</li>
            <hr />
            <li onClick={()=>navigate('/settings')}>Настройки</li>
            <hr />
            <li onClick={toggleModal3}>Сообщить о проблеме</li>
            <hr />
            <li>Выйти</li>
          </ul>
        )}
        {isModalOpen && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="postitem_request">
                {" "}
                <img src={User2} alt="img" />
                <h5>artemnesterenko</h5>
              </div>
              <div className="modal-actions">
                {" "}
                <input type="text" placeholder="Создайте ветку..." />
                <div className="postitem_addbutton">
                  <div className="postitem_image_container">
                    {" "}
                    <div className="hash-dropdown">
                      <img
                        src={Cross}
                        alt="img"
                        onClick={clearImageClick}
                        style={{ display: selectedImage ? "flex" : "none" }}
                      />
                      <img
                        src={Gallery}
                        alt="img"
                        onClick={openFileInput}
                        style={{ display: selectedImage ? "none" : "" }}
                      />
                      <img src={Hash} alt="img" onClick={handleHashClick} />
                    </div>
                    {showCategories && (
                      <div className="categories-dropdown">
                        {categories.map((category, index) => (
                          <span
                            key={index}
                            onClick={() => handleCategoryClick(category)}
                          >
                            +{category}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="selectFile">
                      {" "}
                      {selectedImage && (
                        <img src={selectedImage} alt="Selected" />
                      )}
                    </div>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="modal-addbutton">
                {" "}
                <button>Опубликовать</button>
              </div>
            </div>
          </div>
        )}
        {isModalOpen3 && (
          <div className="modal3" onClick={closeModal3}>
            <h4>Сообщение о проблеме</h4>
            <div
              className="modal-content3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-actions3">
                <input
                  type="text"
                  placeholder="Предоставьте как можно более подробную информацию"
                />
              </div>
              <div className="modal-addbutton3">
                {" "}
                <button>Отправить</button>
              </div>
            </div>
          </div>
        )}
        {isModalOpen4 && (
          <div className="modal4" onClick={closeModal4}>
            <h4>Внешний вид</h4>
            <div
              className="modal-content4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-addbutton4">
                {" "}
                <button>light</button>
                <button>dark</button>
                <button>auto</button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
