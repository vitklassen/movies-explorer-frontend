import { Link } from 'react-router-dom'
function ErrorPage() {
    return (
        <main className="error-page">
            <div className="error-page__content">
                <h2 className="error-page__title">404</h2>
                <p className="error-page__subtitle">Страница не найдена</p>
                <Link className="error-page__link" to="/">Назад</Link>
            </div>
        </main>
    );
}
export default ErrorPage;