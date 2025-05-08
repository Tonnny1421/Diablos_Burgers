export const manejarNotas = (dialogoNota, notaTextarea, btnGuardarNota) => {
    let nota = "";

    document.getElementById("nota-btn").addEventListener("click", () => {
        dialogoNota.showModal();
    });

    btnGuardarNota.addEventListener("click", () => {
        nota = notaTextarea.value;
        dialogoNota.close();
    });
};
