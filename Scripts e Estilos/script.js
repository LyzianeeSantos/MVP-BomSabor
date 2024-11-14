function openAccount() {
    updateAccountInfo(); // Atualiza as informações antes de abrir o modal
    document.getElementById("account-modal").style.display = "flex"; // Abre o modal
}

function closeAccount() {
    document.getElementById("account-modal").style.display = "none"; // Fecha o modal
}
