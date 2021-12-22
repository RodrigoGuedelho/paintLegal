document.addEventListener('DOMContentLoaded', ()=> {
  const tela = document.querySelector('#telaDesenho');
  const btnBorracha = document.querySelector("#btnBorracha");
  
  const btnColor = document.querySelectorAll(".btn-color");
  const btnVerde = document.querySelector("btnVerde");
  const btnAmarelo = document.querySelector("btnAmarelo");
  const btnVermelho = document.querySelector("btnVermelho");
  const btnRosa = document.querySelector("btnRosa");
  const btnRoxo = document.querySelector("btnRoxo");
  const btnMarrom = document.querySelector("btnMarrom");

  const contexto = tela.getContext('2d');

  tela.width = 700;
  tela.height = 500;

  contexto.lineWidth = 7;
 

  const pincel = {
    ativo: false,
    movendo : false,
    posicao: {x: 0, y: 0},
    posicaoAnterior : null,
    borracha : false,
    cor : "black",
  }

  const desenhaLinha = (linha) => {
    contexto.beginPath();
    contexto.moveTo(linha.posicaoAnterior.x, linha.posicaoAnterior.y);
    contexto.lineTo(linha.posicao.x, linha.posicao.y);
    contexto.stroke();

  }

  const ativarOuDesativarBorracha = () => {
    pincel.borracha = !pincel.borracha;
    if (pincel.borracha) {
      contexto.lineWidth = 15;
      contexto.strokeStyle = "white";
    } else {
      contexto.lineWidth = 7;
      contexto.strokeStyle = pincel.cor;
    }
  }

  const setCorPincel = (cor)=> {
    contexto.strokeStyle = cor;
    pincel.cor = cor;
  }

  tela.onmousedown = (evento) => {
    pincel.ativo = true;
  }

  tela.onmouseup = (evento) => {
    pincel.ativo = false;
  }

  tela.onmousemove = (evento) => {
    pincel.posicao.x = evento.clientX;
    pincel.posicao.y = evento.clientY;
    pincel.movendo = true;
  }

  btnBorracha.onclick = (evento) => {
    ativarOuDesativarBorracha();
  }

  btnColor.forEach(btn => {
    btn.onclick = (evento) => {
      console.log(">>>", btn.id)
      switch (btn.id) {
        case 'btnAzul':
          setCorPincel("blue")
          break;
        case 'btnVerde':
          setCorPincel("green")
          break;
        case 'btnAmarelo':
          setCorPincel("yellow")
          break;
        case 'btnRoxo':
          setCorPincel("purple")
          break;
        case 'btnRosa':
          setCorPincel("pink")
          break;
        case 'btnMarrom':
          setCorPincel("brown")
          break;
        case 'btnPreto':
          setCorPincel("black")
          break;
        case 'btnVermelho':
          setCorPincel("red")
          break;
          
          
        default:
          console.log('cor invalida ' + btn.id);
      }
    }
  });

  const cliclo = () => {
    if (pincel.ativo && pincel.movendo && pincel.posicaoAnterior) {
      desenhaLinha({posicao : pincel.posicao, posicaoAnterior : pincel.posicaoAnterior});
      pincel.movendo = false;
    }

    pincel.posicaoAnterior = {x : pincel.posicao.x, y : pincel.posicao.y};
    setTimeout(cliclo, 10);
  }

  cliclo();
})
