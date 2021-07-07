// const formName = document.querySelector(".formName");
// const formComment = document.querySelector(".formComment");
// const submitKomentar = document.querySelector("button.submit-komentar");
// const kolomKomentar = document.querySelector(".kolom-komentar");

// submitKomentar.addEventListener("click", function(e) {
//     e.preventDefault();
//     let randomNumber = Math.floor(Math.random() * 3) + 1;
//     let inputName = formName.value;
//     let inputComment = formComment.value;

//     if (inputName !== "" && inputComment !== "")
//     kolomKomentar.innerHTML = '<div class="col-lg-8"><div class="card mb-3 rounded-0 p-3"><div class="row no-gutters d-flex align-items-center"><div class="col-md-2"><img src="../img/post/komentar/' + randomNumber + '.jpg" class="card-img-top rounded-circle" alt="post" /></div><div class="col-md-10"><div class="card-body py-0"><h4 class="card-title font-weight-bold">' + inputName + '</h4><p class="card-text">' + inputComment + '</p><a href="#">Balas &raquo;</a></div></div></div></div></div>' + kolomKomentar.innerHTML;

//     formName.value = "";
//     formComment.value = "";
// })