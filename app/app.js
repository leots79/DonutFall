jQuery(document).ready(function ($) {
    $(".slider-img").on("click", function () {
      $(".slider-img").removeClass("active");
      $(this).addClass("active");
    });
  });

  function expandImage(image) {
    // Cambia el tamaño de la imagen al hacer clic
    image.classList.toggle("expanded");
}

