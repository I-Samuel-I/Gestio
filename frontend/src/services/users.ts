export type UserRole =
  | "gerente"
  | "supervisor"
  | "vendas"
  | "financeiro";

export type UserStatus = "active" | "inactive" | "pending";

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
    const response = await fetch(`http://localhost:3000/users/${id}`, {
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

    const response = await fetch(`http://localhost:3000/users/${id}`, {
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
  companyName: string,
) {
  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
        companyName: companyName,
      }),
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
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
    const response = await fetch("http://localhost:3000/users", {
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
    const response = await fetch(`http://localhost:3000/users/${id}`, {
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
