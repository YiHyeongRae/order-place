import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../../components/Layout";
import "../../public/font/font.css";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  // Auth 체크를 위한 func
  function Auth({ children }: any) {
    // useSeesion으로 login 상태 체크
    const { data: session, status }: any = useSession();
    const isUser = !!session?.token;

    useEffect(() => {
      // status 로 상태 체크
      if (status === "loading") return; // Do nothing while loading

      // 로그인 되있지 않다면 setInterval 과 함께 안내페이지 및 카운팅
      if (!isUser) {
        // 카운팅 끝날 시 강제 페이지이동

        signIn();
      }
      // setTimeout(() => signIn(), 5000); // If not authenticated, force log in
    }, [isUser, status]);

    // 로그인 되있다면 정상적으로 page 호출
    if (isUser) {
      return children;
    }

    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return (
      <div
        style={{
          height: "calc(100vh - 54px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          This Page Require Authorized, But You Are Unauthorized ! Please
          SignIn.
        </div>
      </div>
    );
  }

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
