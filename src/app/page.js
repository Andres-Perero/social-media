"use client";

import Head from "next/head";
import styles from "./page.module.css";
import data from "./data.json";
import {
  InstagramIcon,
  OkruIcon,
  TwitchIcon,
  YoutubeIcon,
  TiktokIcon,
  TwitterXIcon,
} from "./icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const iconComponents = {
  InstagramIcon,
  OkruIcon,
  TwitchIcon,
  YoutubeIcon,
  TiktokIcon,
  TwitterXIcon,
};

export default function Page() {
  const { description, socials, schedule, animeImages, links } = data;

  // Añadir el efecto de movimiento del mouse
  useEffect(() => {
    const elements = document.querySelectorAll(`.${styles.animeImage}, .${styles.contactImage}`);

    const handleMouseMove = (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = (y / rect.height - 0.5) * 40;
      const rotateY = (x / rect.width - 0.5) * -40;

      event.currentTarget.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = (event) => {
      event.currentTarget.style.transform = `scale(1) rotateX(0) rotateY(0)`;
    };

    elements.forEach((element) => {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Resaltar el día actual en el cronograma
  useEffect(() => {
    const daysOfWeekInSpanish = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const today = new Date();
    const dayOfWeek = today.getDay();
    const tableHeaderCells = document.querySelectorAll(`.${styles.scheduleTable} th`);
    const tableBodyCells = document.querySelectorAll(`.${styles.scheduleTable} td`);

    // Resaltar en el encabezado
    tableHeaderCells.forEach((cell) => {
      if (cell.textContent === daysOfWeekInSpanish[dayOfWeek]) {
        cell.classList.add(styles.currentDay);
      }
    });

    // Resaltar en el cuerpo de la tabla
    tableBodyCells.forEach((cell, index) => {
      const cellIndex = index % 7;
      if (tableHeaderCells[cellIndex].textContent === daysOfWeekInSpanish[dayOfWeek]) {
        cell.classList.add(styles.currentDay);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>WebPage</title>
        <meta name="description" content="Horario de Animes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.column}>
          <section className={styles.description}>
            <h2>{description.name}</h2>
            <h3>{description.title}</h3>
            <p>{description.bio}</p>
          </section>

          <div className={styles.socials}>
            {socials.map((social) => {
              const IconComponent = iconComponents[social.icon];
              return (
                <a key={social.name} href={social.link} data-tooltip={social.name}>
                  <IconComponent />
                </a>
              );
            })}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.animeContactContainer}>
            <Link href={"/vistos"}>
              <section className={styles.anime}>
                <h2>ANIME VISTOS</h2>
                <div className={styles.animeImage}>
                  <Image
                    src={animeImages.img_folderAnime}
                    alt="Anime Image"
                    width={500}
                    height={200}
                  />
                </div>
              </section>
            </Link>
            <Link href={links.battleSong}>
              <section className={styles.contact}>
                <h2>TORNEO DE OPENINGS</h2>
                <div className={styles.contactImage}>
                  <Image
                    src={animeImages.img_battleSong}
                    alt="Battle Song"
                    width={500}
                    height={200}
                  />
                </div>
              </section>
            </Link>
          </div>
        </div>
      </main>

      <section className={styles.schedule}>
        <h2>HORARIO - CRONOGRAMA</h2>
        <table className={styles.scheduleTable}>
          <thead>
            <tr>
              {schedule.header.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 {description.name}</p>
      </footer>
    </div>
  );
}
