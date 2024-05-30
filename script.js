document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let feedbackData = {
        insights: document.getElementById('insights').value,
        improvements: document.getElementById('improvements').value,
        likes: document.getElementById('likes').value,
        relevance: document.getElementById('relevance').value,
        suggestions: document.getElementById('suggestions').value
    };

    // Pega o Feedback existente no localStorage ou inicializa um array vazio
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    
    // Adciona o novo feedback ao array
    feedbacks.push(feedbackData);

    // Seta os arrays de feedback de volta no localStorage
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    // Reseta o form
    document.getElementById('feedbackForm').reset();

    // Mosta msg de sucesso
    displaySuccessMessage("Seu feedback foi enviado com sucesso!");
});

function displaySuccessMessage(message) {
    let successMessage = document.createElement('div');
    successMessage.textContent = message;
    successMessage.classList.add('success-message');
    document.body.appendChild(successMessage);

    setTimeout(function() {
        document.body.removeChild(successMessage);
    }, 3000);
}

document.getElementById('loginButton').addEventListener('click', function() {
    document.getElementById('loginModal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('loginModal').style.display = 'none';
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let login = document.getElementById('adminLogin').value;
    let password = document.getElementById('adminPassword').value;
    
    if (login === '1234' && password === '1234') {
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('downloadButton').style.display = 'block';
        
        document.getElementById('downloadButton').addEventListener('click', downloadFeedbacks);
    } else {
        alert('Login ou senha incorretos.');
    }
});

function downloadFeedbacks() {
    try {
        // Pega os feedbacks do localStorage
        let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        
        // Prepara o dado pro Excel
        let data = [
            ["Quais insights você teve hoje?", "No que, de forma geral, podemos trabalhar para melhorar em nossa empresa?", "Do que você mais gostou em nosso evento?", "O treinamento foi útil e relevante para o seu trabalho?", "O que você sugere que façamos de forma diferente da próxima vez?"],
            ...feedbacks.map(fb => [fb.insights, fb.improvements, fb.likes, fb.relevance, fb.suggestions])
        ];

        // Cria um novo workbook e um worksheet
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Feedbacks");

        // Escreve o novo workbook com o arquivo
        XLSX.writeFile(wb, "feedbacks.xlsx");
    } catch (error) {
        console.error('Erro ao baixar os feedbacks:', error);
        alert('Ocorreu um erro ao baixar os feedbacks. Por favor, tente novamente mais tarde.');
    }
}