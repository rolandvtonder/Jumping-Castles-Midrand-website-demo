import {StrictMode, lazy, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import {Layout} from './components/Layout';
import type {PageId} from './content';
import './index.css';

// Each HTML page names itself in <body data-page>; only that page's code loads.
const pages = {
  home: lazy(() => import('./pages/Home')),
  castles: lazy(() => import('./pages/Castles')),
  extras: lazy(() => import('./pages/Extras')),
  gallery: lazy(() => import('./pages/Gallery')),
  areas: lazy(() => import('./pages/Areas')),
  contact: lazy(() => import('./pages/Contact')),
} satisfies Record<PageId, unknown>;

const id = (document.body.dataset.page as PageId) in pages ? (document.body.dataset.page as PageId) : 'home';
const Page = pages[id];

// The hero transitions depend on scroll position; start every page at the top
// unless the URL points at a section.
if ('scrollRestoration' in history && !location.hash) history.scrollRestoration = 'manual';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout page={id}>
      <Suspense fallback={<div className="h-svh bg-ink" />}>
        <Page />
      </Suspense>
    </Layout>
  </StrictMode>,
);
