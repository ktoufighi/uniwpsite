// import $ from 'jquery';

class Search {
  // Level 1 is Constructor Function (it creates/initites our object(s).)
  // This is a keyword in jqury that let us look into an object be it the whole // document (DOM) or any of the Methods below.
  constructor() {
    this.addSearchHTML();
    this.resultsDiv = $("#search-overlay__results");
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.searchField = $("#search-term");
    this.events();
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.previousValue;
    this.typingTimer;
  }

  // Level 2 is Event (responding to an event)
  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));
    $(document).on("keydown", this.keyPressDispatcher.bind(this));
  }



  // Level 3 is Method (Actions, Functions)
  typingLogic(){
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer);
      if (!this.isSpinnerVisible) {
        this.resultsDiv.html('<div class="spinner-loader"></div>');
        this.isSpinnerVisible = true;
      }
      this.typingTimer = setTimeout(this.getResults.bind(this), 1000);
    }
      this.previousValue = this.searchField.val();
  }

  getResults(){
    $.when(
      $.getJSON(universityData.root_url +  '/WordPress/wp-json/wp/v2/posts/?per_search' + this.searchField.val()),
      $.getJSON(universityData.root_url +  '/WordPress/wp-json/wp/v2/pages/?per_search' + this.searchField.val())
      ).then((posts, pages) => {
      var combinedResults = posts[0].concat(pages[0]);
      this.resultsDiv.html(`
        <h2 class="search-overlay__section-title">General Information</h2>
        ${combinedResults.length ? '<ul class="link-list min-list">' : '<p>No general information matches that search.</p>'}
          ${combinedResults.map(item => `<li><a href="${item.link}">${item.title.rendered}</a></li>`).join('')}
        ${combinedResults.length ? '</ul>' : ''}
      `);
      this.isSpinnerVisible = false;
    });
  }

  keyPressDispatcher(e) {
    if(e.keyCode == 83 && !this.isOverlayOpen) {
      this.openOverlay();
      this.isOverlayOpen = true;
    }

    if(e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay();
      this.isOverlayOpen = false;
    }
  }

  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    this.searchField.val('');
    //ananomous function we can also do it with ES6
    //setTimeout(() => this.searchField.focus(), 301)
    setTimeout(function() {
      this.searchField.focus();}, 301);
  }

  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
  }

  addSearchHTML() {
    $("body").append(`
      <div class="search-overlay">
        <div class="search-overlay__top">
          <div class="container">
            <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
            <input type="text" class="search-term" placeholder="Search" id="search-term">
            <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
          </div>
        </div>

        <div class="container">
          <div id="search-overlay__results"></div>
        </div>
      </div>
      `);
  }

}

var searchBar = new Search();

//export default Search;
