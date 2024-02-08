"use client"

import "@/app/globals.css"
import Image from "next/image";
import background from "@/public/Фон.png";
import pic from "@/public/Котик_злой.gif";
import {useEffect, useState} from "react";
import {Caveat} from 'next/font/google'
import classNames from "classnames";
import {useRouter} from "next/navigation";

const caveat = Caveat({
    subsets: ['cyrillic'],
    weight: ['700'],
})

export default function NoPage() {
    const [backgroundColor, setBackgroundColor] = useState("#ffcccc");
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            const randomPinkColor = getRandomPinkColor();
            setBackgroundColor(randomPinkColor);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTimeout(() => router.push('/'), 2000);
    }, []);

    function getRandomPinkColor(): string {
        const minRed = 220;
        const maxRed = 255;
        const minGreen = 0;
        const maxGreen = 130;
        const minBlue = 160;
        const maxBlue = 255;

        const red = Math.floor(Math.random() * (maxRed - minRed + 1)) + minRed;
        const green = Math.floor(Math.random() * (maxGreen - minGreen + 1)) + minGreen;
        const blue = Math.floor(Math.random() * (maxBlue - minBlue + 1)) + minBlue;

        const redHex = red.toString(16).padStart(2, '0');
        const greenHex = green.toString(16).padStart(2, '0');
        const blueHex = blue.toString(16).padStart(2, '0');

        return `#${redHex}${greenHex}${blueHex}`;
    }

    return (
        <div className="flex items-center justify-center h-screen"
             style={{
                 backgroundColor: backgroundColor,
                 transition: "background-color 0.5s ease"
             }}>
            <Image
                src={background}
                alt={"Фон"}
                fill={true}
                style={{objectFit: "cover"}}
                quality={100}
            />
            <div className="z-[1]">
                <Image
                    src={pic}
                    height={400}
                    className={"mx-auto"}
                    alt={"Котик"}/>
                <div className={"text-center mb-8"}>
                    <h1 className={classNames("text-7xl text-white font-bold mb-8", caveat.className)}>
                        Эта кнопка просто для галочки 😡😡
                    </h1>
                </div>
            </div>
        </div>
    );
}