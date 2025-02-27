import { Route, Routes } from "react-router-dom";
import Main from "./components/common/Main";
import Header from "./components/common/Header";
import Join from "./components/member/Join";
import Login from "./components/member/Login";

function App() {
  return (
    <div className="wrap">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
