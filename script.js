
function getIdsPropostas() {
    const raw = document.getElementById("idsInput").value;
    return raw
        .split(',')
        .map(id => id.trim())
        .filter(id => id !== '');
}

function abrirPaginasAprovacao() {
    const idsPropostas = getIdsPropostas();
    for (const id of idsPropostas) {
        const url = `https://pdc.3coracoes.com.br/Proposta/EditPropostaAprovacao/${id}`;
        window.open(url, '_blank');
    }
    console.log('Páginas de aprovação abertas.');
}

async function obterExtensao(id) {
    const url = `https://pdc.3coracoes.com.br/proposta/DownloadAcordo?id=${id}`;
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentType = response.headers.get('Content-Type');
        if (contentType.includes('pdf')) return 'pdf';
        if (contentType.includes('jpeg')) return 'jpeg';
        if (contentType.includes('jpg')) return 'jpg';
        if (contentType.includes('png')) return 'png';
        return 'pdf';
    } catch (error) {
        console.error('Erro ao obter a extensão do arquivo:', error);
        return 'pdf';
    }
}

async function baixarPropostas() {
    const idsPropostas = getIdsPropostas();
    for (let id of idsPropostas) {
        const extensao = await obterExtensao(id);
        const url = `https://pdc.3coracoes.com.br/proposta/DownloadAcordo?id=${id}`;
        const link = document.createElement('a');
        link.href = url;
        link.download = `proposta_${id}.${extensao}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    console.log('Download das propostas iniciado.');
}
