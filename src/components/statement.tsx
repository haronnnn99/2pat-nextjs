import Image from "next/image";
import Link from "next/link";

/**
 * Big italic statement section — vertical layout (title top + image bottom
 * with circular DISCOVER pill overlap). Bold Declarative title per anh's set.
 */
export function Statement() {
  return (
    <section
      data-nav-dark
      className="bg-orange text-paper px-[var(--spacing-pad-x)] pt-32 pb-20 border-t border-ink"
    >
      <div className="mx-auto max-w-[var(--spacing-max-w)] flex flex-col">
        <div className="grid grid-cols-[1fr_auto] gap-10 items-start mb-14 max-md:grid-cols-1 max-md:gap-6">
          <h2
            className="font-display leading-[0.92] tracking-[-0.03em] text-paper uppercase"
            style={{ fontSize: "clamp(56px, 8vw, 130px)" }}
            data-reveal
            data-delay="1"
          >
            / WE BUILD IT
            <br />
            / WE FINISH IT
            <br />
            / WE SHIP IT
          </h2>
          <div
            className="text-xs tracking-[0.21em] uppercase text-paper/75 text-right max-w-[200px] leading-[1.4] pt-3 max-md:text-left max-md:max-w-full"
            data-reveal
            data-delay="2"
          >
            ( welcome to
            <br />
            the world
            <br />
            of 2pat )
          </div>
        </div>

        <div className="relative w-full" data-reveal="fade" data-delay="2">
          <div className="relative w-full aspect-[21/10]">
            <Image
              src="/portfolio-ref/page-07.png"
              alt=""
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
          <Link
            href="/contact"
            className="absolute left-10 -bottom-12 w-[100px] h-[100px] rounded-full border border-paper bg-orange text-paper flex items-center justify-center font-body font-medium text-[11px] tracking-[0.21em] uppercase text-center z-[2] transition-colors hover:bg-paper hover:text-orange max-md:left-5 max-md:-bottom-10 max-md:w-[84px] max-md:h-[84px] max-md:text-[10px]"
          >
            Discover ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
