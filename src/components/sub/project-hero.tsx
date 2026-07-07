import Image from "next/image";

export function ProjectHero({
  title,
  desc,
  image,
  image2,
  meta,
}: {
  title: string;
  desc: string;
  image: string;
  image2?: string;
  meta: string;
}) {
  return (
    <section className="relative h-screen min-h-[600px] px-[var(--spacing-pad-x)] pt-20 pb-6 bg-paper overflow-hidden flex flex-col">
      <div className="max-w-[var(--spacing-max-w)] w-full mx-auto mb-7 grid grid-cols-[1.7fr_1fr] gap-14 items-start flex-shrink-0 max-md:grid-cols-1 max-md:gap-6">
        <h1
          className="font-display uppercase leading-[0.95] tracking-[-0.02em] text-ink"
          style={{ fontSize: "min(7vw, 16vh, 110px)" }}
          data-reveal="scale"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p
          className="text-base leading-[1.45] text-ink max-w-[280px] pt-3 max-md:max-w-full max-md:pt-0"
          data-reveal
          data-delay="2"
        >
          {desc}
        </p>
      </div>

      {image2 ? (
        <div className="grid grid-cols-[1.6fr_1fr] gap-3 flex-1 min-h-0 w-full max-md:grid-cols-1">
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={title.replace(/<[^>]+>/g, " ")}
              fill
              sizes="(max-width: 900px) 100vw, 60vw"
              className="object-cover"
              priority
              data-reveal="fade"
              data-delay="3"
            />
            <MetaOverlay meta={meta} />
          </div>
          <div className="relative w-full h-full max-md:min-h-[300px]">
            <Image
              src={image2}
              alt="Secondary hero"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              className="object-cover"
              priority
              data-reveal="fade"
              data-delay="4"
            />
          </div>
        </div>
      ) : (
        <div className="relative w-full flex-1 min-h-0">
          <Image
            src={image}
            alt={title.replace(/<[^>]+>/g, " ")}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            data-reveal="fade"
            data-delay="3"
          />
          <MetaOverlay meta={meta} />
        </div>
      )}
    </section>
  );
}

function MetaOverlay({ meta }: { meta: string }) {
  return (
    <div
      className="absolute left-5 bottom-5 py-2.5 px-4.5 rounded-pill text-[11px] tracking-[0.24em] uppercase text-ink whitespace-nowrap z-[2] border"
      style={{
        background: "rgba(254, 243, 226, 0.55)",
        backdropFilter: "blur(16px) saturate(1.3)",
        WebkitBackdropFilter: "blur(16px) saturate(1.3)",
        borderColor: "rgba(254, 243, 226, 0.35)",
      }}
      data-reveal
      data-delay="4"
    >
      {meta}
    </div>
  );
}
