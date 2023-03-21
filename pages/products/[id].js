import {useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';


export default function Home () {
  const router = useRouter();
  const { id } = router.query;
  const [dataResponse, setDataResponse] = useState([]);

    useEffect(() => {   
        async function getPageData() {
            const apiUrlEndpoint = `http://localhost:3000/api/products`;
            const postData = {
            method: "Post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id 
            }),

        };
            const response = await fetch(apiUrlEndpoint, postData);
            const res = await response.json();
            setDataResponse(res.products);
        }
        getPageData();
    }, [router.query.id, router.isReady]);

    return (
        <div>
            {dataResponse.map (product => (
                <div key={product.id}>
                     <div>
      <h1>{product.product_name}</h1>
      <p>{product.product_description}</p>
      <p>{product.product_price}</p>
    </div>
                </div>
            ))}
        </div>
    )
}



