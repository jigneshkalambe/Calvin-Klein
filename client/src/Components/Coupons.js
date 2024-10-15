import React from "react";

const Coupons = () => {
    return (
        <div className="coupon-container">
            <div className="coupon">
                <p className="coupon-item">
                    Use code <strong>SHOPMORE25</strong> for 25% off
                </p>
                <p className="coupon-item">
                    Use code <strong>WELCOME15</strong> For a 15% discount for new customers
                </p>
                <p className="coupon-item">
                    Use code <strong>FIRSTORDER20</strong> For a 20% discount on first-time purchases
                </p>
                <p className="coupon-item">
                    Use code <strong>SAVE10</strong> to save 10% on your next purchase
                </p>
            </div>
        </div>
    );
};

export default Coupons;
