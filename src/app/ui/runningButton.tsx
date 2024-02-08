import React, {ReactNode, useEffect, useRef, useState} from 'react';
import Link from "next/link";
import {UrlObject} from "node:url";

interface RunningButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement> {
    href: string | UrlObject;
    children: ReactNode;
}

const RunningButton = ({children, href, ...rest}: RunningButtonProps) => {
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleWindowResize = () => {
            const button = buttonRef.current;
            if (!button) return;

            const {innerWidth: windowWidth, innerHeight: windowHeight} = window;
            const {width, height, top, left} = button.getBoundingClientRect();

            // Проверяем, чтобы кнопка не выходила за границы окна
            if (left + width > windowWidth) {
                button.style.left = `${windowWidth - width}px`;
            }
            if (top + height > windowHeight) {
                button.style.top = `${windowHeight - height}px`;
            }
        };

        // Подписываемся на событие изменения размеров окна
        window.addEventListener('resize', handleWindowResize);

        // Отписываемся от события при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const {clientX, clientY} = event;
        const button = buttonRef.current;
        if (!button) return;

        button.style.position = 'absolute';

        const {width, height, top, left} = button.getBoundingClientRect();

        let offsetX = (clientX < left + width / 2) ? 50 : -50;
        let offsetY = (clientY < top + height / 2) ? 50 : -50;

        const newLeft = left + offsetX;
        const newTop = top + offsetY;

        buttonRef.current.style.transition = 'left 0.2s ease-out, top 0.2s ease-out';
        if (newLeft >= 0 && newLeft + width <= window.innerWidth) {
            button.style.left = `${newLeft}px`;
        }
        if (newTop >= 0 && newTop + height <= window.innerHeight) {
            button.style.top = `${newTop}px`;
        }
    };

    return (
        <div ref={buttonRef}
             onMouseMove={handleMouseMove}>
            <Link href={href} {...rest}>
                {children}
            </Link>
        </div>
    );
};

export default RunningButton;