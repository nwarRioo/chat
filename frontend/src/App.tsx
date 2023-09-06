import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { Container } from "./components/UI/Container/Container";
import RegistrationPage from "./containers/RegistrationPage/RegistrationPage";
import LoginPage from "./containers/LoginPage/LoginPage";

const App = () => {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Container><h1>MAIN PAGE</h1></Container>} />
        <Route path={"/register"} element={<RegistrationPage/>} />
        <Route path={"/auth"} element={<LoginPage/>} />
      </Route>
    </Routes>
  )
};

export default App;
