export const metadata = {
  title: "Voices of the Fathers",
  description: "Query Church Fathers through their own writings using semantic retrieval",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
