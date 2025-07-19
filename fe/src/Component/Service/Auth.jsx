import { BASE_API_URL } from "../Service/BaseUr";

const API_URL = BASE_API_URL + "/auth";

// Fungsi untuk login
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login gagal");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk register
export const register = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",

      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // console.error('Error during registration:', error);
    throw error;
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("level");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
