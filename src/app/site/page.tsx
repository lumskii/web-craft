import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/lib/constants";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(#9CA3AF_1px,transparent_1px)] [background-size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <p className="text-center relative top-0">
          Run your agency, in one place
        </p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-6xl font-bold text-center md:text-[200px]">
            Webcraft
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-10px]">
          <Image
            src="/assets/preview.png"
            alt="banner image"
            width={1200}
            height={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10" />
        </div>
      </section>
      <section className="flex justify-center flex-col gap-4 md:!mt-[-40] mt-[-100px]">
        <h2 className="text-4xl text-center">Choose what plan fits you best</h2>
        <p className="text-muted-foreground text-center">
          Our straight forward pricing plans are tailored to meet your needs. If
          {" you're"} not <br /> sure, you can always start with our free plan
          and upgrade later.
        </p>
        <div className="flex justify-center gap-4 flex-wrap mt-6">
          {pricingCards.map((card) => (
            // Enable a free product plan from stripe and add it to the pricingCards array--- WIP
            <Card
              key={card.title}
              className={clsx("w-[300px] flex flex-col justify-between", {
                "border-2 border-primary": card.title === "Unlimited Saas",
              })}
            >
              <CardHeader>
                <CardTitle
                  className={clsx("", {
                    "text-muted-foreground": card.title !== "Unlimited Saas",
                  })}
                >
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">{card.price}</span>
                <span className="text-muted-foreground">{card.duration}</span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div>
                  {card.features.map((feature) => {
                    return (
                      <div key={feature} className="flex gap-2 items-center">
                        {" "}
                        <Check className="text-muted-foreground" />
                        <p>{feature}</p>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href="/agency?plan=${card.priceId}"
                  className={clsx(
                    "w-full text-center bg-primary p-2 rounded-md",
                    { "!bg-muted-foreground": card.title !== "Unlimited Saas" }
                  )}
                >
                  Get started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
