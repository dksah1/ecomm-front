import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  console.log("products", products);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 xl:block lg:block md:block mx-2  h-[200px]">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.messagege || error.message}
        </Message>
      ) : (
        <Slider {...settings} className="md:w-[36rem] sm:w-[20rem] sm:block">
          {products?.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem] "
                />
                <div className="flex justify-between w-[20rem]">
                  <div className="one">
                    <h2>{name}</h2>
                    <p>${price}</p> <br />
                    <p className="w-[25rem]">
                      {description.substring(0, 170)}...
                    </p>
                  </div>
                  <div
                    className="flex justify-between w-[20rem]
                  "
                  >
                    <div className="one">
                      <h1 className="flex items-center mb-6">
                        <FaStore className="mr-2 text-white " /> Brand:{brand}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaClock className="mr-2 text-white " /> Added:
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 text-white " /> Reviews:
                        {numReviews}
                      </h1>
                    </div>
                    <div className="two">
                      <div className="flex items-center mb-6 w-[5rem]">
                        <FaStar className=" mr-2 text-white" />
                        Ratings: {Math.round(rating)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
