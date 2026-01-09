import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Sweepy',
  tagline: 'Plataforma de venta de servicios de limpieza',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.sweepy.es',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  // redirects all URLs with a trailing slash to their non-trailing slash version (e.g. /docs/ to /docs)
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'sweepy', // Usually your GitHub org/user name.
  projectName: 'sweepy', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'Sweepy Logo',
        src: 'img/Sweepy_Letter.png',
      },
      items: [
        {type: 'doc', docId: 'app/que-es-sweepy', label: 'Sobre Sweepy', position: 'left'},
        {type: 'doc', docId: 'docs/login', label: 'Documentación', position: 'left'},
        {type: 'doc', docId: 'catalogo/boton', label: 'Catálogo de componentes', position: 'left'},
        {type: 'doc', docId: 'gettingstarted/clonar', label: 'Getting started', position: 'left'},
        {href: 'https://github.com/deividturron', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      links: [
        {
          title: 'Sobre Sweepy',
          items: [
            {label: '¿Qué es Sweepy?', to: '/app/que-es-sweepy'},
            {label: 'Diseño', to: '/app/diseno'},
            {label: 'Arquitectura', to: '/app/arquitectura'},
            {label: 'Guía', to: '/app/guia'},
          ],
        },
        {
          title: 'Documentación',
          items: [
            {label: 'Login', to: '/docs/login'},
            {label: 'Configuración', to: '/docs/configuracion'},
            {label: 'API', to: '/docs/api'},
          ],
        },
        {
          title: 'Catálogo',
          items: [
            {label: 'Botón', to: '/catalogo/boton'},
            {label: 'Text Field', to: '/catalogo/text-field'},
            {label: 'Card', to: '/catalogo/card'},
            {label: 'Separator', to: '/catalogo/separator'},
          ],
        },
        {
          title: 'Getting started',
          items: [
            {label: 'Clonar', to: '/gettingstarted/clonar'},
            {label: 'Entorno', to: '/gettingstarted/entorno'},
          ],
        },
        {
          title: 'Contacto',
          items: [
            {label: 'Web', href: 'https://deividturron.tech'},
            {label: 'GitHub', href: 'https://github.com/davidtorro'},
            {label: 'LinkedIn', href: 'https://www.linkedin.com/in/david-torr%C3%B3-52b97a327/'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Sweepy`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
