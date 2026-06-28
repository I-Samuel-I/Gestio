import { apiUrl } from "./api";
export type Product = {
  id: string | number;
  name: string;
  category: string;
  price: number;
  stock: number;
  available: boolean;
};

export async function DeleteProduct(id: string | number) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl(`/products/${id}`), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting product:", error);
  }
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
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl("/products"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        price: price,
        stock: stock,
        available: available,
        category: category,
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
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl("/products"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

// API UPDATE PRODUCTS
export async function UpdateProducts(
  id: string | number,
  name: string,
  price: number,
  stock: number,
  available: boolean,
  category: string,
) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl(`/products/${id}`), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        price: price,
        stock: stock,
        available: available,
        category: category,
      }),
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
  }
}
