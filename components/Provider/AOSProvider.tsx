"use client";

import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { usePathname } from "next/navigation";

export default function AOSProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: false,
      anchorPlacement: "top-bottom",
    });

    Aos.refreshHard();
  }, [pathname]);

  return <>{children}</>;
}
