import { useState } from "react"

const AddProduct = () => {

    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    // const [userId, setUserId] = useState('');
    const [company, setCompany] = useState('');
    const [error,setError] = useState(false)

    const user = JSON.parse(localStorage.getItem('user'))
    
    

    
    
    const addProduct = async() => {

        if(!name || !price || !category || !company)
        {
            setError(true)
            return false
        }


        const userId = user._id;    
        let result = await fetch("http://127.0.0.1:5500/add-product", {
            method:'POST',
            body:JSON.stringify({name,price,category,userId,company}),
            headers: {
                "Content-Type": "application/json",
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
              },

        });

        result = await result.json()
        if(result)
        {
            alert("Product Added SuccessFully!")
            
            setName('')
            setCategory('')
            setCompany('')
            setPrice('')
        }
    }
    return(
        <div className="add-product">
            <h1>
                Add Product
            </h1>

            <input className = 'input-box' type='text' value={name} onChange = {(e) => setName(e.target.value)} placeholder='Enter Name' />
            {error && !name &&<span className="inputError">Enter Valid Name</span>}
            <input className = 'input-box' type='text' value={price} onChange = {(e) => setPrice(e.target.value)} placeholder='Enter Price' />
            {error && !price &&<span className="inputError">Enter Valid Price</span>}
            <input className = 'input-box' type='text' value={category} onChange = {(e) => setCategory(e.target.value)} placeholder='Enter Category' />
            {error && !category &&<span className="inputError">Enter Valid Category</span>}
            <input className = 'input-box' type='text' value={company} onChange = {(e) => setCompany(e.target.value)} placeholder='Enter Company' />
            {error && !company &&<span className="inputError">Enter Valid Company</span>}
            <button className = 'addProduct-btn' onClick = {() => {addProduct()}}type='button'>Add Product</button>


        </div>
    )
}

export default AddProduct