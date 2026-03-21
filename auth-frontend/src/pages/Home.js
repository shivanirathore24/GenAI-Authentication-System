import { useEffect, useState } from "react";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
    }
  }, []);

  return (
    <div className="container mt-5 text-center">
      {/* Welcome Section */}
      <h3 className="mb-2 fw-semibold">Welcome, {user?.email} 👋</h3>

      <p className="text-muted">
        You have successfully logged into your account.
      </p>

      {/* Info Card */}
      <div
        className="card p-4 shadow mt-4 mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <h5 className="mb-3">Account Details</h5>

        <p>
          <strong>User ID:</strong> {user?.id}
        </p>

        <p className="text-muted small">
          Keep your account secure and never share your credentials.
        </p>
      </div>
    </div>
  );
}

export default Home;
