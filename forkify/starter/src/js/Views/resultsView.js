import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! please try again!';
  _message = '';
  _generateMarKup() {
    console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new resultsView();
