export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  available: boolean;
}


// API POST PRODUCTS
export async function PostProducts(
  name: string,
  price: number,
  stock: number,
  available: boolean,
  category: string,
) {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        price: price,
        stock: stock,
        available: available,
        category: category
      }),
    });
    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during product creation:", error);
  }
}

// API GET PRODUCTS
export async function GetProducts() {
  try {
    const token = localStorage.getItem("token"); // GET TOKEN FROM LOCAL STORAGE
    const response = await fetch("http://localhost:3000/products", {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
   
    if (!response.ok) {
        throw new Error("Error: " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
