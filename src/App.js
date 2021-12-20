import News from "./components/News";
import NewsDetails from './components/NewsDetails';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function App() {

  return (
    <div>
      <News/>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/about">Home</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
          </ul>

          <Routes>
            <Route path="/about">
              <NewsDetails />
            </Route>
            <Route path="/">
              <News />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}