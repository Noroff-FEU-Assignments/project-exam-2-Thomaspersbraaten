import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import { AuthProvider } from "./components/context/AuthContext";
import Home from "./pages/home/Home";

import CreatePost from "./pages/createPost/CreatePost";
import PostDetail from "./pages/postDetail/PostDetail";
import MyProfile from "./pages/myProfile/MyProfile";
import { NameProvider } from "./components/context/NameContext";
import PageNotFound from "./pages/PageNotFound";
import RenderHome from "./pages/RenderHome";
import ProfileDetail from "./components/user/ProfileDetail";
function App() {
  // console.log(authenticated);
  return (
    <NameProvider>
      <AuthProvider>
        <div className="main-container">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/" element={<RenderHome />} /> */}
              <Route path="/welcome" element={<LandingPage />} />
              {/* <Route path="/home" element={authenticated ? <Home /> : <LandingPage />} /> */}

              <Route path="/login" element={<Login />} />
              <Route path="/create-account" element={<CreateAccount />} />

              <Route path="/profiles/">
                <Route path=":name" element={<ProfileDetail />} />
                <Route path="my-profile" element={<MyProfile />} />
              </Route>

              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              {/* <Route path="/my-profile" element={<MyProfile />} /> */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </NameProvider>
  );
}

export default App;

{
  /* <Route path="*" /> */
}
{
  /* <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profiles/:name" element={<ProfileDetail />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/my-profile" element={<MyProfile />} />

       
            </Routes> */
}
{
  /* <Route path="/home" element={<Home />} /> */
}
