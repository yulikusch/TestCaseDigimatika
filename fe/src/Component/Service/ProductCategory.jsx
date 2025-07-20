import { BASE_API_URL } from "../Service/BaseUr";

const API_URL = BASE_API_URL + "/product-category";
const getToken = () => {
  return localStorage.getItem("token");
};

export async function getData() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

export async function postData(formData) {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`
        );
      } else {
        const errorText = await response.text();
        throw new Error(
          errorText || `Error ${response.status}: ${response.statusText}`
        );
      }
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error("Error during postData:", error);
    throw error;
  }
}

export async function UpdateData(id, updateData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(updateData),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal memperbarui data.");
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Gagal memperbarui data.");
      }
    }
  } catch (error) {
    console.error("Error during UpdateData:", error);
    throw error;
  }
}

export async function Delete(selectedId) {
  try {
    const response = await fetch(`${API_URL}/${selectedId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Response:", result);
    } else {
      console.error(
        "Failed to delete berita. Status:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
