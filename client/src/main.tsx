import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import GlobalStyles from "./components/GlobalStyles/index.tsx";
import { SearchContextProvider } from "./services/contexts/SearchContext.tsx";
import { ToastContainer, toast } from "react-toastify";
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <GlobalStyles>
            <SearchContextProvider>
                <App />
                <ToastContainer />
            </SearchContextProvider>
        </GlobalStyles>
    </StrictMode>
);
