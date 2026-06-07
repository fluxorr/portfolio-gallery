"use client";

import { animate } from "motion";
import { motion, scale, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";

type CardsType = {
    title: string;
    description: string;
    src: string;
};

const INITIAL_CARDS: CardsType[] = [
    {
        title: "GPU",
        description: "Accelerates neural network computations.",
        src: "https://images.unsplash.com/photo-1622957040873-8ea24e293885?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Quantization",
        description: "Reduces model size and memory usage.",
        src: "https://images.unsplash.com/photo-1608792992053-f397e328a56d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Batching",
        description: "Processes multiple requests efficiently.",
        src: "https://images.unsplash.com/photo-1569095531029-e17126653d48?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFueSUyMGNvbXB1dGVyc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        title: "Caching",
        description: "Avoids repeating expensive computations.",
        src: "https://images.unsplash.com/photo-1640158615573-cd28feb1bf4e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Routing",
        description: "Directs requests to the best model.",
        src: "https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Latency",
        description: "Measures response generation speed.",
        src: "https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

export const Cards = () => {
    const [stack, setStack] = useState<CardsType[]>(INITIAL_CARDS);
    return (
        <motion.div className="relative flex h-96 w-80 items-center justify-center cursor-pointer  ">
            {stack.map((item, index) => (
                <StackedCard
                    item={item}
                    total={stack.length}
                    index={index}
                    key={item.title}
                    onSendToBack={() => {
                        index === 0 && setStack((s) => [...s.slice(1), s[0]]);
                    }}
                />
            ))}
        </motion.div>
    );
};


const SPRING_STACK = {

    type: 'spring' as const,
    stiffness: 210,
    damping: 32

}

const StackedCard = ({
    item,
    total,
    onSendToBack,
    index,
}: {
    item: (typeof INITIAL_CARDS)[number];
    index: number;
    total: number;
    onSendToBack: () => void;
}) => {

    //drag animation stuff 
    const x = useMotionValue(0) // just to keep track so that we can tweak it later
    const rotate = useTransform(x, [-150, 150], [-12, 12]) // once it goes 150 in any direction, it stops rotatiing and 12 is the max tilt limit

    const isTop = index === 0;


    return (
        <motion.div
            drag={isTop ? 'x' : false}

            dragConstraints={{
                left: -150,
                right: 150
            }}

            dragElastic={0.088}
            onDragEnd={() => {
                if (!isTop || !onSendToBack) return;
                onSendToBack();
                animate(x, 0, SPRING_STACK)
            }}

            // slightly lift & scale the top card on hover
            whileHover={isTop ? { scale: 1.03, y: -8 } : undefined}
            whileTap={isTop ? { scale: 0.99 } : undefined}
            transition={SPRING_STACK}
            style={{
                zIndex: total - index,
                rotate,
                x,

            }
            }
            animate={{
                y: `${-index * 5}%`,
                scale: 1 - index * 0.05,


            }}

            className="absolute inset-0" >
            <img
                src={item.src}
                alt={item.title}
                className="pointer-events-none h-full min-h-96 w-full select-none rounded-xl object-cover"
            />
            <motion.h2
                animate={{
                    y: isTop ? 0 : 2,
                    opacity: isTop ? 1 : 0.1
                }}
                className="absolute bottom-10 left-4  text-xl font-bold  text-neutral-200 z-20 cursor-text ">
                {" "}
                {item.title}{" "}
            </motion.h2>
            <motion.p
                animate={{

                    opacity: isTop ? 1 : 0.1
                }}
                className="absolute bottom-4 left-4  text-sm text-neutral-200/60 z-20 cursor-text ">
                {item.description}
            </motion.p>
            <div className="absolute inset-0 h-full w-full bg-black/50 mask-t-from-50% rounded-xl  " />
        </motion.div >
    );
};

const Demo = () => {
    return <Cards />;
};

export default Demo;
