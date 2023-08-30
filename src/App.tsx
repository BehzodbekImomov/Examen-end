import { useAuth } from "./states/auth";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import FrontLayout from "./components/layout/frontLayout";
import AdminDashboardP from "./pages/AdminDashboardP";
import AdminLayout from "./components/layout/adminLayout";
import HomeP from "./pages/HomeP";
import LoginP from "./pages/LoginP";
import UserLayout from "./components/layout/userLayout";
import NotFoundP from "./pages/NotFountP";
import UserRoleP from "./pages/UserRoleP";
import ClientLayout from "./components/layout/clientLayout";
import InformationP from "./pages/InformationP";
import ExperiencesP from "./pages/ExperiencesP";
import SkillsP from "./pages/SkillsP";
import EducationP from "./pages/EducationP";
import PortfoliosP from "./pages/PortfoliosP";
import MessagesP from "./pages/MessagesP";
import AboutP from "./pages/AboutP";


function App() {
  const { isAuthenticated, role } = useAuth();

  


  return (
    <BrowserRouter>
      <Routes>

        {!isAuthenticated&&<Route index element={<LoginP />} />}
        
        {isAuthenticated && role === "admin" && (
          <Route path="/" element={<AdminLayout />}>
            <Route  path="dashboard" element={<AdminDashboardP />} />
          </Route>
        )}
        {isAuthenticated && role === "client" && (
         <>
         <Route path="/client" element={<ClientLayout/>}>
           <Route path="message" element={<MessagesP/>}/>
           <Route path="information" element={<InformationP/>}/>
           <Route path="experiences" element={<ExperiencesP/>}/>
           <Route path="skills" element={<SkillsP/>}/>
           <Route path="education" element={<EducationP/>}/>
           <Route path="partfolios" element={<PortfoliosP/>}/>
         </Route>
         
         </>
        )}

        {isAuthenticated &&role==="client"&&(
           <Route path="/" element={<FrontLayout />}>
            
           <Route path="home" element={<HomeP />} />
           <Route path="about" element={<AboutP />} />

         </Route>
        )}
        {isAuthenticated && role === "user" && (
          <Route path="/" element={<UserLayout />}>
            <Route path="client" element={<UserRoleP />} />
          </Route>
        )}
         <Route path="*" element={<NotFoundP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;