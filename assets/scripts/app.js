const addMovieModal = document.getElementById("add-modal");
// const addMovieModal = document.querySelector("#add-modal");
// const addMovieModal = document.body.children[1];
const movieButtonActions = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelActionButton = addMovieModal.querySelector(".btn--passive");
const addActionButton = cancelActionButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const cardMovieHolder = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const updateUI = () => {
	if (movies.length === 0) {
		cardMovieHolder.style.display = "block";
	} else {
		cardMovieHolder.style.display = "none";
	}
};
const cancelMovieDeletion = () => {
	toggleBackdrop();
	deleteMovieModal.classList.remove("visible");
};
const deleteMovie = (movieId) => {
	let movieIndex = 0;
	for (const movie of movies) {
		if (movie.id === movieId) {
			break;
		}
		movieIndex++;
	}
	movies.splice(movieIndex, 1);
	listRoot.children[movieIndex].remove();
	// listRoot.removeChild(listRoot.children[movieIndex]);
};
const deleteMovieHandler = (movieId) => {
	deleteMovieModal.classList.add("visible");
	toggleBackdrop();
	// deleteMovie(movieId);
};

const renderNewMovieEl = (id, title, image, rating) => {
	const newMovieEl = document.createElement("li");
	newMovieEl.className = "movie-element";
	newMovieEl.innerHTML = `
    <div class="movie-element__image">
      <img src="${image}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
	newMovieEl.addEventListener("click", deleteMovieHandler.bind(null, id));
	listRoot.append(newMovieEl);
};
const toggleBackdrop = () => {
	backdrop.classList.toggle("visible");
};
const closeMovieModal = () => {
	addMovieModal.classList.remove("visible");
};
const showMovieModal = () => {
	addMovieModal.classList.add("visible");
	toggleBackdrop();
};
const clearMovieInputs = () => {
	for (const usrInput of userInputs) {
		usrInput.value = "";
	}
};
const cancelActionHandler = () => {
	closeMovieModal();
	clearMovieInputs();
};

const addActionHandler = () => {
	const titleValue = userInputs[0].value;
	const imageUrlValue = userInputs[1].value;
	const ratingValue = userInputs[2].value;

	if (
		titleValue.trim() === "" ||
		imageUrlValue.trim() === "" ||
		ratingValue.trim() === "" ||
		+ratingValue < 1 ||
		+ratingValue > 5
	) {
		alert("Please enter valid values (rating between 1 to 5 ) ");
		return;
	}

	const newMovie = {
		id: Math.random().toString(),
		title: titleValue,
		image: imageUrlValue,
		rating: ratingValue,
	};

	movies.push(newMovie);
	console.log(movies);
	toggleBackdrop();
	closeMovieModal();
	clearMovieInputs();
	renderNewMovieEl(
		newMovie.id,
		newMovie.title,
		newMovie.image,
		newMovie.rating
	);
	updateUI();
};

const backdropClickHandler = () => {
	closeMovieModal();
	cancelMovieDeletion();
};
movieButtonActions.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelActionButton.addEventListener("click", cancelActionHandler);
addActionButton.addEventListener("click", addActionHandler);
