import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../services/authApi";
import AuthLayout from "../components/AuthLayout";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const result = await register(form);

    if (result.error) {
      setMessage(
        result.error.data?.message || "Something went wrong. Please try again."
      );
      return;
    }

    navigate("/");
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start organizing your team's work."
      footer={
        <>
          Already have an account? <Link to="/login">Sign in</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="form-stack">
        <label>
          Full name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength="2"
          />
        </label>

        <label>
          Email address
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength="8"
          />
        </label>

        {message && <p className="error-text">{message}</p>}

        <button className="primary-button" disabled={isLoading}>
          {isLoading ? "Please wait..." : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}
