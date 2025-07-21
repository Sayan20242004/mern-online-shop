import React, { useState } from "react";
import { handleSuccess, handleError } from "../utils"; // Reuse your existing toast utils
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const [product, setProduct] = useState({
        brandName: '',
        productName: '',
        rate: '',
        type:''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { brandName, productName, rate, type} = product;

        if (!brandName || !productName || !rate|| !type) {
            return handleError("All fields are required");
        }

        try {
            const response = await fetch("http://localhost:8080/product1/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            });
            const result = await response.json();

            if (result.success) {
                handleSuccess(result.message);
                setProduct({ brandName: '', productName: '', rate: '' });
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } else {
                handleError(result.message);
            }
        } catch (error) {
            handleError("Failed to add product");
        }
    };

    return (
        <div className="Log_box">
            <section className="sign_head" id="sign_head">
                <span className="write">Add Product</span>
            </section>
            <form onSubmit={handleSubmit}>
                <div className="det_box" id="deet_box">
                    <span className="write_1">Brand Name</span>
                    <input onChange={handleChange} name="brandName" value={product.brandName} placeholder="Enter brand name" />

                    <span className="write_1">Product Name</span>
                    <input onChange={handleChange} name="productName" value={product.productName} placeholder="Enter product name" />

                    <span className="write_1">Rate (₹)</span>
                    <input onChange={handleChange} name="rate" type="number" value={product.rate} placeholder="Enter rate" />

                    <span className="write_1">Type</span>
                    <input
                       onChange={handleChange}
                        name="type"
                       value={product.type}
                        placeholder="Enter type (e.g., bag, mobile, fridge)"
                    />


                    <button type="submit" className="sub_but"><span className="but_wr">Add Product</span></button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;
