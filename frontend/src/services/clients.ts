export type Client = {
  id: string;
  name: string;
  document_type: "CPF" | "CNPJ";
  document: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  address: string;
  status: "ativo" | "inativo" | "pendente";
  total_purchases: number;
};

export async function DeleteClient(id: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/customers/${id}`, {
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
    console.error("Error deleting client:", error);
  }
}

export async function UpdateClient(
  id: string,
  name: string,
  document_type: "CPF" | "CNPJ",
  document: string,
  email: string,
  phone: string,
  state: string,
  city: string,
  address: string,
  status: "ativo" | "inativo" | "pendente",
) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/customers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        document_type: document_type,
        document: document,
        email: email,
        phone: phone,
        state: state,
        city: city,
        address: address,
        status: status,
      }),
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating client:", error);
  }
}

export async function PostClients(
  name: string,
  document_type: "CPF" | "CNPJ",
  document: string,
  email: string,
  phone: string,
  state: string,
  city: string,
  address: string,
  status: "ativo" | "inativo" | "pendente",
) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/customers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        document_type: document_type,
        document: document,
        email: email,
        phone: phone,
        state: state,
        city: city,
        address: address,
        status: status,
      }),
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during client creation:", error);
  }
}

export async function GetClients() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/customers", {
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
    console.error("Error fetching clients:", error);
  }
}

export async function GetClientById(id: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/customers/${id}`, {
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
    console.error("Error fetching client:", error);
  }
}
