function Footer() {
  return (
    <section className="footer">
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
    </section>
  );
}
export default Footer;
