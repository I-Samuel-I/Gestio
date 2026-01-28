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
      throw new Error("Error: " + response.statusText);
    }

    // IF OK, RETURN DATA
    const data = await response.json();
    return data;
  } catch (error) {
    // GENERIC ERROR CATCH
    console.error("Error during user registration:", error);
    throw error;
  }
}

// API REGISTER USER
export async function registerUser(email: string, password: string, name:string, phone:string, companyName:string) {
  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, phone, companyName }),
    });
    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
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
