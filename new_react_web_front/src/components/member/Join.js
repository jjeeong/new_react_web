import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./member.css";
import Swal from "sweetalert2";

const Join = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [member, setMember] = useState({
    memberId: "",
    memberPw: "",
    memberName: "",
    memberPhone: "",
  });
  const [idCheck, setIdCehck] = useState(0);
  const checkId = () => {
    const idReg = /^[a-zA-Z0-9]{4,8}$/;
    if (!idReg.test(member.memberId)) {
      setIdCehck(2); //idReg조건에 안맞을 때
    } else {
      axios
        .get(`${backServer}/member/memberId/${member.memberId}/check-id`)
        .then((res) => {
          console.log(res);
          if (res.data === 1) {
            setIdCehck(3); //이미 사용중인 아이디
          } else if (res.data === 0) {
            setIdCehck(1); //사용 가능한 아이디
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const changeMember = (e) => {
    const name = e.target.name; //해당 타겟의 name을 받아옴
    setMember({ ...member, [name]: e.target.value }); //해당 name에 해당 value를 넣음
  };

  const [memberPwRe, setMemberPwRe] = useState("");
  const changeMemberPwRe = (e) => {
    setMemberPwRe(e.target.value);
  };
  const pwMessage = useRef(null);
  const checkPw = () => {
    //class 초기화
    pwMessage.current.classList.remove("valid");
    pwMessage.current.classList.remove("invalid");
    //비밀번호와 비밀번호 확인 체크
    if (member.memberPw === memberPwRe) {
      console.log("비밀번호가 일치");
      pwMessage.current.innerText = "비밀번호가 일치합니다.";
      pwMessage.current.classList.add("valid");
    } else {
      console.log("비밀번호가 일치하지 않을 때");
      pwMessage.current.innerText = "비밀번호가 일치하지 않습니다.";
      pwMessage.current.classList.add("invalid");
    }
  };
  const join = () => {
    if (idCheck === 1 && pwMessage.current.classList.contains("valid")) {
      axios
        .post(`${backServer}/member`, member)
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        text: "입력 값을 확인하세요.",
        icon: "info",
        confirmButtonColor: "#a18cd1",
      });
    }
  };
  return (
    <section className="section">
      <div>
        <h3>회원가입</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault(); //form 안에 submit 역할을 하는 버튼을 눌렀어도 새로 실행하지 않게 하고싶을 경우에 이용
          join();
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
            onBlur={checkId} //onBlur : 포커스가 사라졌을때 호출.(중복체크 여부 등에서 사용)
          />
        </div>
        <p
          className={
            "input-msg" +
            (idCheck === 0 ? "" : idCheck === 1 ? " valid" : " invalid")
          }
        >
          {idCheck === 0
            ? ""
            : idCheck === 1
            ? "사용가능한 아이디 입니다."
            : idCheck === 2
            ? "아이디는 영어 대/소문자 숫자로 4~8글자 입니다."
            : "이미 사용중인 아이디 입니다."}
        </p>
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
          <label htmlFor="memberPwRe">비밀번호 확인</label>
          <input
            type="password"
            name="memberName"
            id="memberName"
            value={memberPwRe}
            onChange={changeMemberPwRe}
            onBlur={checkPw}
          />
        </div>
        <p className="input-msg" ref={pwMessage}></p>
        <div>
          <label htmlFor="memberName">이름</label>
          <input
            type="text"
            name="memberName"
            id="memberName"
            value={member.memberName}
            onChange={changeMember}
          />
        </div>
        <div>
          <label htmlFor="memberPhone">전화번호</label>
          <input
            type="text"
            name="memberPhone"
            id="memberPhone"
            value={member.memberPhone}
            onChange={changeMember}
          />
        </div>
        <div>
          <button type="submit">회원가입</button>
        </div>
      </form>
    </section>
  );
};

export default Join;
