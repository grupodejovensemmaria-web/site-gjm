document.addEventListener('DOMContentLoaded', function() {
  // Configuração dos atos com seus respectivos recursos
    const atosConfig = {
    1: {
        title: "Criação",
        quote: "“No princípio, Deus criou o céu e a terra.” (Gn 1,1)",
        text: "No princípio, Deus, que é amor infinito, criou o universo para manifestar Seu amor eterno pela humanidade. Esse amor é ação criadora, capaz de transformar o nada em plenitude. Em Sua bondade, Deus fez do mundo um espaço de comunhão. O Jardim do Éden foi o maior símbolo disso: um fruto imenso do amor divino, plantado para abrigar o ser humano em harmonia. Lá, homem e mulher foram criados à imagem de Deus, chamados a viver em união com Ele e entre si. O Éden é mais que lugar físico: é sinal do Reino de Deus, onde o amor gera vida, sustenta a paz e convida à liberdade. Pela criação, vemos que o amor de Deus é fiel, misericordioso e redentor. Ele nos chama à fraternidade e à construção de um mundo novo, onde o mesmo amor que originou o Éden continue nos transformando.",
        bgImage: "static/images/landing_page/ato-1/images/criacao1.jpg",
        media: {
        type: "video",
        src: "static/images/landing_page/ato-1/videos/criacao_loop.mp4"
        },
        audio: "static/images/landing_page/ato-1/audios/som_natureza.mp3"
    },
    2: {
        title: "Humanidade caída",
        text: "Na raiz da queda da humanidade está o orgulho: Adão e Eva não pecaram apenas por comer o fruto proibido, mas por desejarem ser como Deus, rejeitando a dependência amorosa de Seu Criador. Seduzidos pela promessa de autonomia, quiseram ser senhores do bem e do mal, rompendo a confiança com Aquele que os formou por amor. A desobediência não foi mero erro, mas um ato de rebelião interior: a ilusão de autossuficiência, de serem 'grandes demais' para obedecer. O homem quis 'ser como Deus', mas sem Deus, antes de Deus e não segundo Deus. Ao escolherem esse caminho, Adão e Eva não só feriram a comunhão com o Senhor, mas também inauguraram no coração humano a falsa glória de ser o melhor por conta própria. A queda é, portanto, o grito orgulhoso de quem quer poder, mas colhe vazio. Um paraíso trocado por poeira.",
        quote: "“Comerás do suor do teu rosto, até que tornes à terra.” (Gn 3,19)",
        bgImage: "static/images/landing_page/ato-2/images/queda1.jpg",
        media: {
        type: "video",
        src: "static/images/landing_page/ato-2/videos/caos_loop.mp4"
        },
        audio: "static/images/landing_page/ato-2/audios/som_caos.mp3"
    },
    3: {
        title: "Reconciliações",
        quote: "“O Senhor, teu Deus, é misericordioso: não te abandonará.” (Dt 4,31)",
        text: "Mesmo após a queda, Deus não abandonou Sua criação. O infiel foi o homem, e não o Criador. Ao longo da história, Deus buscou a reconciliação: fez alianças com Noé, Abraão, Moisés e Davi; chamou profetas para lembrar o povo de Sua promessa. Cada gesto de Deus é misericórdia em ação. Enquanto a humanidade se afastava, Deus se aproximava. A Escritura revela um caminho de salvação onde muitas vezes e de muitos modos, Deus falou aos nossos pais… agora nos falou por meio do Filho. Jesus é a plenitude da reconciliação. Nele, o céu se curva à terra, o amor se entrega até a cruz, e a vida vence a morte. A cruz não é castigo, mas ponte: Deus assume a nossa dor para curá-la. O hipócrita é o homem que se afasta e culpa Deus. Mas o Senhor, como bom pastor, percorre o deserto da história para resgatar o rebanho. A reconciliação é dom, não mérito. É o coração de Deus que insiste em amar, até que tudo seja salvo por Cristo.",
        bgImage: "static/images/landing_page/ato-3/images/jesus_cristo.jpg",
        media: {
        type: "video",
        src: "static/images/landing_page/ato-3/videos/timeline_animada.mp4"
        },
        audio: "static/images/landing_page/ato-3/audios/voz_off_reconciliacao.mp3"
    },
    4: {
        title: "Maria",
        quote: "“Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra.” (Lc 1,38)",
        text: "Maria é a nova Arca da Aliança, não feita de ouro, mas de carne pura e fiel. Assim como a antiga arca guardava as tábuas da Lei, Maria trouxe em seu ventre o próprio Verbo de Deus, Jesus Cristo, a Palavra viva. Ela é a mulher plenamente aberta à vontade divina, aquela que primeiro acreditou, primeiro foi amada e, por isso, também foi a primeira a amar. Em seu “sim”, todo o céu se inclinou sobre a terra. Onde está a Mãe, ali também está o Filho, pois Maria nunca aponta para si, mas para Cristo. A tradição da Igreja a reconhece como Mãe de Deus (Theotokos) e Mãe da Igreja, pois no Calvário, aos pés da cruz, ela acolheu todos como filhos. Maria é dom do Pai, exemplo de fé e silêncio, de força e ternura. Nela, Deus selou Sua nova aliança com a humanidade, uma aliança de amor eterno. Olhar para Maria é recordar que Deus caminha conosco, por meio dela, que é ponte segura para Cristo.",
        bgImage: "static/images/landing_page/ato-4/images/guadalupe_mexico.jpg",
        media: {
        type: "video",
        src: "static/images/landing_page/ato-4/videos/fundo_sonoro_suave.mp4"
        },
        audio: "static/images/landing_page/ato-4/audios/musica_suave.mp3"
    },
    5: {
        title: "Pentecostes",
        quote: "“Recebereis a força do Espírito Santo e sereis minhas testemunhas.” (At 1,8)",
        text: "Em Pentecostes, Deus inaugura um novo tempo: o tempo do Espírito Santo. Após a ascensão, Jesus não nos deixou órfãos; prometeu o Paráclito, e cumpriu. No cenáculo, em meio ao medo, veio o Espírito como vento impetuoso e línguas de fogo, enchendo os corações dos discípulos. Ali, a Igreja nasce, viva e ousada, enviada ao mundo. O Espírito não é memória morta, mas presença ativa: Ele guia, consola, corrige, impulsiona. É por Ele que reconhecemos Jesus como Senhor, que nos unimos em fraternidade e missão. Cada sacramento, cada gesto de amor e fé, tem o sopro do Espírito. Pentecostes não ficou no passado: é hoje, agora, em cada comunidade aberta à graça. O Paráclito nos atualiza, transforma e envia. Somos povo do Espírito, chamados a incendiar o mundo com o amor de Deus.",
        bgImage: "static/images/landing_page/ato-5/images/atos_apostolos.jpg",
        media: {
        type: "video",
        src: "static/images/landing_page/ato-5/videos/institucional_jovens.mp4"
        },
        audio: "static/images/landing_page/ato-5/audios/musica_espiritual.mp3"
    },
    6: {
        title: "Nossa Senhora de Guadalupe",
        quote: "“Não estou eu aqui, que sou tua Mãe?” (Nossa Senhora a Juan Diego)",
        text: "Em 1531, no México, a Virgem Maria apareceu a Juan Diego no monte Tepeyac, deixando impressa sua imagem milagrosa em seu manto. Era Nossa Senhora de Guadalupe, de rosto indígena, coração materno e palavras de ternura. Seu sinal converteu milhares, uniu povos e curou feridas de uma terra marcada por sofrimento e conquista. Por isso, tornou-se padroeira da América Latina: porque fala ao coração dos pobres, dos simples, dos que têm fé. Em sua voz, há consolo; em seu olhar, há missão. Aqui em Vila Velha, a Paróquia Nossa Senhora de Guadalupe é um templo em construção e um convite vivo a confiar, a caminhar com esperança e a ser instrumento de paz. Como Guadalupe, somos chamados a ouvir, servir e anunciar que Deus está conosco. Onde está a Mãe, está o Filho; e onde estão ambos, há caminho, verdade e vida.",
        bgImage: "static/images/landing_page/ato-6/images/aparicao_guadalupe.jpg",
        media: {
        type: "video",
        src: "static/images/landing_page/ato-6/videos/video_comunidade.mp4"
        },
        audio: "static/images/landing_page/ato-6/audios/som_ambiente_igreja.mp3"
    },
    7: {
        title: "GJM Guadalupe",
        quote: "“Jovens, não tenham medo! Aceitem o convite da Igreja e de Cristo Senhor!” (Papa Leão XIV)",
        text: "A Juventude Guadalupana é uma família de jovens e tios que se reúnem para viver a fé, celebrar a vida e servir ao próximo. Inspirados por Jesus e Nossa Senhora de Guadalupe, buscamos ser luz no mundo, testemunhas do amor de Cristo. GJM é um espaço de acolhida, onde cada jovem é valorizado, ouvido e incentivado a crescer na fé. A espiritualidade se une à alegria da juventude: nossas ações são oportunidades de vivenciar o amor de Deus em comunidade. Somos chamados a ser missionários da esperança, a levar o nome de Jesus por onde passarmos. A família GJ é um convite à aventura da fé: venha fazer parte dessa história! Juntos, até o céu.",
        bgImage: "static/images/landing_page/ato-7/images/logo_gj_guadalupe.png",
        media: {
        type: "video",
        src: "static/images/landing_page/ato-7/videos/videos_rapidos.mp4"
        },
        audio: "static/images/landing_page/ato-7/audios/musica_ambiente.mp3"
    },
    8: {
        title: "Venha ser de Deus",
        quote: "“Vinde a mim todos vós que estais cansados e sobrecarregados.” (Mt 11,28)",
        text: "A vida é um convite constante a ser de Deus. Em meio às distrações e desafios, Jesus nos chama a voltar o olhar para Ele, a encontrar descanso em Sua presença. Somos convidados para a acolhida, a experimentar o amor transformador de Cristo. Na Igreja, não há julgamento, mas compaixão; não há exclusão, mas inclusão. É um espaço para renovar a fé, fortalecer os laços comunitários e descobrir o propósito maior que Deus tem para cada um. Venha ser parte dessa jornada de fé! Juntos, queremos construir um mundo onde o amor de Deus seja visível em cada ação.",
        bgImage: "static/images/landing_page/ato-8/images/convite1.jpg",
        media: {
        type: "video",
        src: "static/images/landing_page/ato-8/videos/botoes_animados.mp4"
        },
        audio: "static/images/landing_page/ato-8/audios/som_ambiente_igreja.mp3"
    },
    9: {
        title: "Tua graça me basta",
        quote: "“Basta-te a minha graça, pois é na fraqueza que se revela a minha força.” (2Cor 12,9)",
        text: "A graça de Deus é o sustento em nossas fraquezas. Em meio às lutas e desafios, Ele nos oferece força e consolo. A vida cristã não é ausência de dificuldades, mas a certeza de que Deus caminha conosco. A oração, os sacramentos e a comunidade são fontes de graça que nos renovam. Somos chamados a confiar na providência divina, a entregar nossas preocupações e a viver com esperança. A família GJ lhe convida para essa jornada da fé e um caminho de entrega, onde aprendemos que a verdadeira força vem do amor de Deus que nos sustenta. Venha experimentar essa graça que transforma vidas!",
        bgImage: "static/images/landing_page/ato-9/images/versiculo.jpg",
        media: {
        type: "video",
        src: "static/images/landing_page/ato-9/videos/fundo_devocional.mp4"
        },
        audio: "static/images/landing_page/ato-9/audios/musica_devocional.mp3"
    },
    10: {
        title: "Sou estrangeiro aqui, o céu é meu lar",
        quote: "“Lutai para entrar pela porta estreita...” (Lc 13,24)",
        text: "A vida cristã é uma jornada rumo ao céu, nossa verdadeira pátria. Aqui somos peregrinos, chamados a viver com esperança e fé. A porta estreita é o convite a seguir Jesus, a abraçar a cruz e a viver em comunhão com Deus e com os irmãos. Não somos deste mundo, mas estamos nele para testemunhar o amor de Cristo. Cada ato de bondade, cada gesto de solidariedade, nos aproxima do Reino dos Céus. Somos chamados a ser luz no mundo e sal na Terra, a refletir a glória de Deus em nossas vidas. A família GJ lhe convida a caminhar conosco nessa jornada de fé, rumo à eternidade!",
        bgImage: "static/images/landing_page/ato-10/images/ceu_aberto.jpg",
        media: {
        type: "video",
        src: "static/images/landing_page/ato-10/videos/ascensao.mp4"
        },
        audio: "static/images/landing_page/ato-10/audios/musica_esperanca.mp3"
    }
    };
  // Elementos DOM
  const atoSections = document.querySelectorAll('.ato-section');
  const audioElements = {};
  let currentAudio = null;
  let jornadaIniciada = false;
  const startJourneyBtn = document.querySelector('.start-journey');

  // Inicializar cada seção de ato com estrutura básica
  atoSections.forEach(section => {
    const atoNumber = parseInt(section.dataset.ato);
    const config = atosConfig[atoNumber];
    
    if (config) {
      section.innerHTML = `
        <div class="ato-container" data-ato="${atoNumber}" 
             style="background-image: url('${config.bgImage}')">
          <div class="ato-content"></div>
        </div>
      `;
      
      // Inicializar áudio
      if (config.audio) {
        audioElements[atoNumber] = new Audio(config.audio);
        audioElements[atoNumber].loop = true;
      }
    }
  });

  // Botão "Iniciar Jornada"
  startJourneyBtn?.addEventListener('click', function(e) {
    e.preventDefault();
    jornadaIniciada = true;
    alert("Jornada iniciada! Você pode navegar pelos atos usando as setas do teclado ou clicando nos botões de navegação.");
    document.querySelector('#ato-1').scrollIntoView({ behavior: 'smooth' });
  });

  // Observador para atos
  const atoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const atoNumber = parseInt(entry.target.dataset.ato);
        handleAtoChange(atoNumber);
      }
    });
  }, { threshold: 0.6 });

  // Observar todas as seções de ato
  atoSections.forEach(section => {
    atoObserver.observe(section);
  });

  // Funções auxiliares
  function handleAtoChange(atoNumber) {
    if (atoNumber === 1 && !jornadaIniciada) {
      alert("Clique em 'CONHECER DEUS' para iniciar sua jornada!");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    manageAudio(atoNumber);
    history.replaceState(null, null, `#ato-${atoNumber}`);
    dispatchAtoChangeEvent(atoNumber);
  }

  function dispatchAtoChangeEvent(atoNumber) {
    document.dispatchEvent(new CustomEvent('atoChanged', {
      detail: { atoNumber, config: atosConfig[atoNumber] }
    }));
  }

  function manageAudio(atoNumber) {
    if (currentAudio && currentAudio !== atoNumber) {
      audioElements[currentAudio]?.pause();
    }
    if (audioElements[atoNumber]) {
      audioElements[atoNumber].currentTime = 0;
      audioElements[atoNumber].play().catch(e => console.log("Autoplay bloqueado:", e));
    }
    currentAudio = atoNumber;
  }

  // Navegação por teclado (global)
  document.addEventListener('keydown', (e) => {
    const currentAto = getCurrentAto();
    
    if (e.key === 'ArrowDown' && currentAto < 10) {
      e.preventDefault();
      document.querySelector(`#ato-${currentAto + 1}`).scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' && currentAto > 1) {
      e.preventDefault();
      document.querySelector(`#ato-${currentAto - 1}`).scrollIntoView({ behavior: 'smooth' });
    }
    // As setas esquerda/direita são tratadas pelo nav_atos.js
  });

  function getCurrentAto() {
    for (let i = 1; i <= 10; i++) {
      const section = document.querySelector(`#ato-${i}`);
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
        return i;
      }
    }
    return 1;
  }
});


