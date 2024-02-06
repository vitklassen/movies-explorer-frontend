import imagePath from "../../images/AboutMe/student__project-button.svg";
function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__projects">
        <li className="portfolio__project">
          <a
            className="portfolio__name"
            href="https://github.com/vitklassen"
            target="_blank"
          >
            Статичный сайт
          </a>
          <a
            className="portfolio__link"
            href="https://github.com/vitklassen"
            target="_blank"
          >
            <img
              className="portfolio__image"
              src={imagePath}
              alt="Ссылка"
            ></img>
          </a>
        </li>
        <li className="portfolio__project">
          <a
            className="portfolio__name"
            href="https://github.com/vitklassen"
            target="_blank"
          >
            Адаптивный сайт
          </a>
          <a
            className="portfolio__link"
            href="https://github.com/vitklassen"
            target="_blank"
          >
            <img
              className="portfolio__image"
              src={imagePath}
              alt="Ссылка"
            ></img>
          </a>
        </li>
        <li className="portfolio__project">
          <a
            className="portfolio__name"
            href="https://github.com/vitklassen"
            target="_blank"
          >
            Одностраничное приложение
          </a>
          <a
            className="portfolio__link"
            href="https://github.com/vitklassen"
            target="_blank"
          >
            <img
              className="portfolio__image"
              src={imagePath}
              alt="Ссылка"
            ></img>
          </a>
        </li>
      </ul>
    </div>
  );
}
export default Portfolio;
