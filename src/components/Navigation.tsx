import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <div
      className={`
        ${styles.height}
        flex-nowrap row no-gutters-vertical align-items-center justify-content-between
      `}
    >
      {/* Logo y acceso rápido */}
      <div className="col-auto d-flex align-items-center">
        <a
          className="d-none d-sm-flex mc-sr-only mc-sr-only-focusable mc-text-h7 mc-mr-4"
          href="#mc-main"
        >
          Skip To Main Content
        </a>
        <Link href="/">
          <a>
            <span className="mc-sr-only">MasterClass logo</span>
            <div className="d-flex">
              {/* SVG icono principal */}
              <svg
                width="2em"
                height="2em"
                fill="none"
                viewBox="0 0 24 24"
                className="mc-icon mc-icon--4 mc-text-color--primary"
              >
                <path
                  fill="currentColor"
                  d="M11.843 12.6…"
                />
              </svg>
              {/* Wordmark para pantallas grandes */}
              <svg
                width="2em"
                height="2em"
                fill="none"
                viewBox="0 0 110 15"
                className="d-none d-lg-block mc-ml-2 mc-icon"
                style={{ width: '100px' }}
              >
                {/* …resto del path… */}
              </svg>
            </div>
          </a>
        </Link>
      </div>

      {/* Navegación central: Browse, búsqueda, etc. */}
      <div className="col-auto d-flex align-items-center flex-grow-1 flex-shrink-1 justify-content-end justify-content-sm-start">
        <button
          type="button"
          className="c-button c-button--secondary c-button--sm mc-mr-2 mc-py-3 Browse_browseBtn__UsvnB"
        >
          Browse
          <svg
            width="24"
            height="25"
            fill="none"
            viewBox="0 0 24 24"
            className="mc-icon mc-icon--sm mc-ml-2"
          >
            <path
              fill="currentColor"
              d="M2.325 7.322…"
            />
          </svg>
        </button>
        {/* Aquí iría tu input de búsqueda y otros elementos */}
      </div>

      {/* Enlaces de usuario: At Work, View Plans, Login, Get MasterClass */}
      <div className="col-auto d-flex align-items-center">
        <a className="mc-ml-4 d-none d-md-block" href="/for-business">
          At Work
        </a>
        <a className="d-none d-md-block mc-ml-4" href="/checkout">
          View Plans
        </a>
        <a className="d-md-none mc-clickable mc-py-2 Menu_item__BwKx2" href="#menu">
          Menu
        </a>
        <Link href="/promotion">
          <a className="c-button c-button--primary c-button--md d-none d-md-block mc-ml-4">
            Get MasterClass
          </a>
        </Link>
      </div>
    </div>
  );
}
