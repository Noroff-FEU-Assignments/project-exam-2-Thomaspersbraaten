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
import { ProfileProvider } from "./components/context/ProfileContext";
import { FeedbackProvider } from "./components/context/FeedbackContext";
import GlobalFeedback from "./components/feedback/GlobalFeedback";
function App() {
  return (
    <NameProvider>
      <AuthProvider>
        <ProfileProvider>
          <FeedbackProvider>
            <div className="main-container">
              okkk
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* <Route path="/" element={<RenderHome />} /> */}
                  <Route path="/welcome" element={<LandingPage />} />
                  {/* <Route path="/home" element={authenticated ? <Home /> : <LandingPage />} /> */}

                  <Route path="/login" element={<Login />} />
                  <Route path="/create-account" element={<CreateAccount />} />

                  {/* <Route path="/profiles/">
                  <Route path=":name" exact element={<ProfileDetail />} />
                  <Route path="my-profile" element={<MyProfile />} />
                </Route> */}
                  <Route path="/profiles/my-profile" element={<MyProfile />} />

                  <Route path="/profiles/:name" element={<ProfileDetail />} />

                  <Route path="/create-post" element={<CreatePost />} />
                  <Route path="/posts/:id" element={<PostDetail />} />
                  {/* <Route path="/my-profile" element={<MyProfile />} /> */}
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Router>
            </div>
          </FeedbackProvider>
        </ProfileProvider>
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
