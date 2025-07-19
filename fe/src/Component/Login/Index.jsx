import React, { useState } from "react";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import { login } from "../Service/Auth"; // Pastikan path ini benar

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    position: "relative",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid white",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto",
  },
};

// Keyframes animasi spinner
const globalStyle = `
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
`;

function Login() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // ✅ Ambil email dan password dari form
      const { email, password } = form;
      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("name", data.name);
      localStorage.setItem("level", data.level);

      window.location.href = "/dashboard";
    } catch (error) {
      Swal.fire({
        title: "Login Gagal",
        text: error.message || "Terjadi kesalahan saat login",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{globalStyle}</style>
      <div style={styles.container}>
        <form style={styles.form} onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? <div style={styles.spinner}></div> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
