import React, { useContext, useEffect, useState } from "react";
import All_Product from "../Web_Data/Data";
import context_ex from "./Maincontext";

const FilterSection = (props) => {
    const { setMenData, setWomenData, setKidsData } = props;
    const [fullData, setFullData] = useState(All_Product);
    const [priceLength, setPriceLength] = useState(All_Product);
    const { component } = useContext(context_ex);
    const [filter, setFilter] = useState();
    const [selectedCategory, setSelectedCategory] = useState([]);

    useEffect(() => {
        let filtere_Product;

        if (component === "Men") {
            filtere_Product = All_Product.filter((products) => products.category === "men");
        } else if (component === "kids") {
            filtere_Product = All_Product.filter((products) => products.category === "kids");
        } else {
            filtere_Product = All_Product.filter((products) => products.category === "women");
        }

        setPriceLength(filtere_Product);
        setFilter(filtere_Product);
        setFullData(filtere_Product);
    }, [component]);

    var priceLength1, priceLength2, priceLength3, priceLength4, priceLength5, priceLength6;

    priceLength1 = priceLength.sort((a, b) => {
        return a.id - b.id;
    });
    priceLength2 = priceLength.filter((Price) => {
        return Price.new_price > 0 && Price.new_price < 25;
    });
    priceLength3 = priceLength.filter((Price) => {
        return Price.new_price > 25 && Price.new_price < 50;
    });
    priceLength4 = priceLength.filter((Price) => {
        return Price.new_price > 50 && Price.new_price < 200;
    });
    priceLength5 = priceLength.filter((Price) => {
        return Price.new_price > 200 && Price.new_price < 500;
    });
    priceLength6 = priceLength.filter((Price) => {
        return Price.new_price > 500 && Price.new_price < 1000;
    });

    const priceLength1_ = priceLength1.length;
    const priceLength2_ = priceLength2.length;
    const priceLength3_ = priceLength3.length;
    const priceLength4_ = priceLength4.length;
    const priceLength5_ = priceLength5.length;
    const priceLength6_ = priceLength6.length;

    const Price_target_filter = (e) => {
        const Price_id = e.target.id;

        if (Price_id === "price0") {
            const filterPrice = fullData.sort((a, b) => {
                return a.id - b.id;
            });
            setFilter(filterPrice);
            if (component === "Men") {
                setMenData(filterPrice);
            } else if (component === "kids") {
                setKidsData(filterPrice);
            } else {
                setWomenData(filterPrice);
            }
        }

        if (Price_id === "price1") {
            const filterPrice1 = fullData.filter((Price) => {
                return Price.new_price > 0 && Price.new_price < 25;
            });
            setFilter(filterPrice1);
            if (component === "Men") {
                setMenData(filterPrice1);
            } else if (component === "kids") {
                setKidsData(filterPrice1);
            } else {
                setWomenData(filterPrice1);
            }
        }

        if (Price_id === "price2") {
            const filterPrice2 = fullData.filter((Price) => {
                return Price.new_price > 25 && Price.new_price < 50;
            });
            setFilter(filterPrice2);
            if (component === "Men") {
                setMenData(filterPrice2);
            } else if (component === "kids") {
                setKidsData(filterPrice2);
            } else {
                setWomenData(filterPrice2);
            }
        }

        if (Price_id === "price3") {
            const filterPrice3 = fullData.filter((Price) => {
                return Price.new_price > 50 && Price.new_price < 200;
            });
            setFilter(filterPrice3);
            if (component === "Men") {
                setMenData(filterPrice3);
            } else if (component === "kids") {
                setKidsData(filterPrice3);
            } else {
                setWomenData(filterPrice3);
            }
        }

        if (Price_id === "price4") {
            const filterPrice3 = fullData.filter((Price) => {
                return Price.new_price > 200 && Price.new_price < 500;
            });
            setFilter(filterPrice3);
            if (component === "Men") {
                setMenData(filterPrice3);
            } else if (component === "kids") {
                setKidsData(filterPrice3);
            } else {
                setWomenData(filterPrice3);
            }
        }

        if (Price_id === "price5") {
            const filterPrice3 = fullData.filter((Price) => {
                return Price.new_price > 500 && Price.new_price < 1000;
            });
            setFilter(filterPrice3);
            if (component === "Men") {
                setMenData(filterPrice3);
            } else if (component === "kids") {
                setKidsData(filterPrice3);
            } else {
                setWomenData(filterPrice3);
            }
        }
    };

    const price_Filter = (e) => {
        const price_id = e.target.id;
        if (price_id === "priceF1") {
            const filterdData = [...filter].sort((a, b) => {
                return a.id - b.id;
            });
            if (component === "Men") {
                setMenData(filterdData);
            } else if (component === "kids") {
                setKidsData(filterdData);
            } else {
                setWomenData(filterdData);
            }
        }
        if (price_id === "priceF2") {
            const filterdData = [...filter].sort((a, b) => {
                return a.new_price - b.new_price;
            });
            if (component === "Men") {
                setMenData(filterdData);
            } else if (component === "kids") {
                setKidsData(filterdData);
            } else {
                setWomenData(filterdData);
            }
        }
        if (price_id === "priceF3") {
            const filterdData = [...filter].sort((a, b) => {
                return b.new_price - a.new_price;
            });
            if (component === "Men") {
                setMenData(filterdData);
            } else if (component === "kids") {
                setKidsData(filterdData);
            } else {
                setWomenData(filterdData);
            }
        }
    };

    const collectionHandler = (e) => {
        const collection_id = e.target.id;
        const isChecked = e.target.checked;
        let updatedSelectedCategory = [...selectedCategory];

        if (isChecked) {
            updatedSelectedCategory.push(collection_id);
        } else {
            updatedSelectedCategory = updatedSelectedCategory.filter((selectedCategory) => selectedCategory !== collection_id);
        }
        setSelectedCategory(updatedSelectedCategory);

        let filterProducts;
        if (updatedSelectedCategory.length === 0) {
            filterProducts = All_Product.filter((products) => products.category === component.toLowerCase());
        } else {
            filterProducts = All_Product.filter((products) => updatedSelectedCategory.some((cat) => products.category === `${component && component.toLowerCase()}_${cat}`));
        }

        if (component === "Men") {
            setMenData(filterProducts);
            setPriceLength(filterProducts);
            setFilter(filterProducts);
            setFullData(filterProducts);
        } else if (component === "kids") {
            setKidsData(filterProducts);
        } else {
            setWomenData(filterProducts);
            setPriceLength(filterProducts);
            setFilter(filterProducts);
            setFullData(filterProducts);
        }
    };

    let CheckBox = (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne">
                    Category
                </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                    <div className="check-box">
                        <div>
                            <input type="checkbox" onClick={collectionHandler} id="top"></input>
                            <label>Tops</label>
                        </div>
                        <div>
                            <input type="checkbox" onClick={collectionHandler} id="bottom"></input>
                            <label>Bottoms</label>
                        </div>
                        <div>
                            <input type="checkbox" onClick={collectionHandler} id="arrival"></input>
                            <label>New Arrivals</label>
                        </div>
                        <div>
                            <input type="checkbox" onClick={collectionHandler} id="outerwear"></input>
                            <label>Outerwear</label>
                        </div>
                        <div>
                            <input type="checkbox" onClick={collectionHandler} id="suiting"></input>
                            <label>Suiting</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="Filter_box">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                {component === "kids" ? "" : CheckBox}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                        >
                            Price
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <form>
                                <div className="price-box">
                                    <div>
                                        <input defaultChecked onClick={Price_target_filter} type="radio" name="radio-ex" id="price0"></input>
                                        <label htmlFor="price0">Default ({priceLength1_})</label>
                                    </div>
                                    <div>
                                        <input onClick={Price_target_filter} type="radio" name="radio-ex" id="price1"></input>
                                        <label htmlFor="price1">$0 - $25 ({priceLength2_})</label>
                                    </div>
                                    <div>
                                        <input onClick={Price_target_filter} type="radio" name="radio-ex" id="price2"></input>
                                        <label htmlFor="price2">$25 - $50 ({priceLength3_})</label>
                                    </div>
                                    <div>
                                        <input onClick={Price_target_filter} type="radio" name="radio-ex" id="price3"></input>
                                        <label htmlFor="price3">$50 - $200 ({priceLength4_})</label>
                                    </div>
                                    <div>
                                        <input onClick={Price_target_filter} type="radio" name="radio-ex" id="price4"></input>
                                        <label htmlFor="price3">$200 - $500 ({priceLength5_})</label>
                                    </div>
                                    <div>
                                        <input onClick={Price_target_filter} type="radio" name="radio-ex" id="price5"></input>
                                        <label htmlFor="price3">$500 - $1000 ({priceLength6_})</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseThree"
                            aria-expanded="false"
                            aria-controls="flush-collapseThree"
                        >
                            Sort
                        </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <form>
                                <div className="price-box">
                                    <div>
                                        <input defaultChecked onClick={price_Filter} type="radio" name="radio-ex1" id="priceF1"></input>
                                        <label>default</label>
                                    </div>
                                    <div>
                                        <input onClick={price_Filter} type="radio" name="radio-ex1" id="priceF2"></input>
                                        <label>Price Low to High</label>
                                    </div>
                                    <div>
                                        <input onClick={price_Filter} type="radio" name="radio-ex1" id="priceF3"></input>
                                        <label>Price High to Low</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSection;
