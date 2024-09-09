import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [member, setMember] = useState({
    memberId: "",
    memberPw: "",
  });
  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };
  const login = () => {
    if (member.memberId === "" || member.memberPw === "") {
      Swal.fire({
        text: "아이디 또는 비밀번호를 입력하세요",
        icon: "info",
      });
      return;
    }
    axios
      .post(`${backServer}/member/login`, member)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          text: "아이디 또는 비밀번호를 확인하세요",
          icon: "warning",
        });
      });
  };
  return (
    <section className="section">
      <h3>로그인</h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <div>
            <label htmlFor="memberId">아이디</label>
            <input
              type="text"
              name="memberId"
              id="memberId"
              value={member.memberId}
              onChange={changeMember}
            />
          </div>
          <div>
            <label htmlFor="memberPw">비밀번호</label>
            <input
              type="password"
              name="memberPw"
              id="memberPw"
              value={member.memberPw}
              onChange={changeMember}
            />
          </div>
          <div>
            <button type="submit">로그인</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
