import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Header/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListProducts from "./Components/Product/ListProducts";
import AddProduct from "./Components/Product/AddProduct";
import UpdateProduct from "./Components/Product/UpdateProduct";
import Footer from "./Components/Footer/Footer";
import SignUp from "./Components/Auth/SignUp";
import Validation from "./Components/Auth/Validation";
import SignIn from "./Components/Auth/SignIn";
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<Home />} />

          <Route element={<Validation />}>
            <Route path="/products" element={<ListProducts />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<ListProducts />} />
            <Route path="/profile" element={<ListProducts />} />
            
          </Route>
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
