// import $ from 'jquery';

class Search {
  // Level 1 is Constructor Function (it creates/initites our object(s).)
  // This is a keyword in jqury that let us look into an object be it the whole // document (DOM) or any of the Methods below.
  constructor() {
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.searchField = $("#search-term");
    this.events();
    this.isOverlayOpen = false;
  }

  // Level 2 is Event (responding to an event)
  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    this.searchField.on("keydown", this.typingLogic.bind(this));
    $(document).on("keydown", this.keyPressDispatcher.bind(this));
  }



  // Level 3 is Method (Actions, Functions)
  typingLogic(){
    keydown.setTimeout(function() {console.log("say hello when this happends.")}, 3000);;

  }

  function (functionName) {
    alert("say hello");
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
  }

  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
  }

}

var searchBar = new Search();

//export default Search;
