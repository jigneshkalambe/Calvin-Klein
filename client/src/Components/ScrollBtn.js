import React from "react";

const ScrollBtn = () => {
    const scrollTOP = () => {
        const BTN = document.querySelector(".scrollBtn");

        if (window.pageYOffset > 400) {
            BTN.style.display = "block";
        } else {
            BTN.style.display = "none";
        }
        BTN.onclick = function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        };
    };
    window.addEventListener("scroll", scrollTOP);

    return (
        <>
            <button className="scrollBtn" onClick={scrollTOP}>
                <i className="bx bx-chevron-up"></i>
                Top
            </button>
        </>
    );
};

export default ScrollBtn;
