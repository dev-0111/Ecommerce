import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://127.0.0.1:5500/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://127.0.0.1:5500/delete-item/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    console.log(result);

    if (result) {
      alert("Deleted Succesfully");
      getProducts();
    }
  };

  const searchProduct = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://127.0.0.1:5500/search/${key}`,{
        headers: {
          "Content-Type": "application/json",
          authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
      })

      result = await result.json();
      if (result) {
        setProducts(result);
      } 
    }
    else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search"
        className="search-box"
        onChange={searchProduct}
        
      />

      <ul>
        <li>S.No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>

      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>delete</button>{" "}
              &nbsp;
              <button>
                <Link to={`/update/${item._id}`}>Update</Link>
              </button>
            </li>
          </ul>
        ))
      ) : (
        <h1>Product Not Found</h1>
      )}
    </div>
  );
};

export default ListProducts;
