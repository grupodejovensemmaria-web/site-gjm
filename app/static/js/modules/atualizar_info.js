document.getElementById('formAtualizaConta').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const data = {
        nome_completo: form.nome_completo.value,
        email: form.email.value,
        telefone: form.telefone.value,
        emergencia: form.emergencia.value,
        instagram: form.instagram.value,
        endereco: form.endereco.value,
        nascimento: form.nascimento.value,
        senha_nova: form.senha_nova.value
    };

    try {
        const response = await fetch(`/membros/att_info/${form.user.value}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Informações atualizadas com sucesso!");
            window.location.reload(); // se quiser recarregar
        } else {
            const erro = await response.text();
            alert("Erro ao atualizar: " + erro);
        }
    } catch (error) {
        alert("Erro ao enviar os dados: " + error.message);
    }
});