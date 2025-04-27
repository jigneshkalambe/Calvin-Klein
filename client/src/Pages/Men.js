import React, { useContext, useEffect, useState } from "react";
import Helmet from "../Components/Helmet";
import Breadcrumb from "../Components/Breadcrumb";
import Data from "../Web_Data/Data";
import ProductCard from "../Components/ProductCard";
import FilterSection from "../Components/FilterSection";
import context_ex from "../Components/Maincontext";
import ScrollBtn from "../Components/ScrollBtn";
import useGsap from "../hooks/useGsap";

const Men = () => {
    useGsap();
    const [Men_products, setMen_products] = useState(Data);
    const [Men_page, setMen_page] = useState("men");
    const { component, setComponent } = useContext(context_ex);
    const [collectionName, setCollectionName] = useState("men");
    useEffect(() => {
        const filtere_Product = Data.filter((filter) => filter.category === "men");
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
    }, [setComponent]);

    const collectionHandler = (collection) => {
        let filteredProducts = [];
        switch (collection) {
            case "men_top":
                filteredProducts = Data.filter((item) => item.category === "men_top");
                break;
            case "men_bottom":
                filteredProducts = Data.filter((item) => item.category === "men_bottom");
                break;
            case "men_arrival":
                filteredProducts = Data.filter((item) => item.category === "men_arrival");
                break;
            case "men_outerwear":
                filteredProducts = Data.filter((item) => item.category === "men_outerwear");
                break;
            case "men_suiting":
                filteredProducts = Data.filter((item) => item.category === "men_suiting");
                break;
            default:
                filteredProducts = Data.filter((item) => item.category === "men");
        }
        setMen_products(filteredProducts);
        setCollectionName(collection);
    };

    const totalData_Men = Men_products.length;

    const menCategories = [
        { key: "men_top", label: "Tops", img: "Assets/img/Men_top.webp" },
        { key: "men_bottom", label: "Bottoms", img: "Assets/img/Men_Bottoms.webp" },
        { key: "men_arrival", label: "New Arrivals", img: "Assets/img/Men_Denim.webp" },
        { key: "men_outerwear", label: "Outerwear", img: "Assets/img/Men_Outerwear.webp" },
        { key: "men_suiting", label: "Suiting", img: "Assets/img/Men_Suiting.webp" },
    ];

    return (
        <Helmet title="Men">
            <ScrollBtn></ScrollBtn>
            <div className="Men-space-1">
                <Breadcrumb title="Men"></Breadcrumb>
                <div className="Men_sec1">
                    <h4>Men's Apparel</h4>
                    <div className="d-flex gap-2 scroll">
                        {menCategories.map(({ key, label, img }) => (
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
                        <p className="ms-3">{totalData_Men} items</p>
                        <FilterSection MenData={Men_products} setMenData={setMen_products} MenPage={Men_page} collectionName={collectionName} setCollectionName={setCollectionName}></FilterSection>
                    </div>
                    <div className="col-lg-9">
                        <div className="row g-3">
                            {Men_products.map((val, index) => {
                                return (
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={index}>
                                        <ProductCard className={"gsap-bottom-to-top"} items={val}></ProductCard>
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
