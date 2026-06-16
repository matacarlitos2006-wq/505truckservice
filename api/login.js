export default function handler(req, res) {
  const { password } = req.body;
  
  // Replace "YourSecretPassword123" with whatever password you want.
  // Ideally, use a Vercel Environment Variable for security.
  if (password === "YourSecretPassword123") {
    return res.status(200).json({ token: "secure-admin-session-token" });
  }
  
  return res.status(401).json({ error: "Unauthorized" });
}
