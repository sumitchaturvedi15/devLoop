import Body from "./Components/Body";
import Login from "./Components/Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<div><Body/></div>}>
            <Route path="/login" element={<div><Login/></div>} />
            <Route path="/profile" element={<div>Profile</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
