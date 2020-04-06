import './styles.css';
import imageList from './templates/imageList.hbs';
import InfiniteScroll from 'infinite-scroll/js/index';
import 'material-design-icons/iconfont/material-icons.css';
import PNotify from '../node_modules/pnotify/dist/es/PNotify';


const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryItems: document.querySelector('#gallery'),    
};

let inputValue = '';

refs.searchForm.addEventListener('submit', searchFormSubmit);

function searchFormSubmit(e) {
    e.preventDefault();
    refs.galleryItems.innerHTML = '';
    infScrollInstance.pageIndex = 1;
    const form = e.currentTarget;
    const input = form.elements.query;
    inputValue = input.value;
    if (inputValue === '') {
      PNotify.error({
          text: 'Еще раз повтори!)',
      });
  } else {
      infScrollInstance.loadNextPage();
  }    
};

const infScrollInstance = new InfiniteScroll(refs.galleryItems, {
    responseType: 'text',
    history: false,
    path() {
        return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputValue}&page=${this.pageIndex}&per_page=12&key=15903117-62813f49f176eea2cde684d25`
    }
});

infScrollInstance.on('load', response => {
    const posts = JSON.parse(response);
    const hitsPosts = posts.hits;
    const markup = hitsPosts.map(post => imageList(post)).join('');
    const proxyEl = document.createElement('div');
    proxyEl.innerHTML = markup;
    const allItems = proxyEl.querySelectorAll('.photo-card');
    infScrollInstance.appendItems(allItems);
  });






