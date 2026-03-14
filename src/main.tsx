import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReactGA from "react-ga4"; // 1. 라이브러리 임포트

ReactGA.initialize("G-40J7TWFLL4");

createRoot(document.getElementById("root")!).render(<App />);
