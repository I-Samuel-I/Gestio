import { apiUrl } from "./api";
export type UserRole =
  | "gerente"
  | "supervisor"
  | "vendas"
  | "financeiro";

export type UserStatus = "ativo" | "inativo" | "pendente";

export type User = {
  id: string;
  name: string;
  email: string;
  companyName?: string;
  role: UserRole;
  status: UserStatus;
  company?: string;
  phone?: string;
  isActive: boolean;
  createdAt?: string;
};

export async function DeleteUser(id: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl(`/users/${id}`), {
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
    console.error("Error deleting user:", error);
  }
}

export async function UpdateUser(
  id: string,
  name: string,
  email: string,
  phone: string,
  company: string,
  password?: string,
) {
  try {
    const token = localStorage.getItem("token");
    const body: {
      name: string;
      email: string;
      phone: string;
      company: string;
      password?: string;
    } = {
      name: name,
      email: email,
      phone: phone,
      company: company,
    };

    if (password && password.trim() !== "") {
      body.password = password;
    }

    const response = await fetch(apiUrl(`/users/${id}`), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

export async function PostUsers(
  name: string,
  email: string,
  password: string,
  phone: string,
  company: string,
) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl("/users"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
        company: company,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message instanceof Array
          ? errorData.message.join(" ")
          : errorData?.message ?? response.statusText;

      throw new Error("Error: " + message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during user creation:", error);
  }
}

export async function GetUsers() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl("/users"), {
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
    console.error("Error fetching users:", error);
  }
}

export async function GetUserById(id: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl(`/users/${id}`), {
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
    console.error("Error fetching user:", error);
  }
}
