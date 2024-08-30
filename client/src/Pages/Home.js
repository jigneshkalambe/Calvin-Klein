import React from "react";
import Helmet from "../Components/Helmet";
import { Link } from "react-router-dom";
import ScrollBtn from "../Components/ScrollBtn";

function Home() {
    return (
        <Helmet title="Home">
            <ScrollBtn></ScrollBtn>
            <div className="home-space-1">
                <div className="row">
                    <div className="home-sec1-box">
                        <div className="home-sec1-mini home-sec1-bor1">
                            <h3>40% Off</h3>
                            <p>Sitewide</p>
                        </div>
                        <div className="home-sec1-mini home-sec1-bor">
                            <h3>30% Off</h3>
                            <p>Underwear</p>
                        </div>
                    </div>
                    <div className="home-sec1-last">
                        <Link to="/women">Shop Women</Link>
                        <Link to="/men">Shop Men</Link>
                        <Link to="/kids">Shop Kids</Link>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default Home;
