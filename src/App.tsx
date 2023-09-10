import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Avtorization, Layout, Registration, RoomList } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/avtorization" element={<Avtorization />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<RoomList />} />
        <Route path="/:room" element={<RoomList />} />
        {/* <Route path="/:id" element={<ViewingProducts />} /> */}
        {/* <Route path='*' element={<PageError />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
