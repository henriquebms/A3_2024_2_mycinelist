import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import { Template } from './template';
import { Home } from './screens/Home';
import { Recomendations } from './screens/Recomendations';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Recomendation } from 'screens/Recomendation';
import { Favorites } from 'screens/Favorites';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: '/recomendations',
    element: <Recomendations/>
  },
  {
    path: '/recomendations/:name',
    element: <Recomendation/>
  },
  {
    path: '/favorites',
    element: <Favorites/>
  }
]);

function App() {
  return (
    <Template>
      <RouterProvider router={router} />
    </Template>
  );
}

export default App;
