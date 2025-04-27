import React from "react";
import useGsapBottomToTop from "./useGsapBottomToTop";
import useGsapStagger from "./useGsapStagger";

const useGsap = (pageClassName) => {
    useGsapBottomToTop("gsap-bottom-to-top");
    useGsapStagger("gsap-stagger");
    return;
};

export default useGsap;
