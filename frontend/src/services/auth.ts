
// API LOGIN USER
export async function loginUser(email: string, password: string) {

  try {
    // HAD CALL TO BACKEND LOGIN API
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // VERIFY RESPONSE FOR SERVER ERRORS
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message instanceof Array
          ? errorData.message.join(" ")
          : errorData?.message ?? response.statusText;

      throw new Error(message);
    }

    // IF OK, RETURN DATA
    const data = await response.json();

    localStorage.setItem("token", data.access_token); // SAVE TOKEN IN LOCAL STORAGE
    return data;
  } catch (error) {
    // GENERIC ERROR CATCH
    console.error("Error during user registration:", error);
    throw error;
  }
}

// API REGISTER USER
export async function registerUser(
  email: string,
  password: string,
  name: string,
  phone: string,
  company: string,
) {
  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, phone, company }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message instanceof Array
          ? errorData.message.join(" ")
          : errorData?.message ?? response.statusText;

      throw new Error(message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
}

// API AUTH USER
export async function authUser(token: string) {
  try {
    const response = await fetch("http://localhost:3000/auth/me", {
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
    console.error("Error during user authentication:", error);
  }
}


export function logoutUser(){
  localStorage.removeItem("token");
}
