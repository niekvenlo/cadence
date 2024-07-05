import type { Metadata } from "next";

import { Source_Code_Pro } from "next/font/google";

import ReactQueryProvider from "./api/ReactQueryProvider";
import AppHeader from "./components/AppHeader";
import "./globals.css";
import "./basic-components.css";
import { basicFetch, fetchShoppingList, fetchWeather } from "./api/data-access";
import { cx } from "./utils";
import { getTasks } from "../pages/api/db";

export const metadata: Metadata = {
  title: "Cadence - Recurring Reminders",
  description: "Generated by create next app",
};

const source = Source_Code_Pro({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-source",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  const shoppingList = await fetchShoppingList();
  const tasks = await getTasks();
  const weather = await fetchWeather();

  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Cadence" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="red" />
      </head>
      <body className={cx(source.variable)}>
        <ReactQueryProvider>
          <AppHeader
            initialShoppingList={shoppingList}
            initialTasks={tasks}
            initialWeather={weather}
          />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
