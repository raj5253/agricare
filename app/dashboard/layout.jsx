import React, { Suspense } from "react";
import Loading from "./loading";
import Header from "@/components/Header";

const RootLayout = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <main>{children}</main>
    </Suspense>
  );
};

export default RootLayout;
