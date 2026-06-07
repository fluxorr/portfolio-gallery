"use client";
import { cn } from "@/lib/utils";
import { Globe, Instagram, Mail, UserIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

type highlightType = "name" | "website" | "email" | "instagram" | null;

const Icons: { type: highlightType; label: string; Icon: React.ElementType }[] =
    [
        { type: "email" as highlightType, label: "Email", Icon: Mail },
        { type: "name" as highlightType, label: "Name", Icon: UserIcon },
        { type: "instagram" as highlightType, label: "Instagram", Icon: Instagram },
        { type: "website" as highlightType, label: "Website", Icon: Globe },
    ];

const InteractiveMail = ({ email = "rahul@fluxorr.com" }) => {
    const [highlight, setHighlight] = useState<highlightType>(null);

    const [emailName, emailDomain] = email.split("@");
    const domainParts = emailDomain.split(".");
    const domainName = domainParts[0];
    const domainExt = "." + domainParts.slice(1).join(".");

    const containerRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const atRef = useRef<HTMLDivElement>(null);
    const domainRef = useRef<HTMLDivElement>(null);
    const extRef = useRef<HTMLDivElement>(null);

    const getSegmentStates = () => {
        switch (highlight) {
            case "name": {
                return {
                    name: { active: true, blurred: false },
                    at: { active: false, blurred: true },
                    domain: { active: false, blurred: true },
                    ext: { active: false, blurred: true },
                };
            }
            case "website": {
                return {
                    name: { active: false, blurred: true },
                    at: { active: false, blurred: true },
                    domain: { active: true, blurred: false },
                    ext: { active: true, blurred: false },
                };
            }
            case "email": {
                return {
                    name: { active: true, blurred: false },
                    at: { active: true, blurred: false },
                    domain: { active: true, blurred: false },
                    ext: { active: true, blurred: false },
                };
            }
            case "instagram": {
                return {
                    name: { active: false, blurred: true },
                    at: { active: true, blurred: false },
                    domain: { active: true, blurred: false },
                    ext: { active: false, blurred: true },
                };
            }
            default: {
                return {
                    name: { active: false, blurred: false },
                    at: { active: false, blurred: false },
                    domain: { active: false, blurred: false },
                    ext: { active: false, blurred: false },
                };
            }
        }
    };

    const segmentStates = getSegmentStates();

    return (
        <div className="flex justify-center items-center h-screen p-8 gap-8 flex-col ">
            {/* main address  */}
            <div className="relative flex min-h-28 flex-col items-center">
                <div
                    ref={containerRef}
                    className="relative flex items-center justify-center text-3xl font-medium tracking-tight md:text-4xl"
                >
                    <TextSegment
                        isActive={segmentStates.name.active}
                        isBlurred={segmentStates.name.blurred}
                        segmentRef={nameRef as React.RefObject<HTMLSpanElement>}
                    >
                        {" "}
                        {emailName}{" "}
                    </TextSegment>
                    <TextSegment
                        isActive={segmentStates.at.active}
                        isBlurred={segmentStates.at.blurred}
                        segmentRef={atRef as React.RefObject<HTMLSpanElement>}
                    >
                        @
                    </TextSegment>
                    <TextSegment
                        isActive={segmentStates.domain.active}
                        isBlurred={segmentStates.domain.blurred}
                        segmentRef={domainRef as React.RefObject<HTMLSpanElement>}
                    >
                        {domainName}
                    </TextSegment>
                    <TextSegment
                        isActive={segmentStates.ext.active}
                        isBlurred={segmentStates.ext.blurred}
                        segmentRef={extRef as React.RefObject<HTMLSpanElement>}
                    >
                        {domainExt}
                    </TextSegment>
                </div>
            </div>

            {/* icons container */}
            <div className="mt-4 flex items-center">
                {Icons.map(({ type, label, Icon }) => {
                    return (
                        <motion.button
                            className="relative rounded-lg p-2 transition-colors"
                            key={type}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onMouseEnter={() => setHighlight(type)}
                            onMouseLeave={() => setHighlight(null)}
                        >
                            <Icon
                                className="size-5  transition-colors duration-150"
                                strokeWidth={1.5}
                            ></Icon>
                            <AnimatePresence>
                                {highlight === type && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 0.9 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                        className=" absolute inset-0 -z-10  rounded-lg bg-neutral-400/10"
                                    ></motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

export default InteractiveMail;

const TextSegment = ({
    children,
    isActive,
    isBlurred,
    segmentRef,
}: {
    children: React.ReactNode;
    isActive: boolean;
    isBlurred: boolean;
    segmentRef: React.RefObject<HTMLSpanElement>;
}) => {
    return (
        <motion.span
            ref={segmentRef}
            className={cn(
                `tracking-tight`,
                isActive
                    ? "text-neutral-900 dark:text-neutral-400 "
                    : "text-neutral-400 dark:text-neutral-900 ",
            )}
            animate={{
                filter: isBlurred ? "blur(4px)" : "blur(0px)",
                opacity: isActive ? 1 : 0.5,
            }}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.span>
    );
};
