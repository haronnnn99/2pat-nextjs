import Image from "next/image";
import { clsx } from "@/lib/clsx";

/** Gallery mosaic — 12-col grid, mixes tall/wide/square/half/third/full sizes. */
export function Gallery({
  label,
  count,
  images,
}: {
  label: string;
  count: number;
  images: string[];
}) {
  return (
    <section className="py-20 bg-paper">
      <div className="max-w-[var(--spacing-max-w)] mx-auto mb-10 px-[var(--spacing-pad-x)] flex justify-between items-end">
        <div data-reveal="slide-left">
          <div className="text-[14px] tracking-[0.21em] uppercase text-orange">
            {label}
          </div>
          <h2 className="font-display font-normal text-[35px] leading-[1.15] tracking-[-0.02em] text-ink lowercase mt-2">
            gallery
          </h2>
        </div>
        <span
          className="text-[14px] tracking-[0.21em] uppercase text-ink-soft"
          data-reveal="slide-right"
          data-delay="2"
        >
          {count} photos
        </span>
      </div>

      <div className="grid grid-cols-12 gap-2 px-2">
        {images.map((src, i) => (
          <div
            key={i}
            className={clsx(
              "relative bg-sand",
              GALLERY_SLOT_CLASSES[i % GALLERY_SLOT_CLASSES.length],
            )}
            data-reveal
            data-delay={((i % 3) + 1) as unknown as string}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/** Repeating pattern of card sizes for the 12-col mosaic. Empirically balanced
 *  so each row of 12 fills without leaving a gap. */
const GALLERY_SLOT_CLASSES = [
  "col-span-8 aspect-[16/9]",   // wide
  "col-span-4 aspect-[3/4]",    // third
  "col-span-4 aspect-[3/4]",    // third
  "col-span-4 aspect-[3/4]",    // third
  "col-span-4 aspect-[3/4]",    // third
  "col-span-6 aspect-[4/3]",    // half
  "col-span-6 aspect-[4/3]",    // half
  "col-span-12 aspect-[21/9]",  // full
];
