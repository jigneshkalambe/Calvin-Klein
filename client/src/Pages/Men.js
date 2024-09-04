import React, { useContext, useEffect, useState } from "react";
import Helmet from "../Components/Helmet";
import Breadcrumb from "../Components/Breadcrumb";
import Data from "../Web_Data/Data";
import ProductCard from "../Components/ProductCard";
import FilterSection from "../Components/FilterSection";
import context_ex from "../Components/Maincontext";
import ScrollBtn from "../Components/ScrollBtn";
import axios from "axios";

const Men = () => {
    const [Men_products, setMen_products] = useState(Data);
    const [Men_page, setMen_page] = useState("Men");
    const { component, setComponent } = useContext(context_ex);
    useEffect(() => {
        const filtere_Product = Data.filter((filter) => filter.category === "Men");
        setMen_products(filtere_Product);
        setComponent("Men");

        // axios
        //     .get(`http://localhost:5000/api/items`)
        //     .then((res) => {
        //         console.log(res.data);
        //         setMen_products([...filtere_Product, ...res.data]);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }, [Data]);

    const totalData_Men = Men_products.length;

    return (
        <Helmet title="Men">
            <ScrollBtn></ScrollBtn>
            <div className="Men-space-1 ">
                <Breadcrumb title="Men"></Breadcrumb>
                <div className="Men_sec1">
                    <h4>Men's Apparel</h4>
                    <div className="d-flex gap-2 scroll">
                        <div className="Men_sec1_imgBox">
                            <img className="Men_sec1_img" alt="" src="Assets/img/Men_top.webp"></img>
                            <h5>Tops</h5>
                        </div>

                        <div className="Men_sec1_imgBox">
                            <img className="Men_sec1_img" alt="" src="Assets/img/Men_Bottoms.webp"></img>
                            <h5>Bottoms</h5>
                        </div>

                        <div className="Men_sec1_imgBox">
                            <img className="Men_sec1_img" alt="" src="Assets/img/Men_Denim.webp"></img>
                            <h5>Denim</h5>
                        </div>

                        <div className="Men_sec1_imgBox">
                            <img className="Men_sec1_img" alt="" src="Assets/img/Men_Outerwear.webp"></img>
                            <h5>Outerwear</h5>
                        </div>

                        <div className="Men_sec1_imgBox">
                            <img className="Men_sec1_img" alt="" src="Assets/img/Men_Suiting.webp"></img>
                            <h5>Suiting</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Men-space-1 position-relative">
                <div className="row">
                    <div className="col-lg-3">
                        <p className="ms-3">{totalData_Men} items</p>
                        <FilterSection MenData={Men_products} setMenData={setMen_products} MenPage={Men_page}></FilterSection>
                    </div>
                    <div className="col-lg-9">
                        <div className="row g-3">
                            {Men_products.map((val, index) => {
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

export default Men;
