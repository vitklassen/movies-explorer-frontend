function AboutProject() {
  return (
    <section className="project">
      <div className="project__header">
        <h2 className="project__title">О проекте</h2>
      </div>
      <div className="project__description">
        <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
        <h3 className="project__subtitle">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="project__text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p className="project__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="project__development">
        <p className="project__block">1 неделя</p>
        <p className="project__block">4 недели</p>
        <p className="project__block project__block_type_part">Back-end</p>
        <p className="project__block project__block_type_part">Front-end</p>
      </div>
    </section>
  );
}
export default AboutProject;
