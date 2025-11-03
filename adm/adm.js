function calcularDiferencaDeTempo(hora1, hora2) {
  const horario1 = new Date(`1970-01-01T${hora1}Z`);
  const horario2 = new Date(`1970-01-01T${hora2}Z`);
  const diferencaMs = Math.abs(horario1 - horario2);
  const horas = Math.floor(diferencaMs / (1000 * 60 * 60));
  const minutos = Math.floor((diferencaMs % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencaMs % (1000 * 60)) / 1000);
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

function somarTempos(hora1, hora2) {
  function tempoParaSegundos(hora) {
    const [h, m, s] = hora.split(':').map(Number);
    return h * 3600 + m * 60 + s;
  }

  function segundosParaTempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    segundos %= 3600;
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
  }

  const segundos1 = tempoParaSegundos(hora1);
  const segundos2 = tempoParaSegundos(hora2);
  const somaSegundos = segundos1 + segundos2;
  return segundosParaTempo(somaSegundos);
}

function subtrairTempos(hora1, hora2) {
  function tempoParaSegundos(hora) {
    const [h, m, s] = hora.split(':').map(Number);
    return h * 3600 + m * 60 + s;
  }

  function segundosParaTempo(segundos) {
    const sinal = segundos < 0 ? "-" : "";
    segundos = Math.abs(segundos);
    const horas = Math.floor(segundos / 3600);
    segundos %= 3600;
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${sinal}${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
  }

  const segundos1 = tempoParaSegundos(hora1);
  const segundos2 = tempoParaSegundos(hora2);
  const diferenca = segundos1 - segundos2;

  return segundosParaTempo(diferenca);
}

function cadastro(){
    const nome = document.getElementById("NomeCadastro").value;
    const password = document.getElementById("passwordCadastro").value;
  
    const dados = {
      password: password
    };
  
    const local = db.ref("funcionarios").child(nome);
  
    local.set(dados) 
}

function cadastroADM(){
  const nome = document.getElementById("NomeCadastro").value;
  const password = document.getElementById("passwordCadastro").value;

  const dados = {
    password: password
  };

  const local = db.ref("ADMS").child(nome);

  local.set(dados) 
}

function surprise(){
  const nome= localStorage.getItem("nome");
  alert(nome) 
}

function consultarTempoFuncionario() {
  const lista = document.getElementById("lista");
  lista.innerHTML = ""; 

  db.ref('funcionarios').once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const a = childSnapshot.key;
      const data = childSnapshot.val();
      const div = document.createElement('div');
      div.className = 'registro';
      div.innerHTML = `<strong>${a}</strong> horário <em>${data.tempo}</em>`;
      lista.appendChild(div);
    });
  });
}

window.onload = consultarTempoFuncionario;