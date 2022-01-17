import { Provider } from "react-redux";
import AppNavigate from "./src/AppNavigate";
import { store } from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigate />;
    </Provider>
  );
}
