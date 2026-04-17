document.querySelectorAll('.menu-title').forEach(title => {
  title.addEventListener('click', function () {
    const parent = this.parentElement;

    document.querySelectorAll('.dropdown').forEach(item => {
      if (item !== parent) item.classList.remove('active');
    });

    parent.classList.toggle('active');
  });
});

