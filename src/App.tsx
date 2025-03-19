import useRedirectOnRefresh from './hooks/useRedirectionOnRefresh';
import Router from './router';
// import { useSocketStore } from "./stores/useSocketStore";

const App = () => {
  useRedirectOnRefresh();
  return <Router />;
};

export default App;
