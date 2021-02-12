import React, {useEffect, useState} from'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';

function AddProductScreen(props){
  
  const [formVisible, setFormVisible ] = useState(false);
  const [name,setName] = useState('');
  const [id,setId] = useState('');
  const [Id,setID] = useState('');
  const [image,setImage] = useState();
  const [price,setPrice] = useState('');
  const [brand,setBrand] = useState('');
  const [category,setCategory] = useState('');
  const [countAvailable,setCountAvailable] = useState('');
  const [description,setDescription] = useState('');
  const  productSave= useSelector(state => state.productSave);
  const {loading: loadingSave, success: successSave, error: errorSave} = productSave;
  const  productList= useSelector(state => state.productList);
  const {loading, products, error} = productList;
  const dispatch = useDispatch();

  const  submitHandler = async(e) =>{
    e.preventDefault();
    const payload = new FormData();
    payload.append("id",id);
    payload.append("name",name);
    payload.append("price",price);
    payload.append("image",image);
    payload.append("brand",brand);
    payload.append("category",category);
    payload.append("countAvailable",countAvailable);
    payload.append("description",description);
    await dispatch(saveProduct(payload));
    await dispatch(listProducts());
  }

  const imagehandler = (e) =>{
    setImage(e.target.files[0]);
  }

  const deleteHandler = async(e) =>{
    e.preventDefault();
    await dispatch(deleteProduct(Id));
    await dispatch(listProducts());
  } 

  const openForm = (product) =>{
    setFormVisible(true);
    setId(product.id);
    setName(product.name);
    setPrice(product.price);
    setBrand(product.brand);
    setCategory(product.category);
    setDescription(product.description);
    setCountAvailable(product.countAvailable);
  }


  useEffect(() =>{
    dispatch(listProducts());
    return () =>{
      //
    };
  },[]);

  return <div>
    <div className="addproductform">
      <h1>Products Dashboard</h1>
      {loadingSave &&<div>Loading</div>}
      {errorSave &&<div>{error}</div>}
      <div className="products-table">
        <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th colSpan="2">Actions</th>
          </tr>
            {
              products.map(product =>(
                <tr key={product._id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td><button className="actionBtn" onClick={() => openForm(product)}>Edit</button></td>
                  <td>
                    <form className="deleteForm" onSubmit={deleteHandler}>
                    <button className= "actionBtn" type="submit" onClick={()=>setID(product._id)}>Delete</button>
                    </form>
                  </td>
                </tr>
                ))
              }
        </tbody>
        </table>
      </div>
      <button className="primaryBtn" onClick={()=>openForm({})}>Add Product</button>
      {
        formVisible &&
          <form  encType="multipart/form-data" onSubmit={submitHandler}>
            {loadingSave?<div>Loading</div>:<div></div>}
            {errorSave?<div>{error}</div>:<div></div>}
            <label>Product Id:</label><br/>
            <input type="text" name="id" id="id" value={id} onChange={(e) => setId(e.target.value)}></input><br/>
            <label>Name of the product:</label><br/>
            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input><br/>
            <label>Image of the product</label><br/>
            <input type="file" id="image" name="image" onChange={imagehandler} required/><br/>
            <label>Price of the product</label><br/>
            <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}></input><br/>
            <label>Brand of the product:</label><br/>
            <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}></input><br/>
            <label>Category of the product:</label><br/>
            <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}></input><br/>
            <label>Product description:</label><br/>
            <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea><br/>
            <label>Number of product in stock:</label><br/>
            <input type="number" name="countAvailable" id="countAvailable" value={countAvailable} onChange={(e) => setCountAvailable(e.target.value)}></input><br/>
          <button className="primaryBtn" name="save">{id ?"Update": "Add"}</button><br/>
          <button className="secondaryBtn" name="back" onClick={() => setFormVisible(false)}>Back</button>
        </form>
      }
      </div>
      </div>
}

export default AddProductScreen;
