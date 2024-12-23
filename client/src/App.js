import React, { useEffect, useState } from "react";
import Layout from "./Components/Layout";
import Loader from "./Components/Loader";

function App() {
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, [1500]);
    });
    return <>{loader ? <Loader /> : <Layout />}</>;
}

export default App;
