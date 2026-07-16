import { apiUrl } from "./api";

export type SettingsLanguage = "pt-BR" | "en-US";
export type SettingsTimezone = "America/Sao_Paulo" | "America/New_York";
export type SettingsCompany = {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SettingsPreferences = {
  id: string;
  userId: string;
  emailNotifications: boolean;
  lowStockAlert: boolean;
  dailySummary: boolean;
  language: SettingsLanguage;
  timezone: SettingsTimezone;
};

export async function GetSettingsCompany() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl("/settings/company"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message instanceof Array
          ? errorData.message.join(" ")
          : errorData?.message ?? response.statusText;

      throw new Error(message);
    }

    const data: SettingsCompany = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching settings company:", error);
    throw error;
  }
}

export async function GetSettingsPreferences() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl("/settings/preferences"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message instanceof Array
          ? errorData.message.join(" ")
          : errorData?.message ?? response.statusText;

      throw new Error(message);
    }

    const data: SettingsPreferences = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching settings preferences:", error);
    throw error;
  }
}

export async function UpdateSettingsCompany(
  name: string,
  cnpj: string,
  email: string,
  phone: string,
) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl("/settings/company"), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        cnpj,
        email,
        phone,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message instanceof Array
          ? errorData.message.join(" ")
          : errorData?.message ?? response.statusText;

      throw new Error(message);
    }

    const data: SettingsCompany = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating settings company:", error);
    throw error;
  }
}

export async function UpdateSettingsPreferences(
  emailNotifications: boolean,
  lowStockAlert: boolean,
  dailySummary: boolean,
  language: SettingsLanguage,
  timezone: SettingsTimezone,
) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl("/settings/preferences"), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        emailNotifications,
        lowStockAlert,
        dailySummary,
        language,
        timezone,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message instanceof Array
          ? errorData.message.join(" ")
          : errorData?.message ?? response.statusText;

      throw new Error(message);
    }

    const data: SettingsPreferences = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating settings preferences:", error);
    throw error;
  }
}
