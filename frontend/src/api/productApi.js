const PRODUCT_BASE = "/api/auth/product";

//
export async function addProduct(products) {
  const token = localStorage.getItem("verdana_admin_token");

  const res = await fetch(PRODUCT_BASE, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bear${token}`,
    },
    body: JSON.stringify(products),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || " failed to save product");
  }
  return res.json();
}
//

export async function fetchProducts(){
  const res= await fetch("/api/product/getProduct")
  if(!res.ok){
     const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Failed to load products");
  }
  return res.json();
}
//
export  async function getProductById(id) {
  const res = await fetch(`/api/product/${id}`);

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Product not found");
  }

  return res.json();
}

export  async function updateProduct(id, product) {
  const token = localStorage.getItem("verdana_admin_token");

  const res = await fetch(`PRODUCT_BASE/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Failed to update product");
  }

  return res.json();
}

export async function deleteProduct(id){
  
  const res = await fetch(`/api/product/delete/${id}`,{method:"DELETE",});
  if(!res.ok){
    const errData = await res.json().catch(()=>({}));
    throw new Error(errData.error || "Product Not Found"); 
  }
  return res.json();
}