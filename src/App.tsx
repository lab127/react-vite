import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {
  return (
    <div>
      <Alert>
        Hello <strong>World</strong>
      </Alert>
      <Button color="success" onClick={() => console.log("Klik")}>
        Primary
      </Button>
    </div>
  );
}

export default App;
