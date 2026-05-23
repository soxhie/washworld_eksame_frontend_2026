import Image from "next/image";
import Link from "next/link";
import "./pages/onboarding/onboarding.css"

export default function Home() {
  return (
    <div className="Start">
      <Image
        src="/logo.svg"
        width={100}
        height={400}
        alt="WashWorld"
        priority
      />
      <div className="buttons">
        <Link href="/pages/login" >
          <button className="brandGrøn">Login</button>
        </Link>
        <Link href="/pages/onboarding/Step1">
          <button className="primaryWhite">Opret bruger</button>
        </Link>
      </div>

    </div>

  );
}
