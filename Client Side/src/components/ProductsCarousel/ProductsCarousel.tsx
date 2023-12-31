import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useProductState } from "../../hooks/useProductState";
import { Product } from "../../models/Product";
import "./ProductsCarousel.css";
import { Typography } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";

const ProductsCarousel = () => {
  // Assuming you have a new array of image URLs
  const newImageUrls = [
    "https://holylandwebstore.com/wp-content/uploads/2017/01/products-bisli_200gr_6.9.png",
    "https://macolet.net/Cat_387221_4305.png",
    "https://boker.co.il/userfiles/web_pages/picture_60.webp"
    // Add more URLs as needed
  ];

  const { isXsScreen } = useResponsive();

  return (
    <div className="carouselContainer center blueText">
      <Typography
        variant="h3"
        gutterBottom
        className="blueText"
        sx={{
          whiteSpace: "nowrap",
          marginTop: "1rem",
          fontFamily: "Josefin Sans",
          fontWeight: 500,
          fontSize: isXsScreen ? "1.9rem" : "2.5rem",
        }}
      >
        Some of our products
      </Typography>
      <Carousel className="productsCarousel">
        {newImageUrls.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} alt={`Product ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductsCarousel;
