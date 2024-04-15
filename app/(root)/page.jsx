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
      {/* Crp recommendation system */}
      <section className="bg-contain bg-slate-100 py-5 md:py-10">
        <div className="container grid grid-cols-1 gap-5 md:grid-cols-3 2xl:gap-0 md:px-10">
          <div className=" md:col-span-2">
            <h1 className="h4-medium">Crop Recommendation Model</h1>
            <p className="p-regular-14 md:p-regular-16 pt-4">
              Agricare, an advanced agricultural software, revolutionizes precision
              farming through its two core components: a sophisticated Crop Recommendation
              System and an efficient Crop Irrigation System, both driven by state-of-the-art
              machine learning models. The Crop Recommendation System is a standout feature, utilizing two machine
              learning models. The first integrates soil fertility data and real-time weather forecasts
              for immediate and contextually relevant crop suggestions, while the second employs
              a Crop Reproduction algorithm based on historical production data. This dual-model
              approach ensures comprehensive and dynamic crop recommendations, considering
              both current and historical factors.
            </p>
          </div>
          <Image
            src="/images/1.png"
            alt="hero"
            width={400}
            height={400}
            className="sm:w-[300px]  shadow bg-slate-300 max-h-[70vh] object-cover object-center 2xl:max-h-[50vh] md:rounded"
          />
        </div>
      </section>


      {/* Water Model */}
      <section className="bg-contain bg-slate-200 py-5 md:py-10">
        <div className="container grid grid-cols-1 gap-5 md:grid-cols-3 2xl:gap-0 md:px-10">
          <Image
            src="/images/2.png"
            alt="hero"
            width={400}
            height={400}
            className="sm:w-[300px] shadow bg-slate-300 max-h-[70vh] object-cover object-center 2xl:max-h-[50vh] md:rounded  max-sm:order-last"
          />
          <div className=" md:col-span-2 ">
            <h1 className="h4-medium">Water Model</h1>
            <p className="p-regular-14 md:p-regular-16 pt-4">
              Complementing the Crop Recommendation Model is our  Crop Irrigation System,
              addressing water management in agriculture. The Water Requirement Model calculates optimal irrigation amounts based on crop type,
              weather conditions, and soil characteristics, promoting water conservation and efficient resource utilization.
              Agricare development relies on a robust foundation of materials and libraries for scalability and maintainability.
              The framework and libraries contribute diverse features, and the design and implementation phases showcase the project's effectiveness in providing accurate crop recommendations and irrigation guidance.
              In conclusion, Agricare is a comprehensive precision farming solution, empowering farmers with data-driven insights for optimizing practices and promoting sustainable and efficient farming.
              The project suggests potential avenues for future research and development in the field.
            </p>
          </div>
        </div>
      </section>

      {/* Yield estimation  */}
      <section className="bg-contain bg-slate-100 py-5 md:py-10">
        <div className="container grid grid-cols-1 gap-5 md:grid-cols-3 2xl:gap-0 md:px-10">
          <div className=" md:col-span-2 ">
            <h1 className="h4-medium">Crop Yield Estimation</h1>
            <p className="p-regular-14 md:p-regular-16 pt-4">
              Our crop yield model is the culmination of precise data analysis and advanced machine learning techniques. Building upon the crop selection insights derived from our previous models, our yield model harnesses the power of Artificial Neural Networks (ANN) to forecast crop productivity with unparalleled accuracy.
            </p>
            <p className="p-regular-14 md:p-regular-16 pt-4">
              At its core, our model integrates a vast array of variables, including soil composition, historical yield data, climate patterns, and agronomic practices. By leveraging the sophisticated algorithms of ANN, we create a dynamic framework capable of adapting to the unique characteristics of each crop and environmental condition.
            </p>
            <p className="p-regular-14 md:p-regular-16 pt-4">
              With our crop yield model, farmers gain actionable insights into expected crop performance, enabling them to proactively manage resources, mitigate risks, and maximize their agricultural yield potential. By harnessing the power of data-driven intelligence, we pave the way for a more resilient and sustainable future in agriculture.
            </p>
          </div>
          <Image
            src="/images/3.png"
            alt="hero"
            width={400}
            height={400}
            className="sm:w-[300px]  shadow bg-slate-300 max-h-[70vh] object-cover object-center 2xl:max-h-[50vh] md:rounded "
          />
        </div>
      </section>

    </main >

  );
}
