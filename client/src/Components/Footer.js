import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="footer-bg-clr">
            <div className="footer-space">
                <div className="row">
                    <div className="col-12">
                        <div className="footer-first">
                            <p>
                                Mid-Season Sale: Up to 40% Off Sitewide Promotion ends 4.29.24 at 11:59 PM PT. Prices are as marked. Exclusions apply.
                                Only valid at calvinklein.us. Not valid on gift cards or previous purchases.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row g-5 my-5">
                    <div className="col-lg-3 col-md-12">
                        <div className="footer-box1">
                            <Link>Promotion</Link>
                            <Link>Gift Cards</Link>
                            <Link>Stores</Link>
                            <Link>Store Directory</Link>
                            <Link>Preferred Loyalty Program</Link>
                            <Link>Klarna</Link>
                            <Link>Afterpay</Link>
                            <Link>20% First Responder Discount</Link>
                            <Link>20% Refer a Friend Discount</Link>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 ">
                        <div className="footer-box2">
                            <h6>Help</h6>
                            <Link>Customer Service</Link>
                            <Link>FAQs</Link>
                            <Link>Track Order</Link>
                            <Link>Returns</Link>
                            <Link>Shipping</Link>
                            <Link>Accessibility</Link>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-box3">
                            <h6>About</h6>
                            <Link>About Calvin Klein</Link>
                            <Link>Careers</Link>
                            <Link>Privacy Commitment</Link>
                            <Link>Sustainability + Inclusivity</Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="footer-box4">
                            <div className="footer-signup-box">
                                <h6>Sign Up & Save 10% on Your Purchase0</h6>
                                <p>Subscribe for news on our latest arrivals, exclusive promotions and events.</p>
                                <button>Get Your 10% Off</button>
                            </div>
                            <div className="footer-join-box">
                                <h6>Text JOIN to 225846 to get Free Shipping</h6>
                                <p>Sign up for mobile texts to receive offer. Never miss out on exclusive launches, styles and promotions. Details</p>
                            </div>
                            <div className="footer-icon-box">
                                <i className="bx bxl-instagram"></i>
                                <i className="bx bxl-tiktok"></i>
                                <i className="bx bxl-facebook"></i>
                                <i className="bx bxl-twitter"></i>
                                <i className="bx bxl-pinterest"></i>
                                <i className="bx bxl-youtube"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="footer-last">
                            <h4>Calvin Klein</h4>
                            <p>
                                CA Transparency In Supply Chain & UK Modern Slavery Statement <Link>Privacy Policy</Link>
                                <Link>Interest Based Ads</Link> <Link>Do Not Sell or Share My Personal Information</Link>
                                <Link>Terms & Conditions</Link> Web ID: 418337283 Copyright © 2024 Calvin Klein. All rights reserved.
                            </p>
                            <div className="d-flex align-items-center gap-2 mt-3">
                                <i className="bx bx-location-plus"></i> <Link>United States</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
