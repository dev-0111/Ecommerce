import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {

    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    // const [userId, setUserId] = useState('');
    const [company, setCompany] = useState('');
    const [error,setError] = useState(false)

    const [product,setProduct] = useState([])

    const params = useParams();

    const user = JSON.parse(localStorage.getItem('user'))


    useEffect(() => {
        getProduct()
    },[])

    const getProduct = async () => {

        let result = await fetch(`http://127.0.0.1:5500/product/${params.id}`, {

            method:'GET',
            headers: {
                "Content-Type": "application/json",
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
              },

        });

        result = await result.json()
        console.log(result)
        setProduct(result)
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
        
    }


    const updateProduct = async () => {

        if(!name || !price || !category || !company)
            {
                setError(true)
                return false
            }

        
        let result = await fetch(`http://127.0.0.1:5500/update-product/${params.id}`, {

            method:'PUT',
            body:JSON.stringify({name,price,category,company}),
            headers: {
                "Content-Type": "application/json",
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
              },

        });

        result = await result.json()
        console.log(result)

        if(result)
            {
                alert("Product Updated SuccessFully!")
                console.log("Product Updated SuccessFully!")
                getProduct()
            }

    }

    return(
        <div className="update-product">
              <h1>
                Update Product
            </h1>

            <input className = 'input-box' type='text' value={name} onChange = {(e) => setName(e.target.value)} placeholder='Enter Name' />
            {error && !name &&<span className="inputError">Enter Valid Name</span>}
            <input className = 'input-box' type='text' value={price} onChange = {(e) => setPrice(e.target.value)} placeholder='Enter Price' />
            {error && !price &&<span className="inputError">Enter Valid Price</span>}
            <input className = 'input-box' type='text' value={category} onChange = {(e) => setCategory(e.target.value)} placeholder='Enter Category' />
            {error && !category &&<span className="inputError">Enter Valid Category</span>}
            <input className = 'input-box' type='text' value={company} onChange = {(e) => setCompany(e.target.value)} placeholder='Enter Company' />
            {error && !company &&<span className="inputError">Enter Valid Company</span>}
            <button className = 'updateProduct-btn' onClick = {() => {updateProduct()}}type='button'>Update Product</button>
        </div>
    )
}

export default UpdateProduct