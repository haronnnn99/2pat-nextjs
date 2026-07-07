import Image from "next/image";

export function VideoBlock({
  label,
  embedUrl,
  placeholder,
}: {
  label: string;
  embedUrl?: string;
  placeholder?: string;
}) {
  return (
    <section className="bg-paper-2 px-[var(--spacing-pad-x)] py-20">
      <div className="mx-auto max-w-[var(--spacing-max-w)]">
        <div className="text-[14px] tracking-[0.21em] uppercase text-orange mb-4" data-reveal>
          {label}
        </div>
        <div className="w-full aspect-video bg-ink relative overflow-hidden" data-reveal="scale" data-delay="2">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title="Project recap"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : placeholder ? (
            <>
              <Image
                src={placeholder}
                alt="Video placeholder"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover opacity-70"
              />
              <a
                href="#"
                aria-label="Play recap"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-paper text-paper flex items-center justify-center text-2xl transition-all hover:bg-orange hover:border-orange hover:scale-105 z-[2]"
              >
                ▶
              </a>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
