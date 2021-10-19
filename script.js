function getNumberText(n) {
  if(n < -999999999.99 || n > 999999999.99) {
    return;
  }

  const mapNumberText = [
    ['', 'cem', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'],
    ['', 'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'],
    ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'],
  ];

  const mapNumberOneBased = {
    'dez e um': 'onze',
    'dez e dois': 'doze',
    'dez e três': 'treze',
    'dez e quatro': 'catorze',
    'dez e cinco': 'quinze',
    'dez e seis': 'dezesseis',
    'dez e sete': 'dezessete',
    'dez e oito': 'dezoito',
    'dez e nove': 'dezenove',
  };

  const number = Math.abs(parseInt(n));
  const numberText = number.toString().padStart(9, '0');
  const rest = parseInt(Math.abs(n * 100 % 100)); // parseInt to fix js weird bug with float number
  let result = (n < 0 ? 'menos ' : '');

  const pieces = [];

  for(let i = 0; i < 9; i += 3) {
    pieces.push(numberText.substr(i, 3));
  }

  pieces.forEach((piece, i) => {
    if(+piece === 0 && i !== 2 || +piece === 0 && i === 2 && result !== '') {
      return;
    }

    result += piece.split('')
      .map((e, i) => mapNumberText[i][e])
      .filter(e => e !== '')
      .join(' e ')
      .replace(' e zero', '')
      .replace('cem e', 'cento e');

    if(i === 0) {
      result += +piece === 1 ? ' milhão ' : ' milhões ';
    } else if(i === 1) {
      result += ' mil ';
    }
  });

  if(rest > 0) {
    if(number > 0) {
      result += number > 1 ? ' inteiros e ' : ' inteiro e ';
    } else {
      result = '';
    }

    if(rest.toString()[1] !== '0') {
      result += rest.toString().split('').map((e, i) => mapNumberText[i + 1][e]).join(' e ') + ' centésimos';
    } else {
      const firstNumber = rest.toString()[0];
      result += mapNumberText[2][firstNumber] + ' décimo' + (firstNumber > 1 ? 's' : '');
    }
  }

  const matchNumberOneBased = result.match(/dez\se\s[a-z|ê]+/gm);

  if(matchNumberOneBased) {
    for(match of matchNumberOneBased) {
      result = result.replace(match, mapNumberOneBased[match]);
    }
  }

  return result.trim();
}

function printNumberName() {
  const outputEl = document.getElementById('output');
  const inputEl = document.querySelector('input[name=number]');
  const text = getNumberText(+inputEl.value);

  if(!text) {
    outputEl.innerText = 'Número não permitido';
  } else {
    outputEl.innerText = text;
  }
}

const button = document.querySelector('button');
button.addEventListener('click', printNumberName);
