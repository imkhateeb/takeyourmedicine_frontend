import { BrowserRouter } from "react-router-dom";
import Main from "./container/Main";
import Navbar from "./components/Navigations/Navbar";
import Bottombar from "./components/Navigations/Bottombar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col w-full">
        <div className="fixed top-0 w-full z-[1200]">
          <Navbar />
        </div>
        <div className="min-h-screen bg-gradient-to-t from-white to-[#F3DBCE] pt-16 max-md:pb-16">
          <Main />
        </div>
        <div className="md:hidden fixed bottom-0 w-full z-[1200]">
          <Bottombar />
        </div>
      </div>
    </BrowserRouter>
  )
}