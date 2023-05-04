
import { useEffect, useState, useRef, useMemo } from "react";
import { ProductRating } from '..';
import { NavBar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";



//paginate the table to show 10 products per page
function TablePagination({ products }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(1);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Sort the products array based on the selected sort column and direction
  const sortedProducts = useMemo(() => {
    if (!sortColumn) {
      return products;
    }

    const sortFactor = sortDirection === 1 ? 1 : -1;
    return [...products].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) {
        return -1 * sortFactor;
      } else if (a[sortColumn] > b[sortColumn]) {
        return 1 * sortFactor;
      } else {
        return 0;
      }
    });
  }, [products, sortColumn, sortDirection]);

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Update the sort column and direction when a table header is clicked
  const handleSortClick = (column) => {
    if (column === sortColumn) {
      // Reverse the sort direction if the same column is clicked
      setSortDirection(sortDirection * -1);
    } else {
      // Sort by the clicked column in ascending order
      setSortColumn(column);
      setSortDirection(1);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead className=" text-light ">
          <tr>
            <th
              scope="col"
              className=" font-mainfont border text-lg bg-primary"
              onClick={() => handleSortClick("product_id")}
            >
              Product ID {sortColumn === "product_id" && sortDirection === 1 && <>&#x25BC;</>}
              {sortColumn === "product_id" && sortDirection === -1 && <>&#x25B2;</>}
            </th>
            <th
              scope="col"
              className="font-mainfont border text-lg bg-primary"
              onClick={() => handleSortClick("product_name")}
            >
              Product Name {sortColumn === "product_name" && sortDirection === 1 && <>&#x25BC;</>}
              {sortColumn === "product_name" && sortDirection === -1 && <>&#x25B2;</>}
            </th>
            <th
              scope="col"
              className="font-mainfont border text-lg bg-primary"
              onClick={() => handleSortClick("product_price")}
            >
              Product Price {sortColumn === "product_price" && sortDirection === 1 && <>&#x25BC;</>}
              {sortColumn === "product_price" && sortDirection === -1 && <>&#x25B2;</>}
            </th>
                            <th scope="col" className="font-mainfont border text-lg bg-primary"
                            onClick={() => handleSortClick("product_tradeval")}
                            >Product Trade Value
                            {sortColumn === "product_tradeval" && sortDirection === 1 && <>&#x25BC;</>}
                            </th>

                            <th scope="col" className="font-mainfont border text-lg bg-primary"
                            onClick={() => handleSortClick("product_platform")}
                            >Product Platform
                            {sortColumn === "product_platform" && sortDirection === 1 && <>&#x25BC;</>}
                            </th>

                            <th scope="col" className="font-mainfont border text-lg bg-primary"
                            onClick={() => handleSortClick("product_rating")}
                            >Product Rating
                            {sortColumn === "product_rating" && sortDirection === 1 && <>&#x25BC;</>}
                            </th>

                            <th scope="col" className="font-mainfont border text-lg bg-primary"
                            onClick={() => handleSortClick("product_description")}
                            >Product Description
                            {sortColumn === "product_description" && sortDirection === 1 && <>&#x25BC;</>}
                            </th>

                            
                   
                </tr>
            </thead>
            <tbody>
                {currentProducts.map((product) => (
                    <tr key={product.product_id}>
                           <td className="font-mainfont border text-lg">{product.product_id}</td>
                                    <td className="font-mainfont border text-lg">{product.product_name}</td>
                                    <td className="font-mainfont border text-lg">${product.product_price}</td>
                                    <td className="font-mainfont border text-lg">${product.product_tradeval}</td>
                                    <td className="font-mainfont border text-lg">{product.product_platform}</td>
                                    <td className="text-base border text-tertiary ">
      <ProductRating rating={product.product_rating} />
      </td>
      <td className="border font-mainfont text-lg">{product.product_description}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="4">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <button

                                onClick={() => paginate(currentPage + 1)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                                disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                            >
                                Next
                            </button>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
        </div>
    );
}


  
        

export default function Home() {
  const productNameRef = useRef();
  const productPriceRef = useRef();
  const productIDToDeleteRef = useRef();
  const productIDToUpdateRef = useRef();
  const productPriceToUpdateRef = useRef();
  const productNameToUpdateRef = useRef();
  const [products, setProducts] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [updatedError, setUpdatedError] = useState(false);
  const [created, setCreated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deletedError, setDeletedError] = useState(false);

  async function addProduct() {
    const productName = productNameRef.current.value.trim();
    if (productName.length < 3) return;
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name: productName,
        product_price: productPrice,

      }),
    };
    if (productName.length < 3) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}../../api/products`,
      postData
    );
    const response = await res.json();
    console.log(response);
    if (response.response.message !== "success") return;
    const newproduct = response.response.product;
    setProducts([
      ...products,
      {
        product_id: newproduct.product_id,
        product_name: newproduct.product_name,
        product_price: newproduct.product_price,
      },
    ]);
    setCreated(true);
  }

  async function getProducts() {
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}../../api/products`,
      postData
    );

    const response = await res.json();
    setProducts(response.products);
    console.log(response);
  }

  async function deleteProduct(id) {
    if (!id) return;
    const postData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: id,
      }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}../../api/products`,
      postData
    );
    const response = await res.json();
    console.log(response.response);
    if (response.response.message === "error") return setDeletedError(true);
    const idToRemove = parseFloat(response.response.product_id);
    setProducts(products.filter((a) => a.product_id !== idToRemove));
    setDeleted(true);
  }

  async function updateProduct() {
    const productIDToUpdate = productIDToUpdateRef.current.value.trim();
    const productNameToUpdate = productNameToUpdateRef.current.value.trim();
    const productPriceToUpdate = productPriceToUpdateRef.current.value.trim();

    if (!productIDToUpdate.length) return;
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productIDToUpdate,
        product_name: productNameToUpdate,
        product_price: productPriceToUpdate,
      }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}../../api/products`,
      postData
    );
    const response = await res.json();
    if (response.response.message === "error") return setUpdatedError(true);
    // if (response.response.message !== "success") return;
    const productIdUpdated = parseFloat(response.response.product.product_id);
    const productUpdatedName = response.response.product.product_name;
    const productUpdatedPrice = response.response.product.product_price;
    //updating state
    const productsStateAfterUpdate = products.map((product) => {
      if (product.product_id === productIdUpdated) {
        const productUpdated = {
          ...product,
          product_name: productUpdatedName,
            product_price: productUpdatedPrice,


        };
        return productUpdated;
      } else {
        return {
          ...product,
        };
      }
    });
    setUpdated(true);
    setProducts(productsStateAfterUpdate);

  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
<main className="bg-base-200">
    <NavBar></NavBar>
    <div className="container my-12 mx-20 bg-base-200" >      <h1 className="leading-none text-secondary font-mainfont text-6xl lg:text-5xl font-bold">Super Secret Admin Page</h1>

       
    <div className="flex flex-col w-full lg:flex-row mt-6">
  <div className="grid flex-grow h-content card bg-base-300 rounded-box place-items-center py-6"><div className="col">
  <h2
  className="text-xl font-bold  text-secondary mb-4"
  >Update Products</h2> 
                <div className="mb-3">
                    <label htmlFor="product_id_to_update" className="form-label">Product ID:</label>
                    <input type="text" className="bg-base-200 form-control" id="product_id_to_update" ref={productIDToUpdateRef} />
                </div>
                <div className="mb-3">
                    <label htmlFor="product_name_to_update" className="form-label">Product Name:</label>
                    <input type="text" className="bg-base-200 form-control" id="product_name_to_update" ref={productNameToUpdateRef} />
                </div>
                <div className="mb-3">
                    <label htmlFor="product_price_to_update" className="form-label">Product Price:</label>
                    <input type="text" className="bg-base-200 form-control" id="product_price_to_update" ref={productPriceToUpdateRef} />
                </div>


                <button className="btn btn-primary bg-secondary 
                border-none
                " onClick={updateProduct}>Update Product</button>
                {updated && <p className="text-success">Product updated successfully</p>}
                {updatedError && <p className="text-danger">Product update failed</p>}
            </div></div> 
  <div className="divider lg:divider-horizontal"></div> 


  <div className="grid flex-grow h-content py-6 card bg-base-300 rounded-box place-items-center">  <div className="col">
  <h2
  className="text-xl font-bold  text-secondary mb-4"
  >Add Products</h2>
                <div className="mb-3">
                    <label htmlFor="product_name" className="form-label">Product Name</label>
                    <input type="text" className="form-control" id="product_name" ref={productNameRef} />
                </div>
                <button className="btn btn-primary bg-green-500 border-none" onClick={addProduct}>Add Product</button>
                {created && <p className="text-success">Product created successfully</p>}
            </div></div>

  <div className="divider lg:divider-horizontal"></div> 


  <div className="grid flex-grow h-content py-12 card bg-base-300 rounded-box place-items-center">   <div className="col">
                <h3>Delete Product</h3>
                <div className="mb-3">
                    <label htmlFor="product_id_to_delete" className="form-label">Product ID</label>
                    <input type="text" className="form-control" id="product_id_to_delete" ref={productIDToDeleteRef} />
                </div>
                <button className="btn btn-primary bg-red-500 border-none" onClick={() => deleteProduct(productIDToDeleteRef.current.value)}>Delete Product</button>
                {deleted && <p className="text-success">Product deleted successfully</p>}
                {deletedError && <p className="text-danger">Product delete failed</p>}
            </div></div>
</div>

            
                <h3 className="mt-12">Products</h3>
                <TablePagination products={products} />

         
            </div>
        
 
    <Footer></Footer>
    </main>
    );
}