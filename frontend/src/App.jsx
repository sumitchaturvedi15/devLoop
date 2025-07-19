import Body from "./Components/Body";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import userStore from './utils/appStore'
import { Provider } from 'react-redux'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Profile from "./Components/Profile";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import SignUp from "./Components/SignUp";
import Chat from "./Components/Chat";
import TargetChat from "./Components/TargetChat";
import Delete  from "./Components/Delete";
function App() {
  return (
    <>
      <Provider store={userStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<div><Body/></div>}>
              <Route path="/feed" element={<div><Feed/></div>} />
              <Route path="/login" element={<div><Login/></div>} />
              <Route path="/signUp" element={<div><SignUp/></div>} />
              <Route path="/chat/:targetUser" element={<div><TargetChat/></div>} />
              <Route path="/chat/" element={<div><Chat/></div>} />
              <Route path="/profile" element={<div><Profile/></div>} />
              <Route path="/connections" element={<div><Connections/></div>} />
              <Route path="/requests" element={<div><Requests/></div>} />
              <Route path="/delete/profile" element={<div><Delete/></div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
