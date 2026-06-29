"use client";
import * as React from "react";

import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useTransform,
	animate,
	useInView,
} from "framer-motion";

interface iISmoothScrollHeroProps {
	scrollHeight?: number;
	desktopImage?: string;
	mobileImage?: string;
	initialClipPercentage?: number;
	finalClipPercentage?: number;
}

const SmoothScrollHero: React.FC<iISmoothScrollHeroProps> = ({
	desktopImage = "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=2532&auto=format&fit=crop",
	mobileImage  = "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
	initialClipPercentage = 25,
	finalClipPercentage   = 75,
}) => {
	const ref = React.useRef<HTMLDivElement>(null);
	// parte da sola con un leggero scroll, quando la sezione entra nello schermo
	const inView = useInView(ref, { amount: 0.04, once: true });

	const progress = useMotionValue(0);

	// Su mobile questo effetto (clip-path + background-size animati a schermo intero) appesantisce
	// troppo la pagina: lo rimuoviamo del tutto. Niente flash: il check arriva prima che la sezione
	// (più in basso nella pagina) sia raggiunta dallo scroll dell'utente.
	const [isMobile, setIsMobile] = React.useState(false);
	React.useEffect(() => {
		setIsMobile(window.matchMedia('(max-width: 767px)').matches);
	}, []);

	React.useEffect(() => {
		if (!inView || isMobile) return;
		const controls = animate(progress, 1, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
		return () => controls.stop();
	}, [inView, isMobile, progress]);

	const clipStart = useTransform(progress, [0, 1], [initialClipPercentage, 0]);
	const clipEnd   = useTransform(progress, [0, 1], [finalClipPercentage, 100]);
	const clipPath  = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
	const backgroundSize = useTransform(progress, [0, 1], ["170%", "100%"]);

	if (isMobile) return null;

	return (
		<div ref={ref} className="relative w-full h-screen overflow-hidden bg-black">
			<motion.div
				className="absolute inset-0 h-full w-full"
				style={{ clipPath, willChange: "clip-path" }}
			>
				{/* Mobile */}
				<motion.div
					className="absolute inset-0 md:hidden"
					style={{
						backgroundImage: `url(${mobileImage})`,
						backgroundSize,
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
				/>
				{/* Desktop */}
				<motion.div
					className="absolute inset-0 hidden md:block"
					style={{
						backgroundImage: `url(${desktopImage})`,
						backgroundSize,
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
				/>
			</motion.div>
		</div>
	);
};

export default SmoothScrollHero;
