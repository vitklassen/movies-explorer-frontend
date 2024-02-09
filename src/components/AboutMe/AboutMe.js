import photoPath from "../../images/AboutMe/student__photo.png";
import Portfolio from "../Portfolio/Portfolio";
function AboutMe() {
  return (
    <section className="student">
      <div className="student__header">
        <h2 className="student__title">Студент</h2>
      </div>
      <div className="student__profile">
        <div className="student__description">
          <h3 className="student__name">Виталий</h3>
          <p className="student__job">Фронтенд-разработчик, 30 лет</p>
          <p className="student__info">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="student__github"
            href="https://github.com/vitklassen"
            target="_blank"
          >
            Github
          </a>
        </div>
        <img className="student__photo" alt="Студент" src={photoPath}></img>
      </div>
      <Portfolio />
    </section>
  );
}
export default AboutMe;
