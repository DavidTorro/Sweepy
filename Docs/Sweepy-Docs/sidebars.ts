import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Sobre Sweepy',
      items: ['app/que-es-sweepy', 'app/diseno', 'app/arquitectura', 'app/guia'],
    },
    {
      type: 'category',
      label: 'Documentación',
      items: ['docs/login', 'docs/configuracion', 'docs/api'],
    },
    {
      type: 'category',
      label: 'Catálogo de componentes',
      items: [
        'catalogo/boton',
        'catalogo/text-field',
        'catalogo/card',
        'catalogo/separator',
      ],
    },
    {
      type: 'category',
      label: 'Getting started',
      items: ['gettingstarted/clonar', 'gettingstarted/entorno'],
    },
  ],
};

export default sidebars;
