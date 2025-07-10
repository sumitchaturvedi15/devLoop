import Body from "./Components/Body";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import userStore from './utils/appStore'
import { Provider } from 'react-redux'
import {BrowserRouter, Routes, Route} from "react-router-dom";
function App() {
  return (
    <>
      <Provider store={userStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<div><Body/></div>}>
              <Route path="/feed" element={<div><Feed/></div>} />
              <Route path="/login" element={<div><Login/></div>} />
              <Route path="/profile" element={<div>Profile</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
