import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPrint, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

const OrdersTable = () => {
    const [orders, setOrders] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/orders');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleDelete = async (orderId) => {
        try {
            await fetch(`http://localhost:5001/api/orders/${orderId}`, {
                method: 'DELETE',
            });
            // Remove the deleted order from the state
            setOrders(orders.filter(order => order._id.$oid !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleEdit = (order) => {
        setEditingId(order._id.$oid);
        setEditedData(order);
    };

    const handleSave = async (orderId) => {
        try {
            // Send edited data to the backend for updating
            await fetch(`http://localhost:5001/api/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
            });
            setEditingId(null);
            setEditedData({});
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleInputChange = (e, fieldName) => {
        setEditedData({ ...editedData, [fieldName]: e.target.value });
    };

    const handlePrint = (orderId) => {
        setSelectedOrderId(orderId);
        window.print();
    };

    const PrintForm = ({ order }) => {
        return (
            <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '300px' }}>
                <h2 style={{ textAlign: 'center', margin: '0' }}>Order Summary</h2>
                <hr style={{ border: '0.5px solid #ccc', margin: '10px 0' }} />
                <div style={{ marginBottom: '10px' }}>
                    <strong>Customer Name:</strong> {order.customerName}<br />
                    <strong>Phone Number:</strong> {order.phoneNumber}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Shipping Details:</strong><br />
                    {order.shippingDetails}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Products:</strong><br />
                    {order.products.map((product, index) => (
                        <div key={index}>
                            {product.name} - Size: {product.size}, Quantity: {product.quantity}, Price: ${product.price}
                        </div>
                    ))}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Total:</strong> ${order.total}
                </div>
                <hr style={{ border: '0.5px solid #ccc', margin: '10px 0' }} />
                <div style={{ textAlign: 'center', fontStyle: 'italic' }}>
                    Thank you for your order!
                </div>
            </div>
        );
    };
    
    return (
        <div> {/* Add horizontal scrollbar if content overflows */}
            <TableContainer component={Paper} style={{ maxWidth: '1050px' ,minHeight:'1500px'}}> 
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Shipping Details</TableCell>
                            <TableCell>Products</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Taxes</TableCell>
                            <TableCell>Subtotal</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id.$oid}>
                                <TableCell>
    {editingId === order._id.$oid ? (
        <TextField
            value={editedData.customerName}
            onChange={(e) => handleInputChange(e, 'customerName')}
        />
    ) : (
        order.customerName
    )}
</TableCell>
<TableCell>
    {editingId === order._id.$oid ? (
        <TextField
            value={editedData.phoneNumber}
            onChange={(e) => handleInputChange(e, 'phoneNumber')}
        />
    ) : (
        order.phoneNumber
    )}
</TableCell>
<TableCell>
    {editingId === order._id.$oid ? (
        <TextField
            value={editedData.shippingDetails}
            onChange={(e) => handleInputChange(e, 'shippingDetails')}
        />
    ) : (
        order.shippingDetails
    )}
</TableCell>
<TableCell>
    {order.products.map((product, index) => (
        <div key={index}>
            {product.name} - Size: {product.size}, Quantity: {product.quantity}, Price: {product.price}
        </div>
    ))}
</TableCell>
<TableCell>{order.total}</TableCell>
<TableCell>{order.taxes}</TableCell>
<TableCell>{order.subTotal}</TableCell>
<TableCell>{order.status}</TableCell>
<TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
<TableCell>
    {editingId === order._id.$oid ? (
        <Button onClick={() => handleSave(order._id.$oid)}>
            <FontAwesomeIcon icon={faSave} />
        </Button>
    ) : (
        <>
            <Button onClick={() => handleEdit(order)}>
                <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button onClick={() => handleDelete(order._id.$oid)}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            <Button onClick={() => handlePrint(order._id.$oid)}>
                <FontAwesomeIcon icon={faPrint} />
            </Button>
        </>
    )}
</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default OrdersTable;
