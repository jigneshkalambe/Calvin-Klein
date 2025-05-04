import React, { useContext, useEffect, useState } from "react";
import Helmet from "../Components/Helmet";
import Breadcrumb from "../Components/Breadcrumb";
import Data from "../Web_Data/Data";
import ProductCard from "../Components/ProductCard";
import FilterSection from "../Components/FilterSection";
import context_ex from "../Components/Maincontext";
import useGsap from "../hooks/useGsap";
import AccountDetailsContext from "../Components/AccountDetailsContext";

const Women = (props) => {
    useGsap();
    const [Women_products, setWomen_products] = useState([]);
    const { component, setComponent } = useContext(context_ex);
    const [collectionName, setCollectionName] = useState("women");
    const { isWishListProduct, setReloadAPI } = useContext(AccountDetailsContext);

    useEffect(() => {
        setComponent("Women");
        const filtere_Product = Data.filter((filter) => filter.category === "women");
        setWomen_products(filtere_Product);
    }, [setComponent]);

    const collectionHandler = (collection) => {
        let filteredProducts = [];
        switch (collection) {
            case "women_top":
                filteredProducts = Data.filter((item) => item.category === "women_top");
                break;
            case "women_bottom":
                filteredProducts = Data.filter((item) => item.category === "women_bottom");
                break;
            case "women_arrival":
                filteredProducts = Data.filter((item) => item.category === "women_arrival");
                break;
            case "women_outerwear":
                filteredProducts = Data.filter((item) => item.category === "women_outerwear");
                break;
            case "women_suiting":
                filteredProducts = Data.filter((item) => item.category === "women_suiting");
                break;
            default:
                filteredProducts = Data.filter((item) => item.category === "women");
        }
        setWomen_products(filteredProducts);
        setCollectionName(collection);
    };

    const totalData_Women = Women_products.length;

    const womenCategories = [
        { key: "women_top", label: "Tops", img: "Assets/img/women_top.webp" },
        { key: "women_bottom", label: "Bottoms", img: "Assets/img/women_bottom.webp" },
        { key: "women_arrival", label: "New Arrival", img: "Assets/img/women_denim.webp" },
        { key: "women_outerwear", label: "Outerwear", img: "Assets/img/women_outerwear.webp" },
        { key: "women_suiting", label: "Suiting", img: "Assets/img/women_suiting.webp" },
    ];

    return (
        <Helmet title="Women">
            <div className="Men-space-1 ">
                <Breadcrumb title="Women"></Breadcrumb>
                <div className="Men_sec1">
                    <h4>Women's Apparel</h4>
                    <div className="d-flex gap-2 scroll">
                        {womenCategories.map(({ key, label, img }) => (
                            <div className="Men_sec1_imgBox" key={key} onClick={() => collectionHandler(key)}>
                                <img className="Men_sec1_img" alt={label} src={img} />
                                <h5>{label}</h5>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="Men-space-1 position-relative">
                <div className="row">
                    <div className="col-lg-3">
                        <p className="ms-3">{totalData_Women} items</p>
                        <FilterSection setWomenData={setWomen_products} womenData={Women_products}></FilterSection>
                    </div>
                    <div className="col-lg-9">
                        <div className="row g-3">
                            {Women_products.map((val, index) => {
                                const isAddedToWishlist = Array.isArray(isWishListProduct) && isWishListProduct.some((product) => product.productId === val.id);
                                return (
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={index}>
                                        <ProductCard setReloadAPI={setReloadAPI} isWishListProduct={isAddedToWishlist} className={"gsap-bottom-to-top"} items={val}></ProductCard>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Women;
