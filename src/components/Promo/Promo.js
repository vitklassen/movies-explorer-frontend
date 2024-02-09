import promoImagePath from '../../images/Promo/promo__image.svg'
function Promo() {
  return (
    <section className="promo">
      <div className='promo__description'>
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__subtitle">Листай ниже, чтобы узнать больше про этот проект и его создателя.</p>
      </div>
      <img className="promo__image" src={ promoImagePath } alt='Картиночка'></img>
      <a className='promo__link' href='#project'>
        Узнать больше
      </a>
    </section>
  );
}
export default Promo;