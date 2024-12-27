import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import GlobalStyles from "./components/GlobalStyles/index.tsx";
import { SearchContextProvider } from "./services/contexts/SearchContext.tsx";
import { ToastContainer } from "react-toastify";
import { I18nextProvider } from "react-i18next"; // Import I18nextProvider
import i18n from "./i18n.ts"; // Import cấu hình i18n

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <I18nextProvider i18n={i18n}> {/* Bao bọc ứng dụng với I18nextProvider */}
            <GlobalStyles>
                <SearchContextProvider>
                    <App />
                    <ToastContainer />
                </SearchContextProvider>
            </GlobalStyles>
        </I18nextProvider>
    </StrictMode>
);
