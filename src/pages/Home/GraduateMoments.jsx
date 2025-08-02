/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Slider from "react-slick"; // Or use Swiper for an alternative
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import graduate1 from "../../assets/graduate1.jpg";
import graduate2 from "../../assets/graduate2.webp";
import graduate3 from "../../assets/graduate3.webp";

const GraduateMoments = () => {
  const galleryImages = [
    {
      src: graduate1,
      alt: "Class of 2023 Graduation",
      caption: "Class of 2023 celebrating their graduation day.",
    },
    {
      src: graduate2,
      alt: "Class of 2022 Group Photo",
      caption: "Class of 2022 at the annual alumni reunion.",
    },
    {
      src: graduate3,
      alt: "Class of 2021 Ceremony",
      caption: "Class of 2021 commencement ceremony.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Graduate Moments: Celebrating Our Alumni's Journey
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Slider {...settings}>
            {galleryImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
                  <p className="text-lg font-semibold">{image.caption}</p>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
        {/* <div className="text-center mt-6">
          <a
            href="/alumni"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            Explore Alumni Stories
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default GraduateMoments;
