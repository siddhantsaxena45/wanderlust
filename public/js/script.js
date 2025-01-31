let burger = document.querySelector(".navbar-toggler");
let navbar = document.querySelector(".navbar");
let ul=document.querySelector(".collapse");
burger.addEventListener("click", () => {
   
    navbar.classList.toggle("expanded");
    ul.classList.toggle("flex-row");
});

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach((form) => {
            form.addEventListener('submit', (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})();