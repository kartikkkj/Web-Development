import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import EditorPage from "./pages/EditorPage";
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux";
import store from "./redux/store";
import Join from "./pages/Join";
function App() {
  return (
    <>
        <Toaster />
        <BrowserRouter>
      <Provider store={store}>
          <Routes>
            {/* <Route path="/" element={<EditorPage/>}></Route> */}
            <Route path="/" element={<Join />}></Route>
            <Route path="/editor/:roomId" element={<EditorPage />}></Route>
          </Routes>
      </Provider>
        </BrowserRouter>
    </>
  );
}
export default App;
