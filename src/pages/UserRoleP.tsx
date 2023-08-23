import { Button } from "antd"
import "./page.scss"
import { useAuth } from "../states/auth";
import { useNavigate } from "react-router-dom";
const UserRoleP = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="container position-relative">

      <div className="user-role-card">
        <p>
          Your role is user.If the admin update your role to client,then you can add your experiences,skils,education,portfolios.To update your role,you can apply to the adminLayout
        </p>
        <span>Tel:+998 99 940 08 07</span>

      </div>
      <Button className="userLogout" type="primary" danger  onClick={() => logout(navigate)}>
                    Logout－＞
                  </Button>
      </div>
      
  )
}

export default UserRoleP