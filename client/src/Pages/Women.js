import React, { useContext, useEffect, useState } from "react";
import Helmet from "../Components/Helmet";
import Breadcrumb from "../Components/Breadcrumb";
import Data from "../Web_Data/Data";
import ProductCard from "../Components/ProductCard";
import FilterSection from "../Components/FilterSection";
import context_ex from "../Components/Maincontext";

const Women = (props) => {
    const [Women_products, setWomen_products] = useState([]);
    const { component, setComponent } = useContext(context_ex);
    const [collectionName, setCollectionName] = useState("women");

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

    return (
        <Helmet title="Women">
            <div className="Men-space-1 ">
                <Breadcrumb title="Women"></Breadcrumb>
                <div className="Men_sec1">
                    <h4>Women's Apparel</h4>
                    <div className="d-flex gap-2 scroll">
                        <div className="Men_sec1_imgBox" onClick={() => collectionHandler("women_top")}>
                            <img className="Men_sec1_img" alt="" src="Assets/img/women_top.webp"></img>
                            <h5>Tops</h5>
                        </div>

                        <div className="Men_sec1_imgBox" onClick={() => collectionHandler("women_bottom")}>
                            <img className="Men_sec1_img" alt="" src="Assets/img/women_bottom.webp"></img>
                            <h5>Bottoms</h5>
                        </div>

                        <div className="Men_sec1_imgBox" onClick={() => collectionHandler("women_arrival")}>
                            <img className="Men_sec1_img" alt="" src="Assets/img/women_denim.webp"></img>
                            <h5>New Arrival</h5>
                        </div>

                        <div className="Men_sec1_imgBox" onClick={() => collectionHandler("women_outerwear")}>
                            <img className="Men_sec1_img" alt="" src="Assets/img/women_outerwear.webp"></img>
                            <h5>Outerwear</h5>
                        </div>

                        <div className="Men_sec1_imgBox" onClick={() => collectionHandler("women_suiting")}>
                            <img className="Men_sec1_img" alt="" src="Assets/img/women_suiting.webp"></img>
                            <h5>Suiting</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Men-space-1 position-relative">
                <div className="row">
                    <div className="col-lg-3">
                        <p className="ms-3">{totalData_Women} items</p>
                        <FilterSection womenData={Women_products} setWomenData={setWomen_products}></FilterSection>
                    </div>
                    <div className="col-lg-9">
                        <div className="row g-3">
                            {Women_products.map((val, index) => {
                                return (
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={index}>
                                        <ProductCard items={val}></ProductCard>
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
