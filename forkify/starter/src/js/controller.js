import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import resultsView from './Views/resultsView.js';
import bookmarksView from './Views/bookmarksView.js';
import PaginationView from './Views/paginationView.js';

// import icons from '../img/icons.svg'; //parcel 1
// import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './Views/paginationView.js';
// const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// const renderSpinner = function (parentEl) {
//   const markup = ` <div class="spinner">
//      <svg>
//        <use href="${icons}#icon-loader"></use>
//      </svg>
//    </div> `;
//   parentEl.innertHTML = '';
//   parentEl.insertAdjacentHTML('afterbegin', markup);
// };
// console.log('TEST');
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //  0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    // 3 updating bookmarks
    bookmarksView.update(model.state.bookmarks);
    // 1.Loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //2 .Rendering Recipe
    recipeView.render(model.state.recipe);

    // console.log(model.state.recipe);
    // TEST
    // controlServings();
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
  // const res = await fetch(
  //   'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
  // );
  // const data = await res.json();
};
// ['hashchange', 'load'].map(ev => window.addEventListener(ev, controlRecipes));
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1 set search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 3) Render results
  // console.log(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4) Render initial pagination buttons
  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  //update the revipe view
  recipeView.update(model.state.recipe);
};
// controlSearchResults();

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  console.log(model.state.recipe);
  // 2)Update recipe view
  recipeView.update(model.state.recipe);
  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
