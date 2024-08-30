import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        marginBottom: 10,
    },
    heading: {
        fontSize: 20,
        marginBottom: 10,
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10,
        padding: 5,
    },
    total: {
        fontSize: 14,
        marginTop: 10,
        fontWeight: "bold",
    },
});

// Create Document Component
const Pdf = ({ inputData, cartItems, totalAmount }) => {
    // Ensure totalAmount is a valid number
    const safeTotalAmount = totalAmount || 0;

    return (
        <Document>
            <Page style={styles.page}>
                {/* {(() => {
                    const now = Date.now();
                    while (Date.now() - now < 3000) {} // 3-second delay
                    return null;
                })()} */}
                {/* Customer Information */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Customer Information</Text>
                    <Text style={styles.text}>
                        Name: {inputData.firstName} {inputData.lastName}
                    </Text>
                    <Text style={styles.text}>
                        Address: {inputData.Address}, {inputData.Apartment}
                    </Text>
                    <Text style={styles.text}>
                        City: {inputData.City}, State: {inputData.State}, Zip: {inputData.ZipCode}
                    </Text>
                    <Text style={styles.text}>Email: {inputData.Email}</Text>
                    <Text style={styles.text}>Phone Number: {inputData.PhoneNumber}</Text>
                </View>

                {/* Order Summary */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Order Summary</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Product</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Quantity</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Price</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Total</Text>
                            </View>
                        </View>
                        {cartItems.map((item, index) => {
                            // Ensure price and quantity are valid numbers
                            const itemPrice = item.new_price || 0;
                            const itemQuantity = item.quantity || 0;
                            return (
                                <View style={styles.tableRow} key={index}>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{item.title}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{itemQuantity}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>${itemPrice.toFixed(2)}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>${(itemQuantity * itemPrice).toFixed(2)}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Total Amount */}
                <View style={styles.section}>
                    <Text style={styles.total}>Subtotal: ${safeTotalAmount.toFixed(2)}</Text>
                    <Text style={styles.total}>Shipping: FREE</Text>
                    <Text style={styles.total}>Total Amount: ${safeTotalAmount.toFixed(2)}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default Pdf;
