function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__content">
        <p className="footer__author">&copy; 2024</p>
        <nav className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank">
            Яндекс.Практикум
          </a>
          <a className="footer__link" href="https://github.com/vitklassen" target="_blank">Github</a>
        </nav>
      </div>
    </footer>
  );
}
export default Footer;
