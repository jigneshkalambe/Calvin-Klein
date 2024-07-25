import React, { useContext, useEffect, useState } from "react";
import Helmet from "../Components/Helmet";
import ScrollBtn from "../Components/ScrollBtn";
import All_Product from "../Web_Data/Data";
import FilterSection from "../Components/FilterSection";
import ProductCard from "../Components/ProductCard";
import context_ex from "../Components/Maincontext";

const Kids = () => {
    const [kids_products, setkids_Products] = useState(All_Product);
    const { component, setComponent } = useContext(context_ex);
    useEffect(() => {
        const BoyProducts = All_Product.filter((products) => products.category === "Boy");
        const GirlProducts = All_Product.filter((products) => products.category === "Girl");
        const FilterProduct = BoyProducts.concat(GirlProducts);
        setkids_Products(FilterProduct);
    }, [All_Product]);

    setComponent("kids");

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
