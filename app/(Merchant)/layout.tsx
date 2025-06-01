"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { checkPageUrl } from "@/components/api/Market";
import LoadingCircle from "@/components/LoadingCircle";
import axios from "axios";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token");

  const router = useRouter();
  const pathname = usePathname();

  const [hasMounted, setHasMounted] = useState(false);
  const [tokenStored, setTokenStored] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigationCount = useRef(0);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      setTokenStored(tokenFromUrl);
    } else {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      } else {
        setTokenStored(token);
      }
    }
  }, [tokenFromUrl, router, hasMounted]);

  useEffect(() => {
    if (!tokenStored) return;

    setLoading(true);
    checkPageUrl(pathname)
      .then((data) => {
        if (data.url) {
          if (!(pathname.includes(data.url) || data.url.includes(pathname))) {
            navigationCount.current++;
            router.push(data.url);
          }
        }
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          navigationCount.current++;
          router.push("/login");
          console.error("Error checking page URL:", err);
        }
      })
      .finally(() => {
        if (navigationCount.current === 1) {
          navigationCount.current = 0;
        } else {
          setLoading(false);
        }
      });
  }, [tokenStored, router, pathname]);

  if (!hasMounted || loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoadingCircle size={60} />
      </div>
    );
  }

  return <div className="min-h-screen h-full">{children}</div>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex justify-center items-center">
          <LoadingCircle size={60} />
        </div>
      }
    >
      <RootLayoutContent>{children}</RootLayoutContent>
    </Suspense>
  );
}
