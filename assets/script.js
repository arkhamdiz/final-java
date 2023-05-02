const form = document.querySelector('form');
const resultadosDiv = document.querySelector('#resultados');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const destino = form.destino.value;
  const fecha = form.fecha.value;
  
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const pasajes = JSON.parse(this.responseText).pasajes;
      const resultados = pasajes.filter((pasaje) => {
        return pasaje.destino === destino && pasaje.fecha === fecha;
      });
      mostrarResultados(resultados);
    }
  };
  xhr.open('GET', 'pasajes.json', true);
  xhr.send();
});

function mostrarResultados(resultados) {
  resultadosDiv.innerHTML = '';
  if (resultados.length === 0) {
    resultadosDiv.innerHTML = '<p>No se encontraron pasajes disponibles.</p>';
  } else {
    const ul = document.createElement('ul');
    resultados.forEach((pasaje) => {
      const li = document.createElement('li');
      li.textContent = `${pasaje.destino} - ${pasaje.fecha} - $${pasaje.precio}`;
      ul.appendChild(li);
    });
    resultadosDiv.appendChild(ul);
  }
}
