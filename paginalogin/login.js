function loginbuttom(){
    alert("ok")
}
function login() {
  const nome = document.getElementById("Nome").value;
  const password = document.getElementById("password").value;

  const ref = db.ref("funcionarios");

  ref.once("value", (snapshot) => {

    if (snapshot.hasChild(nome)) {
      const funcionarioSnap = snapshot.child(nome);
      const senhaDoBanco = funcionarioSnap.child("password").val();

      if (senhaDoBanco === password) {
        localStorage.setItem("nome",nome);
        window.location.href="../Funcionario/Func.html"
      } else {
        alert("Senha incorreta");
      }
    } else {
      alert("Login incorreto");
    }
  });
}

function loginADM() {
  const nome = document.getElementById("Nome").value;
  const password = document.getElementById("password").value;

  const ref = db.ref("ADMS");

  ref.once("value", (snapshot) => {

    if (snapshot.hasChild(nome)) {
      const funcionarioSnap = snapshot.child(nome);
      const senhaDoBanco = funcionarioSnap.child("password").val();

      if (senhaDoBanco === password) {
        localStorage.setItem("nome",nome);
        window.location.href="../ADM/ADM.html"
      } else {
        alert("Senha incorreta");
      }
    } else {
      alert("Login incorreto");
    }
  });
}