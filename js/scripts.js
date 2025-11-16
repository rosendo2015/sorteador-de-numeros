const checkbox = document.getElementById('toggleBtn')
        const statusBTN = document.getElementById('statusBTN')
        const subtitle = document.getElementsByClassName('subtitle')
        const form = document.querySelector('.form-draw')
        const btnSortearNovamente = document.getElementById('btnSortearNovamente')
        const resultadoDiv = document.getElementById('resultado')
        const resultContainer = document.querySelector('.result')

        let contadorSorteios = 0;

        form.addEventListener('submit', function (event) {
            event.preventDefault()
            sortear()
        })

        checkbox.addEventListener('change', function () {
            statusBTN.textContent = this.checked
                ? 'Não repetir números'
                : 'Repetir números';
        })

        function sortear() {
            // 🔹 Lê os valores dos inputs no momento do sorteio
            const qtdNum = parseInt(document.getElementById('qtdNum').value)
            const numStart = parseInt(document.getElementById('numStart').value)
            const numEnd = parseInt(document.getElementById('numEnd').value)
            const permitirRepeticao = !document.getElementById('toggleBtn').checked

            if (isNaN(qtdNum) || isNaN(numStart) || isNaN(numEnd)) {
                resultadoDiv.innerHTML = '<p>Preencha todos os campos corretamente.</p>'
                resultContainer.classList.remove('hide')
                btnSortearNovamente.classList.add('hide')
                return
            }

            if (numStart > numEnd) {
                resultadoDiv.innerHTML = '<p>O valor inicial deve ser menor ou igual ao final.</p>'
                resultContainer.classList.remove('hide')
                btnSortearNovamente.classList.add('hide')
                return
            }

            const intervalo = numEnd - numStart + 1
            if (!permitirRepeticao && qtdNum > intervalo) {
                resultadoDiv.innerHTML = '<p>Quantidade maior que o intervalo disponível sem repetições.</p>'
                resultContainer.classList.remove('hide')
                btnSortearNovamente.classList.add('hide')
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

            // 🔹 Limpa antes de mostrar os novos números
            resultadoDiv.innerHTML = ""

            // 🔹 Mostra cada número com delay e animação
            numerosSorteados.forEach((num, i) => {
                setTimeout(() => {
                    const span = document.createElement("span")
                    span.classList.add("number")
                    span.textContent = num
                    resultadoDiv.appendChild(span)

                    // efeito fade-in
                    span.style.opacity = 0
                    span.style.transition = "opacity 0.5s, transform 0.5s"
                    span.style.transform = "scale(0.5)"
                    requestAnimationFrame(() => {
                        span.style.opacity = 1
                        span.style.transform = "scale(1)"
                    })
                }, i * 1000) // aparece a cada 1 segundo
            })

            resultContainer.classList.remove('hide')
            btnSortearNovamente.classList.remove('hide')
            form.classList.add('hide')
            subtitle[0].classList.add('hide')

            contadorSorteios++
            document.getElementById('contadorSorteios').textContent = `${contadorSorteios}º RESULTADO`
        }

        btnSortearNovamente.addEventListener('click', function () {
            sortear()
        })