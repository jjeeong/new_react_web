import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header>
      <div className="overlay">
        <h1>
          <Link to="/">Jeongwon Site</Link>
        </h1>
        <h3>하고싶지가 않아</h3>
        <p>회원가입 사이트</p>
        <br />
        <div className="header-btns">
          <Link className="header-btn" to="/login">
            로그인
          </Link>
          <Link className="header-btn" to="/join">
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
