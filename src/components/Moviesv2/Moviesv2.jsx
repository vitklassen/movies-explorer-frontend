import Preloader from "../Preloader/Preloader"
import SearchForm from "../SearchForm/SearchForm"

const Movies = ({isSending, stateError}) => {
    return (
        <main className="main-movies">
            <SearchForm />
            {isSending ? <Preloader /> : stateError ? (<h2 className="movies__error">{error}</h2>) : }
        </main>
    )
}