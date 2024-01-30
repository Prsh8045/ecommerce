import React, {  useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";



const CategoryProduct = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategoy] = useState([]);
  const params = useParams();
  const navigate=useNavigate()
  const [loading, setLoading] = useState(1);
  const [page,setPage]=useState(0)
  const [total, setTotal] = useState(0);


  // console.log("products..........",products)

  useEffect(() => {
    if (params?.slug) getProductbyCategory();
  }, [params?.slug]);

  const getProductbyCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProduct(data?.product);
      setCategoy(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  // Load more 
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProduct([...product, ...data?.product]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h5 className="text-center">Category: {category?.name}</h5>
        <h6 className="text-center">{product?.length} Result Found</h6>
      <div className="row">
      <div className="col-md-8 offset-1" >
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap">
            {product?.map((p) => (
              // console.log('price...........',product),
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  // dynamic exice
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 20)}...
                  </p>
                  <p className="card-text">Rs{p.price}</p>
                  <button
                    class="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {product && product.length <= total && (
              // console.log("length.........",product),
              <button
                className="btn btn-warning"
                onClick={async (e) => {
                  e.preventDefault();
                  setPage(page + 1);
                  await loadMore();
                  // console.log("product........",product)
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>

      </div>
    </Layout>
  );
};

export default CategoryProduct;
