// app/page.tsx
// ✅ Runs entirely on the SERVER (no "use client")

export default async function Page() {
  try {
    // 🧩 These fetch() calls run in Node.js (Next.js 15 server runtime)
    const helloRes = await fetch("http://backend:3000/api/hello", {
      // Ensures fresh data (no static caching)
      cache: "no-store",
    });
    const helloData = await helloRes.json();

    const usersRes = await fetch("http://backend:3000/api/users", {
      cache: "no-store",
    });
    const usersData = await usersRes.json();

    // ✅ This page is rendered on the server, then sent as HTML to browser
    return (
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>🎓 Docker Labs – Full-Stack App (Next.js 15, Server Rendered)</h1>

        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "#e6f7ff",
            borderRadius: "4px",
          }}
        >
          <strong>Backend says:</strong> {helloData.message}
        </div>

        <div style={{ marginTop: "1rem" }}>
          <h2>👥 Users (from /api/users):</h2>
          <ul>
            {usersData.map((user: any) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching backend:", error);
    return (
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>🎓 Docker Labs – Full-Stack App (Next.js 15)</h1>
        <p style={{ color: "red" }}>
          ❌ Failed to connect to backend. Is it running?
        </p>
      </main>
    );
  }
}
