import "./App.css";
import "./responsive.css";
import { Route, Routes, Switch } from "react-router-dom";
import Dashboard from "./Components/dashboard";
import Template1 from "./Templates/template1";

import { StateProvider } from "./Components/contextt";
import MyForm from "./Components/form1";
import Signup from "./Components/signup";
import Login from "./Components/login";
import Template2 from "./Templates/template2";
import Myprofile from "./Components/myprofile";
import ForgotPassword from "./Components/forgetpass";

function App() {
  return (
    <div className="App">
      <StateProvider>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/template1" element={<Template1 />} />
          <Route path="/template1/:uniqueId" element={<Template1 />} />
          <Route path="/template2/:uniqueId" element={<Template2 />} />

          <Route path="/myform/:tempid" element={<MyForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
        </Routes>
      </StateProvider>
    </div>
  );
}

export default App;
