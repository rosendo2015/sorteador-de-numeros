const checkbox = document.getElementById('toggleBtn')
const statusBTN = document.getElementById('statusBTN')
const subtitle = document.getElementsByClassName('subtitle')
const form = document.querySelector('form')
const btnSortearNovamente = document.getElementById('btnSortearNovamente')
const qtdNum = parseInt(document.getElementById('qtdNum').value)
const numStart = parseInt(document.getElementById('numStart').value)
const numEnd = parseInt(document.getElementById('numEnd').value)
const permitirRepeticao = !document.getElementById('toggleBtn').checked
const resultadoDiv = document.getElementById('resultado')
const resultContainer = document.querySelector('.result')
let contadorSorteios = 0;


form.addEventListener('submit', function (event) {
  event.preventDefault()
})

qtdNum.oninput = () => {
  let valueQtdNum = qtdNum.value.replace(/\D/g, '')
  qtdNum.value = valueQtdNum
}
numStart.oninput = () => {
  let valueNUmStart = numStart.value.replace(/\D/g, '')
  numStart.value = valueNUmStart
}
numEnd.oninput = () => {
  let valueNumEnd = numEnd.value.replace(/\D/g, '')
  numEnd.value = valueNumEnd
}

checkbox.addEventListener('change', function () {
  statusBTN.textContent = this.checked
    ? 'Não repetir números'
    : 'repetir números'
  console.log('Checkbox is now: ' + (this.checked ? 'checked' : 'unchecked'))
})

function sortear () {
  const form = document.querySelector('.form-draw')
  const btnSortearNovamente = document.getElementById('btnSortearNovamente')
  const qtdNum = parseInt(document.getElementById('qtdNum').value)
  const numStart = parseInt(document.getElementById('numStart').value)
  const numEnd = parseInt(document.getElementById('numEnd').value)
  const permitirRepeticao = !document.getElementById('toggleBtn').checked
  const resultadoDiv = document.getElementById('resultado')
  const resultContainer = document.querySelector('.result')

  if (isNaN(qtdNum) || isNaN(numStart) || isNaN(numEnd)) {
    resultadoDiv.innerHTML = '<p>Preencha todos os campos corretamente.</p>'
    resultContainer.classList.remove('hide')
    btnSortearNovamente.classList.remove('hide')
    return
  }

  if (numStart > numEnd) {
    resultadoDiv.innerHTML =
      '<p>O valor inicial deve ser menor ou igual ao final.</p>'
    resultContainer.classList.remove('hide')
    btnSortearNovamente.classList.remove('hide')
    return
  }

  const intervalo = numEnd - numStart + 1
  if (!permitirRepeticao && qtdNum > intervalo) {
    resultadoDiv.innerHTML =
      '<p>Quantidade maior que o intervalo disponível sem repetições.</p>'
    resultContainer.classList.remove('hide')
    btnSortearNovamente.classList.remove('hide')
    return
  }

  const numerosSorteados = []
  const usados = new Set()

  while (numerosSorteados.length < qtdNum) {
    const numero = Math.floor(Math.random() * intervalo) + numStart

    if (permitirRepeticao || !usados.has(numero)) {
      numerosSorteados.push(numero)
      usados.add(numero)
    }
  }

  resultadoDiv.innerHTML = numerosSorteados
    .map(num => `<span class="number">${num}</span>`)
    .join('')
  resultContainer.classList.remove('hide')
  btnSortearNovamente.classList.remove('hide')
  form.classList.add('hide')
  subtitle[0].classList.add('hide')

  contadorSorteios++;
document.getElementById('contadorSorteios').textContent = `${contadorSorteios}º RESULTADO`;
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  sortear()
})

btnSortearNovamente.addEventListener('click', function () {
  sortear()
})
