(function($) {

    "use strict";

    // product quantity
    var initProductQty = function(){

      $('.product-qty').each(function(){

        var $el_product = $(this);
        var quantity = 0;

        $el_product.find('.quantity-right-plus').click(function(e){
            e.preventDefault();
            var quantity = parseInt($el_product.find('#quantity').val());
            $el_product.find('#quantity').val(quantity + 1);
        });

        $el_product.find('.quantity-left-minus').click(function(e){
            e.preventDefault();
            var quantity = parseInt($el_product.find('#quantity').val());
            if(quantity>0){
              $el_product.find('#quantity').val(quantity - 1);
            }
        });

      });

    }

    $(document).ready(function() {
      
      /* Video */
      var $videoSrc;  
        $('.play-btn').click(function() {
          $videoSrc = $(this).data( "src" );
        });

        $('#myModal').on('shown.bs.modal', function (e) {

        $("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
      })

      $('#myModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src',$videoSrc); 
      })

      var swiper = new Swiper(".main-swiper", {
        speed: 800,
        loop: true,
        pagination: {
          el: ".main-slider-pagination",
          clickable: true,
        },
      });
      
      var swiper = new Swiper(".product-swiper", {
        speed: 800,
        spaceBetween: 20,
        navigation: {
          nextEl: ".product-carousel-next",
          prevEl: ".product-carousel-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 20,
          }
        },
      });

      var swiper = new Swiper(".testimonial-swiper", {
        speed: 800,
        navigation: {
          nextEl: ".testimonial-arrow-next",
          prevEl: ".testimonial-arrow-prev",
        },
      });

      var swiper = new Swiper(".product-swiper2", {
        speed: 800,
        spaceBetween: 20,
        navigation: {
          nextEl: ".product-carousel-next2",
          prevEl: ".product-carousel-prev2",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 20,
          }
        },
      });

      var thumb_slider = new Swiper(".thumb-swiper", {
        slidesPerView: 1,
      });
      var large_slider = new Swiper(".large-swiper", {
        spaceBetween: 10,
        effect: 'fade',
        thumbs: {
          swiper: thumb_slider,
        },
      });

      initProductQty();
      
    }); // End of a document ready

})(jQuery);

let URL_Imagen = 'https://raw.githubusercontent.com/DAWMFIEC/DAWM-apps/datos/bookstore-images.json'
let URL_Datos = 'https://raw.githubusercontent.com/DAWMFIEC/DAWM-apps/datos/bookstore-books.xml'

let parseXML = (responseText, URL_Imagen) => {

  const parser = new DOMParser();
  const xml = parser.parseFromString(responseText, "application/xml");
  
  let bookElement = document.querySelector("#bookstorebody")
  bookElement.innerHTML = ''


  let bookArr = xml.querySelectorAll("book")

  bookArr.forEach(book => {
      
      let book_title = book.querySelector("Book-Title")
      let book_author = book.querySelector("Book-Author")
      let year_publication = book.querySelector("Year-Of-Publication")
      let publisher = book.querySelector("Publisher")
      let ISBN = book.querySelector("ISBN")

      fetch( URL_Imagen )
      .then(responseText2 => responseText2.json())
      .then(responseJSON => {
        let plotRef = document.getElementById('ISBN');
    
        let isbn_img = responseJSON.ISBN;
        
        let ciudad = responseJSON.timezone.slice(8);
    
        //Etiquetas de los datos
        let data = responseJSON.hourly.precipitation_probability;

      let plantilla = 
      <div class="col-lg-2 mb-2 text-center">
        <div class="card border-0 rounded-0">
          <div class="card-image">
            <img src="key:Image-URL-M" alt="blog-img" class="img-fluid">
          </div>
        </div>
        <div class="card-body text-capitalize">
          <div class="card-meta fs-6">
            <span class="meta-date"> book_author </span>
            <span class="meta-category">/ <a href="blog.html"> year_publication </a></span>
          </div>
          <h4 class="card-title">
            <a href="buy.html"> book_title </a>
          </h4>
        </div>
      </div>

      //Renderizando la plantilla en el elemento HTML
      bookElement.innerHTML += plantilla;
  })

}

try {
  
  let response = await fetch(URL_Datos)
  let responseText = await response.text()
  await parseXML(responseText, URL_Imagen)

} 
  catch (error) {
  console.log(error)
}
let plantilla = 
<div class="col-lg-2 mb-2 text-center">
  <div class="card border-0 rounded-0">
    <div class="card-image">
      <img src="key:Image-URL-M" alt="blog-img" class="img-fluid">
    </div>
  </div>
  <div class="card-body text-capitalize">
    <div class="card-meta fs-6">
      <span class="meta-date"> tag:Book-Author </span>
      <span class="meta-category">/ <a href="blog.html"> tag:Year-Of-Publication </a></span>
    </div>
    <h4 class="card-title">
      <a href="buy.html"> tag:Book-Title </a>
    </h4>
  </div>
</div>