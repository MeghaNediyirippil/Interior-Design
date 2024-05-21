import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { agentproductbookinglistApi } from '../Services/allApis';

function AgentViewBooking() {
    const [clickedButtons, setClickedButtons] = useState({});
    const [allProducts, setAllProducts] = useState(null);
    const token = localStorage.getItem("token");

    const handleClick = (index) => {
        setClickedButtons(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const getProductsbookinglist = async () => {
        const id = localStorage.getItem("agentId");
        const reqHeader = {
            Authorization: `Bearer ${token}`
        };

        try {
            const response = await agentproductbookinglistApi(id, reqHeader);
            setAllProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProductsbookinglist();
    }, []);

    return (
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
            <div className='row ' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className='col-md-8'>
                    <table className='container table mt-5 rounded shadow border'>
                        <thead>
                            <tr className='text-center'>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact No</th>
                                <th>Address</th>
                                <th>Product Name</th>
                                <th>Product Image</th>
                                <th>Confirm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProducts && allProducts.length > 0 && allProducts.map((product, index) => (
                                <tr key={index}>
                                    <td className='text-center'>{product.name}</td>
                                    <td className='text-center'>{product.email}</td>
                                    <td className='text-center'>{product.contact_no}</td>
                                    <td className='text-center'>{product.address}</td>
                                    <td className='text-center'>{product.product.name}</td>
                                    <td> <img src={product.product.photo} width={'100px'} height={'100px'} alt="" /></td>
                                    <td>
                                        <button className={`btn p-4`} onClick={() => handleClick(index)}>
                                            <i className={`fa-solid fa-check text-${clickedButtons[index] ? 'success' : 'danger'}`} style={{ fontSize: '30px' }}></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AgentViewBooking;
