import React, { useContext, useEffect, useState } from "react";
import Helmet from "../Components/Helmet";
import { Link } from "react-router-dom";
import ScrollBtn from "../Components/ScrollBtn";
import Data from "../Web_Data/Data";
import ProductCard from "../Components/ProductCard";
import Slider from "react-slick";
import video from "../Web_Data/videos/NJ_Hero_Desktop.mp4";
import useGsap from "../hooks/useGsap";
import AccountDetailsContext from "../Components/AccountDetailsContext";

function Home() {
    useGsap();

    const { isWishListProduct } = useContext(AccountDetailsContext);

    const [menProducts, setMenProducts] = useState(Data);
    const [womenProducts, setWomenProducts] = useState(Data);
    useEffect(() => {
        const bestSellerProducts = Data.filter((product) => product.line === "Best Seller" && ["men", "men_top", "men_bottom", "men_outerwear", "men_suiting"].includes(product.category));
        setMenProducts(bestSellerProducts);

        const bestSellerProducts2 = Data.filter((product) => product.line === "Best Seller" && ["women", "women_top", "women_bottom", "women_outerwear", "women_suiting"].includes(product.category));
        setWomenProducts(bestSellerProducts2);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Helmet title="Home">
            <main>
                <ScrollBtn></ScrollBtn>
                {/* <div className="home-space-1"> */}
                <div className="Men-space-1">
                    <div className="row">
                        <div className="home-sec1-box">
                            <div className="home-sec1-mini home-sec1-bor1 element-appear-top">
                                <h3>40% Off</h3>
                                <p>Sitewide</p>
                            </div>
                            <div className="home-sec1-mini home-sec1-bor element-appear-top">
                                <h3>30% Off</h3>
                                <p>Shirts</p>
                            </div>
                        </div>
                        <div className="home-sec1-last element-appear-top">
                            <Link to="/women">Shop Women</Link>
                            <Link to="/men">Shop Men</Link>
                            <Link to="/kids">Shop Kids</Link>
                        </div>
                    </div>
                </div>
                <div className="mt-5 position-relative d-flex flex-column align-items-center">
                    <video autoPlay muted loop>
                        <source src={video} type="video/mp4"></source>
                    </video>

                    <div className="video_content element-appear-top">
                        <h2>NEW JEANS IN CALVIN KLEIN</h2>
                        <p>Feel the energy in stripped back simplicity</p>
                    </div>
                </div>
                <div className="Men-space-1">
                    <div className="my-5">
                        <div className="d-flex justify-content-center align-items-center">
                            <h2 className="">Best Selling Men's Products</h2>
                        </div>
                        <div className="d-flex flex-column my-4">
                            <Slider {...settings}>
                                {menProducts?.map((val, ind) => {
                                    const isAddedToWishlist = Array.isArray(isWishListProduct) && isWishListProduct.some((product) => product.productId === val.id);
                                    return (
                                        <div key={ind} className="px-2 mb-4">
                                            <ProductCard className={"gsap-bottom-to-top"} isWishListProduct={isAddedToWishlist} items={val} />
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                    </div>
                    <div className="my-5">
                        <div className="d-flex justify-content-center align-items-center">
                            <h2>Best Selling Women's Products</h2>
                        </div>
                        <div className="d-flex flex-column my-4">
                            <Slider {...settings}>
                                {womenProducts?.map((val, ind) => {
                                    const isAddedToWishlist = Array.isArray(isWishListProduct) && isWishListProduct.some((product) => product.productId === val.id);
                                    return (
                                        <div key={ind} className="px-2 mb-4">
                                            <ProductCard className={"gsap-bottom-to-top"} isWishListProduct={isAddedToWishlist} items={val} />
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </main>
        </Helmet>
    );
}

export default Home;
