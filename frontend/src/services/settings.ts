export type SettingsProfile = {
  userId: string;
  ownerName: string;
  companyName: string;
  contactEmail: string;
  phone: string;
  role?: string;
  companyDocument: string;
  language: string;
  timezone: string;
};

export async function GetSettingsProfile() {
  try {
    const token = localStorage.getItem("token");

    const userResponse = await fetch("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error("Error: " + userResponse.statusText);
    }

    const userData = await userResponse.json();

    const detailsResponse = await fetch(
      `http://localhost:3000/users/${userData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!detailsResponse.ok) {
      throw new Error("Error: " + detailsResponse.statusText);
    }

    const detailsData = await detailsResponse.json();

    const profile: SettingsProfile = {
      userId: detailsData.id,
      ownerName: detailsData.name ?? "",
      companyName: detailsData.company ?? userData.company ?? "",
      contactEmail: detailsData.email ?? userData.email ?? "",
      phone: detailsData.phone ?? "",
      role: detailsData.role ?? userData.role,
      companyDocument: "",
      language: "",
      timezone: "",
    };

    return profile;
  } catch (error) {
    console.error("Error fetching settings profile:", error);
  }
}

// API UPDATE SETTINGS
export async function UpdateSettingsProfile(
  userId: string,
  ownerName: string,
  contactEmail: string,
  phone: string,
  companyName: string,
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
      name: ownerName,
      email: contactEmail,
      phone: phone,
      company: companyName,
    };

    if (password && password.trim() !== "") {
      body.password = password;
    }

    const response = await fetch(`http://localhost:3000/users/${userId}`, {
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
    console.error("Error updating settings profile:", error);
  }
}
