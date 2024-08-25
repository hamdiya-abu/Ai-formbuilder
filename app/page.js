//import { Button } from "../../components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen ">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Craft Your Ideal Form
        <strong className="font-extrabold text-primary sm:block"> In Seconds Not Hours. </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed text-gray-500 ">
      Effortlessly Design Stunning Forms to Elevate Your Digital Presence Instantly!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-600 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="#"
        >
          +Create AI Form
        </a>

        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-purple-600 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>

  );
}
