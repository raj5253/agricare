import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="bg-contain bg-slate-200 py-5 md:py-10">
        <div className="container grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex  flex-col justify-normal gap-8 md:px-10">
            <h1 className="h2-bold">
              Welcome to
              <span className="text-primary h1-bold"> Agricare</span>
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Your Modern and Precise Farming Solution with Machine Learning
            </p>
            <p>Agricare revolutionizes the agricultural landscape by harnessing the power of cutting-edge Machine Learning (ML) technology. Our platform integrates sophisticated ML models to provide farmers with unparalleled insights and recommendations, enabling them to optimize their farming practices and maximize yields.</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Monitor Crop</Link>
            </Button>
          </div>
          <Image
            src="/images/bglogo.svg"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

    </main>
  );
}
