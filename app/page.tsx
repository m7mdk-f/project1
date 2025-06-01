import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/login"}>تسجيل الدخول</Link>
      <br />
      <Link href={"/register"}>تسجيل</Link>

    </div>
  );
}
