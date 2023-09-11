const startBtn = document.getElementById("start-bn");
let khoilop = 0;
let capdo = 0;


startBtn.addEventListener("click", () => {
    var khoilop = $('#khoilop').val();
    var capdo = $('#capdo').val();
    var name = $('#name').val();
    localStorage.setItem('name', name);
    localStorage.setItem('khoilop', khoilop);
    localStorage.setItem('capdo', capdo);
    window.location.href = "game.html";



});
