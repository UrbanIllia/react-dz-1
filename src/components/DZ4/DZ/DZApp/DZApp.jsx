import { useState } from "react";
import Container from "../../../Container/Container";

import SearchBar from "../SearchBar/SearchBar";

import { RiTailwindCssFill } from "react-icons/ri";

import fetchImages from "../fetchUnsplash";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";

const DZApp = () => {
  const [articles, setArticles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setPage(1);
    setQuery(query);
    setArticles([]);
    setError(null);
    setLoading(true);
    try {
      const response = await fetchImages(query);
      console.log(response.results);
      setArticles(response.results);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };
  const handleAddMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    try {
      const data = await fetchImages(query, page);
      setArticles((prev) => [...prev, ...data.results]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <div
        className="my-8 mx-10 py-10  bg-emerald-200 flex flex-col  relative items-center min-h-screen"
        style={{
          backgroundImage: `url('/images/34.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="text-5xl text-center font-black text-white">
          Search Pictures
        </h2>
        <SearchBar onSubmit={handleSearch} />
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {articles.length > 0 && (
          <ImageGallery articles={articles} onImageClick={openModal} />
        )}
        <ImageModal
          data={selectedImage}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        />
        {articles.length > 0 && (
          <button
            type="button"
            onClick={handleAddMore}
            className="w-[220px] block px-5 py-3 bg-amber-300 rounded-lg mx-auto
             hover:bg-amber-800 hover:text-amber-200 cursor-pointer transition"
          >
            Add More
          </button>
        )}
        <RiTailwindCssFill
          size={80}
          className="absolute top-0 right-5"
          color="blue"
        />
      </div>
    </Container>
  );
};

export default DZApp;
