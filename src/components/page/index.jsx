export default function Page({ title, children }) {
  document.title = `${title} - Real Moevan`;

  return <>{children}</>;
}
