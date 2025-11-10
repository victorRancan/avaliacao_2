function surprise(){
  const nome = localStorage.getItem("nome");
  alert(nome);
}

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

function clockin(){
  const agora = new Date();
  const horas = agora.getHours().toString().padStart(2, '0');
  const minutos = agora.getMinutes().toString().padStart(2, '0');
  const segundos = agora.getSeconds().toString().padStart(2, '0');
  localStorage.setItem("inicio", `${horas}:${minutos}:${segundos}`);
}

function clockout(){
  const agora = new Date();
  const horas = agora.getHours().toString().padStart(2, '0');
  const minutos = agora.getMinutes().toString().padStart(2, '0');
  const segundos = agora.getSeconds().toString().padStart(2, '0');
  const a = `${horas}:${minutos}:${segundos}`;
  const b = localStorage.getItem("inicio");
  const tempo = calcularDiferencaDeTempo(a, b);
  const dados = { tempo };
  alert("Registrado "+tempo+" de trabalho")
  changetime(dados);
}

function changetime(dados) {
  const nome = localStorage.getItem("nome");
  const local = db.ref("funcionarios").child(nome);

  db.ref("funcionarios").child(nome).child("tempo").once("value")
    .then(snapshot => {
      let tempoAtual = "00:00:00";
      if (snapshot.exists()) {
        tempoAtual = snapshot.val();
      }
      const tempoSomado = somarTempos(tempoAtual, dados.tempo);
      local.update({ tempo: tempoSomado });
    })
    .catch(error => {
      console.error(error);
    });
}
