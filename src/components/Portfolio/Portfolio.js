import imagePath from '../../images/AboutMe/student__project-button.svg'
function Portfolio() {
    return (
        <div className="portfolio">
        <h3 className="portfolio__title">Портфолио</h3>
        <div className="portfolio__projects">
          <div className="portfolio__project">
            <p className="portfolio__name">Статичный сайт</p>
            <a
              className="portfolio__link"
              href="https://github.com/vitklassen"
              target="_blank"
            >
              <img className="portfolio__image" src={imagePath}></img>
            </a>
          </div>
          <div className="portfolio__project">
            <p className="portfolio__name">Адаптивный сайт</p>
            <a
              className="portfolio__link"
              href="https://github.com/vitklassen"
              target="_blank"
            >
              <img className="portfolio__image" src={imagePath}></img>
            </a>
          </div>
          <div className="portfolio__project">
            <p className="portfolio__name portfolio__name_number_last">Одностраничное приложение</p>
            <a
              className="portfolio__link"
              href="https://github.com/vitklassen"
              target="_blank"
            >
              <img className="portfolio__image" src={imagePath}></img>
            </a>
          </div>
        </div>
      </div>
    );
}
export default Portfolio;