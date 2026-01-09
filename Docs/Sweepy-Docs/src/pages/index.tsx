import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <img 
            src="/img/Sweepy_Letter.png" 
            alt="Sweepy Logo" 
            className={styles.heroLogo}
          />
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>Rápido, simple, Sweepy.</p>
          <p className={styles.heroDescription}>
            Aplicación móvil diseñada para facilitar el alquiler de recursos entre personas y negocios. 
            Permite publicar, encontrar y reservar objetos, herramientas, equipos o pequeños espacios de forma inmediata y sin complicaciones.
          </p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button', styles.primaryButton)}
              to="/app/que-es-sweepy">
              Saber más
            </Link>
            <Link
              className={clsx('button', styles.secondaryButton)}
              to="/catalogo/boton">
              Componentes
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Features() {
  const features = [
    {
      title: 'Marketplace de recursos',
      description: 'Publicación de artículos o espacios, filtros por categoría, precio o disponibilidad. Búsqueda moderna y clara.',
    },
    {
      title: 'Sistema de reservas',
      description: 'Disponibilidad en tiempo real, calendario integrado, confirmaciones y notificaciones.',
    },
    {
      title: 'Perfiles de usuario',
      description: 'Perfiles completos, historial de reservas, valoraciones y favoritos.',
    },
    {
      title: 'Gestión para anfitriones',
      description: 'Crear anuncios, control de disponibilidad, modificación de precios y estadísticas básicas.',
    },
    {
      title: 'Panel de Administración',
      description: 'Gestión de usuarios, moderación de anuncios, supervisión de la plataforma y estadísticas globales.',
    },
    {
      title: 'Experiencia rápida y urbana',
      description: 'Interfaz moderna con tema claro y oscuro. Enfoque en velocidad, claridad y simplicidad.',
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className={styles.featuresTitle}>
          Características Principales
        </Heading>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const techIcons: Record<string, string> = {
    'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Expo': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg',
    'Expo Router': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg',
    'NativeWind': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'Docusaurus 3': 'https://d33wubrfki0l68.cloudfront.net/c088b7acfcf11100903c44fe44f2f2d7e0f30531/47727/img/docusaurus.svg',
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Markdown': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg',
    'MDX': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg',
    'Node.js 20+': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'npm': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
    'yarn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'
  };

  const techLinks: Record<string, string> = {
    'React Native': 'https://reactnative.dev/docs/getting-started',
    'Expo': 'https://docs.expo.dev/',
    'Expo Router': 'https://docs.expo.dev/router/introduction/',
    'NativeWind': 'https://www.nativewind.dev/v4/overview',
    'TypeScript': 'https://www.typescriptlang.org/docs/',
    'Docusaurus 3': 'https://docusaurus.io/docs',
    'React': 'https://react.dev/learn',
    'Markdown': 'https://www.markdownguide.org/basic-syntax/',
    'MDX': 'https://mdxjs.com/docs/',
    'Node.js 20+': 'https://nodejs.org/docs/latest-v20.x/api/',
    'npm': 'https://docs.npmjs.com/',
    'yarn': 'https://yarnpkg.com/getting-started',
    'Git': 'https://git-scm.com/doc',
    'VS Code': 'https://code.visualstudio.com/docs'
  };

  const stack = {
    'Frontend': ['React Native', 'Expo', 'Expo Router', 'NativeWind', 'TypeScript'],
    'Documentación': ['Docusaurus 3', 'React', 'Markdown', 'MDX'],
    'Desarrollo': ['Node.js 20+', 'npm', 'yarn', 'Git', 'VS Code']
  };

  return (
    <section className={styles.stack}>
      <div className="container">
        <Heading as="h2" className={styles.stackTitle}>
          Stack Tecnológico
        </Heading>
        <div className={styles.stackGrid}>
          {Object.entries(stack).map(([category, techs]) => (
            <div key={category} className={styles.stackCategory}>
              <h3>{category}</h3>
              <div className={styles.stackTags}>
                {techs.map((tech) => (
                  <a
                    key={tech}
                    className={styles.stackTag}
                    href={techLinks[tech]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={techIcons[tech]}
                      width="20"
                      height="20"
                      alt={tech}
                      loading="lazy"
                    />
                    {tech}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Plataforma de servicios de limpieza">
      <div className={styles.pageWrapper}>
        <HomepageHeader />
        <main>
          <Features />
          <Stack />
        </main>
      </div>
    </Layout>
  );
}
