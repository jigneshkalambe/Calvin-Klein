import React, { useContext, useEffect, useState } from "react";
import Helmet from "../Components/Helmet";
import ScrollBtn from "../Components/ScrollBtn";
import All_Product from "../Web_Data/Data";
import FilterSection from "../Components/FilterSection";
import ProductCard from "../Components/ProductCard";
import context_ex from "../Components/Maincontext";

const Kids = () => {
    const [kids_products, setkids_Products] = useState([]);
    const { component, setComponent } = useContext(context_ex);
    useEffect(() => {
        setComponent("kids");
        const kidsProducts = All_Product.filter((products) => products.category === "kids");
        setkids_Products(kidsProducts);
    }, [All_Product]);

    const totalData_Kids = kids_products.length;
    return (
        <Helmet title="Kids">
            <ScrollBtn></ScrollBtn>
            <div className="Men-space-1 position-relative">
                <div className="row">
                    <div className="col-lg-3">
                        <p className="ms-3">{totalData_Kids} items</p>
                        <FilterSection kidsData={kids_products} setKidsData={setkids_Products}></FilterSection>
                    </div>
                    <div className="col-lg-9">
                        <div className="row g-3">
                            {kids_products.map((val, index) => {
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

export default Kids;
