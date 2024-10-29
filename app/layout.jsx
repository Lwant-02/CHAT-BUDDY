import ThemeProvider from "@/context/ThemeContext";
import "@/styles/globals.css";
import "antd/dist/reset.css";
import MainContextProvider from "@/context/MainContextProvider";
import AuthProvider from "./_components/AuthProvider";

export const metadata = {
  title: {
    default: "CHAT-BUDDY",
  },
  description: "Chat Bot developed by Lwant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="light-mode">
        <ThemeProvider>
          <AuthProvider>
            <MainContextProvider>{children}</MainContextProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
