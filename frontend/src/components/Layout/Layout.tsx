import { Outlet } from "react-router-dom";
import Navbar from "../UI/Navbar/Navbar";

const Layout: React.FunctionComponent = (): React.ReactElement => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    )
};

export default Layout;
