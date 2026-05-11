import Image from "next/image";
import Link from "next/link";

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
          <Link href="/pages/onboarding/page_onboarding" >
            <button className="brandGrøn">Login</button>
          </Link>
          <Link href="/pages/onboarding" >
            <button className="primaryWhite">Opret bruger</button>
          </Link>
        </div>
        
   </div>
   
  );
}
