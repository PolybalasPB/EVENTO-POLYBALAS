document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    let feedbackData = {
        insights: document.getElementById('insights').value,
        improvements: document.getElementById('improvements').value,
        likes: document.getElementById('likes').value,
        relevance: document.getElementById('relevance').value,
        suggestions: document.getElementById('suggestions').value
    };

    try {
        await fetch('/submit-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackData)
        });

        document.getElementById('feedbackForm').reset();
        displaySuccessMessage("Seu feedback foi enviado com sucesso!");
    } catch (error) {
        console.error('Erro ao enviar feedback:', error);
        alert('Ocorreu um erro ao enviar o feedback. Por favor, tente novamente mais tarde.');
    }
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

async function downloadFeedbacks() {
    try {
        let response = await fetch('/get-feedbacks');
        
        if (!response.ok) {
            throw new Error('Erro ao buscar feedbacks: ' + response.status);
        }

        let contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Tipo de conteúdo inesperado: ' + contentType);
        }

        let feedbacks = await response.json();
        
        let data = [
            ["Quais insights você teve hoje?", "No que, de forma geral, podemos trabalhar para melhorar em nossa empresa?", "Do que você mais gostou em nosso evento?", "O treinamento foi útil e relevante para o seu trabalho?", "O que você sugere que façamos de forma diferente da próxima vez?"],
            ...feedbacks.map(fb => [fb.insights, fb.improvements, fb.likes, fb.relevance, fb.suggestions])
        ];

        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Feedbacks");

        XLSX.writeFile(wb, "feedbacks.xlsx");
    } catch (error) {
        console.error('Erro ao baixar os feedbacks:', error);
        alert('Ocorreu um erro ao baixar os feedbacks. Por favor, tente novamente mais tarde.');
    }
}
