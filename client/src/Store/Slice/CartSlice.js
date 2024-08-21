import { createSlice, current } from "@reduxjs/toolkit";

const items = localStorage.getItem("cartItems") !== null ? JSON.parse(localStorage.getItem("cartItems")) : [];
const totalQuantity = localStorage.getItem("totalQuantity") !== null ? JSON.parse(localStorage.getItem("totalQuantity")) : 0;
const totalAmount = localStorage.getItem("totalAmount") !== null ? JSON.parse(localStorage.getItem("totalAmount")) : 0;

const setItem = (item, totalAmount, totalQuantity) => {
    localStorage.setItem("cartItems", JSON.stringify(item));
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
};

const initialState = {
    Component: true,
    cartItems: items,
    totalQuantity: totalQuantity,
    totalAmount: totalAmount,
    // cartItems: [],
    // totalQuantity: 0,
    // totalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        Toggle(state) {
            // return { Component: !initialState.Component };
            state.Component = !state.Component;
        },
        initializeCart(state, action) {
            state.cartItems = action.payload;
            state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = action.payload.reduce((total, item) => total + item.quantity * item.new_price, 0);
        },
        addProducts(state, action) {
            const newItems = action.payload;
            const exitingItems = state.cartItems.find((item) => item.id === newItems.id);
            state.totalQuantity++;
            if (!exitingItems) {
                state.cartItems.push({
                    id: newItems.id,
                    desc: newItems.desc,
                    img01: newItems.img01,
                    img02: newItems.img02,
                    img03: newItems.img03,
                    img04: newItems.img04,
                    line: newItems.line,
                    title: newItems.title,
                    new_price: newItems.new_price,
                    discount: newItems.discount,
                    old_price: newItems.old_price,
                    quantity: 1,
                    totalPrice: newItems.new_price,
                });
            } else {
                exitingItems.quantity++;
                exitingItems.totalPrice = Number(newItems.new_price) + Number(exitingItems.totalPrice);
            }
            // if (exitingItems) {
            //     exitingItems.quantity += 1;
            //     exitingItems.totalPrice += newItems.new_price;
            // } else {
            //     state.cartItems.push({
            //         ...newItems,
            //         quantity: 1,
            //         totalPrice: newItems.new_price,
            //     });
            // }

            state.totalQuantity += 1;
            state.totalAmount += newItems.new_price;
            // state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.new_price) * Number(item.quantity), 0);
            // setItem(
            //     state.cartItems.map((item) => item),
            //     state.totalAmount,
            //     state.totalQuantity
            // );
            setItem(state.cartItems, state.totalAmount, state.totalQuantity);
            return state;
            // console.log(current(state.cartItems));
        },
        removeProducts(state, action) {
            const newItem = action.payload;
            const exitingItems = state.cartItems.find((item) => item.id === newItem.id);
            // console.log("New Items", newItem);
            // console.log("exitingItems", exitingItems);
            state.totalQuantity--;

            if (exitingItems.quantity === 1) {
                state.cartItems = state.cartItems.filter((item) => item.id !== exitingItems.id);
            } else {
                exitingItems.quantity--;
                exitingItems.totalPrice = Number(exitingItems.totalPrice) - Number(exitingItems.new_price);
            }

            state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.new_price) * Number(item.quantity), 0);
            // state.totalAmount -= exitingItems.new_price;

            // setItem(
            //     state.cartItems.map((item) => item),
            //     state.totalAmount,
            //     state.totalQuantity
            // );
            setItem(state.cartItems, state.totalAmount, state.totalQuantity);
            return state;
        },
        deleteProducts(state, action) {
            const newItem = action.payload;
            const exitingItems = state.cartItems.find((item) => item.id === newItem.id);

            if (exitingItems) {
                state.cartItems = state.cartItems.filter((item) => item.id !== exitingItems.id);
                state.totalQuantity = state.totalQuantity - exitingItems.quantity;
                // state.totalAmount -= exitingItems.totalPrice;
            }
            state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.new_price) * Number(item.quantity), 0);
            // setItem(
            //     state.cartItems.map((item) => item),
            //     state.totalAmount,
            //     state.totalQuantity
            // );
            setItem(state.cartItems, state.totalAmount, state.totalQuantity);
            return state;
        },
        // setCart(state, action) {
        //     state.cartItems = action.payload.cartItems;
        //     state.totalQuantity = action.payload.cartItems.reduce((total, item) => total + item.quantity, 0);
        //     state.totalAmount = action.payload.cartItems.reduce((total, item) => total + item.quantity * item.new_price, 0);
        // },
    },
});

export const cartAction = cartSlice.actions;
export default cartSlice;
