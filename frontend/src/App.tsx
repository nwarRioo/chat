import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { Container } from "./components/UI/Container/Container";

const App = () => {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Container><h1>MAIN PAGE</h1></Container>} />
        <Route path="/login" element={<Container><h1>LOGIN PAGE</h1></Container>} />
        <Route path="/register" element={<Container><h1>REGISTER PAGE</h1></Container>} />
      </Route>
    </Routes>
  )
};

export default App;
