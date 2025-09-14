 const boxes = document.querySelectorAll('.box');

    window.addEventListener('scroll', checkBoxes);

    function checkBoxes() {
      const triggerBottom = window.innerHeight * 1;

      boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
          box.classList.add('show');
        } else {
          box.classList.remove('show');
        }
      });
    }
     checkBoxes();

     const navbar=document.getElementById("nav");
     addEventListener("scroll",() => {
      if(scrollY>0){
        navbar.classList.add("hidden")
      }else{
        navbar.classList.remove("hidden")
      }
     })