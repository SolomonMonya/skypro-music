"use client";
import styles from "./Navigation.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Image
          className={styles.logoImage}
          src="/img/logo.png"
          alt="Логотип СкайПро музыка"
          width={113}
          height={17}
        />
      </div>
      <div
        onClick={() => setIsOpened((prev) => !prev)}
        className={styles.navBurger}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpened ? (
        <div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Главное
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Мой плейлист
              </a>
            </li>
            <li className={styles.menuItem}>
              <Link href="/signin" className={styles.menuLink}>
                Войти
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
