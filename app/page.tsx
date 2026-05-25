import Image from "next/image";
import Link from "next/link";
import "./pages/onboarding/onboarding.css"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="Start">
      <Image
        src="/logo.svg"
        width={100}
        height={400}
        alt="WashWorld"
        priority
      />
      <button className="nextButton"
        type="button"
        onClick={() => {
          router.push("/pages/onboarding/step1")
        }}
      ></button>

    </div>

  );
}
