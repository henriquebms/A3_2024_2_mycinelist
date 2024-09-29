import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Template } from './template';
import { Home } from './screens/Home';

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home/>,
  },
]);

function App() {
  return (
    <Template>
      <RouterProvider router={router} />
    </Template>
  );
}

export default App;
