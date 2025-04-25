// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Simulate typing and response
const typingIndicator = document.getElementById('typing-indicator');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const chatContainer = document.querySelector('.chat-container');
const skeletonLoader = document.getElementById('skeleton-loader');

// Show typing indicator for 2 seconds, then show response
setTimeout(() => {
    typingIndicator.classList.add('hidden');
    
    // Show skeleton loader
    const loaderClone = skeletonLoader.cloneNode(true);
    loaderClone.classList.remove('hidden');
    chatContainer.appendChild(loaderClone);
    
    // After 1.5 seconds, replace with actual message
    setTimeout(() => {
        loaderClone.remove();
        
        const responseDiv = document.createElement('div');
        responseDiv.className = 'message-ai flex space-x-3 message-animation';
        responseDiv.innerHTML = `
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#1E90FF] flex items-center justify-center">
                <i class="fas fa-robot text-white"></i>
            </div>
            <div class="bg-[#1E90FF] text-white rounded-2xl p-4 max-w-[85%]">
                <p>Analisando jurisprudência recente do TJSP e TJRJ (2022-2023), o valor médio para vazamento de dados varia entre R$ 5.000 e R$ 15.000 por vítima.</p>
                <p class="mt-2">Casos com agravantes (dados sensíveis, múltiplas violações) podem chegar a R$ 30.000. Veja <a href="#" class="legal-link">Processo 0000000-00.2022.8.26.0000</a> como referência.</p>
            </div>
        `;
        
        chatContainer.appendChild(responseDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1500);
}, 2000);

// Send message functionality
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return;
    
    // Create user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message-user flex justify-end space-x-3 message-animation';
    userMessageDiv.innerHTML = `
        <div class="bg-[#ECEFF1] text-[#2E2E2E] rounded-2xl p-4 max-w-[85%]">
            <p>${messageText}</p>
        </div>
        <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <i class="fas fa-user text-gray-600"></i>
        </div>
    `;
    
    chatContainer.appendChild(userMessageDiv);
    messageInput.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Show typing indicator
    setTimeout(() => {
        const typingClone = typingIndicator.cloneNode(true);
        typingClone.classList.remove('hidden');
        chatContainer.appendChild(typingClone);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Simulate AI response after delay
        setTimeout(() => {
            typingClone.remove();
            
            // Show skeleton loader
            const loaderClone = skeletonLoader.cloneNode(true);
            loaderClone.classList.remove('hidden');
            chatContainer.appendChild(loaderClone);
            chatContainer.scrollTop = chatContainer.scrollHeight;
            
            // After delay, show actual response
            setTimeout(() => {
                loaderClone.remove();
                
                const responseDiv = document.createElement('div');
                responseDiv.className = 'message-ai flex space-x-3 message-animation';
                responseDiv.innerHTML = `
                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#1E90FF] flex items-center justify-center">
                        <i class="fas fa-robot text-white"></i>
                    </div>
                    <div class="bg-[#1E90FF] text-white rounded-2xl p-4 max-w-[85%]">
                        <p>Estou analisando sua consulta e pesquisando na base de dados jurídicos. Um momento por favor...</p>
                        <p class="mt-2">Enquanto isso, você pode consultar nossa <a href="#" class="legal-link">base de jurisprudência</a> ou <a href="#" class="legal-link">modelos de petição</a> relacionados.</p>
                    </div>
                `;
                
                chatContainer.appendChild(responseDiv);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 1500);
        }, 1500);
    }, 800);
}

// New chat button
document.getElementById('new-chat-btn').addEventListener('click', () => {
    if (confirm('Deseja iniciar uma nova consulta? O histórico atual será limpo.')) {
        const messages = document.querySelectorAll('.message-user, .message-ai');
        messages.forEach(msg => {
            if (!msg.classList.contains('message-animation')) {
                msg.remove();
            }
        });
        
        // Show welcome message again
        const welcomeMsg = document.querySelector('.message-ai');
        welcomeMsg.classList.add('message-animation');
    }
});
