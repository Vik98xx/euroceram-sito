"use client";
import React from "react";
import { motion } from "motion/react";

export type Testimonial = {
  text: string;
  name: string;
  role: string;
  rating?: number;
};

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13">
          <path
            d="M6.5 1l1.4 3.3L11 4.9 8.6 7.2l.5 3.3L6.5 9l-2.6 1.5.5-3.3L2 4.9l3.1-.6z"
            fill={i < n ? "var(--teal)" : "rgba(255,255,255,0.12)"}
          />
        </svg>
      ))}
    </div>
  );
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
  reverse?: boolean;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        initial={{ translateY: props.reverse ? "-50%" : "0%" }}
        animate={{ translateY: props.reverse ? "0%" : "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, name, role, rating }, i) => (
              <div
                className="p-8 rounded-3xl max-w-xs w-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(16px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(16px) saturate(1.4)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow:
                    "inset 1px 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.25)",
                }}
                key={i}
              >
                <Stars n={rating ?? 5} />
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.05rem",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.65)",
                    fontStyle: "italic",
                    marginTop: "1rem",
                  }}
                >
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: 42,
                      height: 42,
                      background: `hsl(${(i * 67 + 180) % 360}, 38%, 38%)`,
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#fff",
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                    }}
                  >
                    {name[0]}
                  </div>
                  <div className="flex flex-col">
                    <div
                      className="font-medium tracking-tight leading-5"
                      style={{ color: "#fff" }}
                    >
                      {name}
                    </div>
                    <div
                      className="leading-5 tracking-tight"
                      style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}
                    >
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
