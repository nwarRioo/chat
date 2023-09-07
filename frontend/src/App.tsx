import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import RegistrationPage from "./containers/RegistrationPage/RegistrationPage";
import LoginPage from "./containers/LoginPage/LoginPage";
import TopicsPage from "./containers/TopicsPage/TopicsPage";

const App = () => {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<TopicsPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path={"/register"} element={<RegistrationPage/>} />
        <Route path={"/auth"} element={<LoginPage/>} />
      </Route>
    </Routes>
  )
};

export default App;
