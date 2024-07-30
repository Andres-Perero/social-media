import Head from "next/head";
import styles from "./page.module.css";
import data from "./data.json"; // Importa los datos desde el archivo JSON
import {
  InstagramIcon,
  OkruIcon,
  TwitchIcon,
  YoutubeIcon,
  TiktokIcon,
  TwitterXIcon,
} from "./icons"; // Ajusta la ruta según corresponda
import Image from 'next/image'
import Link from "next/link";

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
                <a
                  key={social.name}
                  href={social.link}
                  data-tooltip={social.name}
                >
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
                    height={250}
                  />
                </div>
              </section>
            </Link>

            <section className={styles.contact}>
              <Link href={links.battleSong} target="_blank">
                <h2>TORNEO DE OPENINGS</h2>
                <div className={styles.contactImage}>
                  <Image
                    src={animeImages.img_battleSong}
                    alt="Battle Song"
                    width={500}
                    height={200}
                  />
                </div>
              </Link>
            </section>
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
