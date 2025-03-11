document.addEventListener("DOMContentLoaded", () => {
    let lista = document.getElementById("lista");
    let elementos = [];
    let entrada;
    while (entrada = prompt("Introduce un elemento (deja vacío para finalizar):")) {
        if (!entrada) break;
        elementos.push(entrada);
    }
    
    elementos.forEach(elemento => {
        let li = document.createElement("li");
        li.textContent = elemento;
        lista.appendChild(li);
    });
});
