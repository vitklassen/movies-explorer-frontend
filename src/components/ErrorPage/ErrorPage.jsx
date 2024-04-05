const ErrorPage = ({redirect}) => {
    return (
        <main className="error-page">
            <div className="error-page__content">
                <h2 className="error-page__title">404</h2>
                <p className="error-page__subtitle">Страница не найдена</p>
                <button className="error-page__button" onClick={redirect}>Назад</button>
            </div>
        </main>
    );
}
export default ErrorPage;