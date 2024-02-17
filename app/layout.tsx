import type { Metadata } from "next";
import { Nunito_Sans, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import NavBar from "./components/nav-bar";
import ReduxProvider from "./components/redux-provider";
import "rc-tooltip/assets/bootstrap_white.css";
import Footer from "./components/footer";

const nuntio_sans = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Vixel Flow",
    icons: {
        icon: [
            {
                url: "/icon.ico",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/icon.ico",
                media: "(prefers-color-scheme: dark)",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReduxProvider>
            <html lang="en" className="scrollbar scrollbar-track-slate-950">
                <head>
                    <link rel="icon" href="/favicon.ico" sizes="any" />
                </head>
                <body className={`${nuntio_sans.className}`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <main className="max-w-[1500px] mx-auto">
                            <NavBar />
                            {children}
                            <Footer />
                        </main>
                    </ThemeProvider>
                </body>
            </html>
        </ReduxProvider>
    );
}
