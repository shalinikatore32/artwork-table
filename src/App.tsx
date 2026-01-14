import { ArtworkTable } from "./components/ArtworkTable";

function App() {
  return (
    <div style={{ padding: "1rem", alignItems: "center", textAlign: "center" }}>
      <h2>Artwork data from the Art Institute of Chicago</h2>
      <ArtworkTable />
    </div>
  );
}

export default App;
