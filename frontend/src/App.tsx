import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import RegistrationPage from "./containers/RegistrationPage/RegistrationPage";
import LoginPage from "./containers/LoginPage/LoginPage";
import TopicsPage from "./containers/TopicsPage/TopicsPage";
import DetailedTopicPage from "./containers/DetailedTopicPage/DetailedTopicPage";
import PrivateRoute from "./utils/PrivateRoute";
import AddTopicPage from "./containers/AddTopicPage/AddTopicPage";

const App = () => {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={"/register"} element={<RegistrationPage/>} />
        <Route path={"/auth"} element={<LoginPage/>} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<TopicsPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:id" element={<DetailedTopicPage />} />
          <Route path="/add-topic" element={<AddTopicPage/>} />
        </Route>
        <Route path="*" element={<h1>NOT FOUND</h1>} />
      </Route>
    </Routes>
  )
};

export default App;
