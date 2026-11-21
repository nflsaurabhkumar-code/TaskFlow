import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/authApi";
import AuthLayout from "../components/AuthLayout";

export default function LoginPage() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const result = await login(form);

    if (result.error) {
      setMessage(
        result.error.data?.message || "Something went wrong. Please try again.",
      );
      return;
    }

    navigate("/");
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to TaskFlow."
      footer={
        <>
          New to TaskFlow? <Link to="/register">Create account</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="form-stack">
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
          {isLoading ? "Please wait..." : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
}
