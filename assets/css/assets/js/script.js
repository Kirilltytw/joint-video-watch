// Инициализация P2P-соединения
const peer = new Peer();
let conn = null;
const roomId = window.location.hash.substring(1) || generateRoomId();

// Элементы страницы
const videoFrame = document.getElementById('video-frame');
const videoUrlInput = document.getElementById('video-url');
const chatEl = document.getElementById('chat');

// Генерация ID комнаты
function generateRoomId() {
    return Math.random().toString(36).substring(2, 8);
}

// Подключение к комнате
peer.on('open', (id) => {
    if (!window.location.hash) {
        window.location.hash = id; // Создаем новую комнату
    } else {
        connectToPeer(roomId); // Подключаемся к существующей
    }
});

// Обработка входящих сообщений
function handleMessage(data) {
    switch(data.type) {
        case 'play':
            // Воспроизведение видео
            break;
        case 'pause':
            // Пауза
            break;
        case 'chat':
            addMessage(data.sender, data.text);
            break;
        case 'video':
            loadVideo(data.url);
            break;
    }
}

// Загрузка видео
function loadVideo(url) {
    if (url.includes('vk.com')) {
        videoFrame.src = `https://vk.com/video_ext.php?url=${encodeURIComponent(url)}`;
    } else if (url.includes('rutube.ru')) {
        videoFrame.src = `https://rutube.ru/embed/${url.split('/').pop()}`;
    }
}

// Отправка сообщений
document.getElementById('send-btn').addEventListener('click', () => {
    const text = document.getElementById('chat-input').value;
    if (text && conn) {
        conn.send({ type: 'chat', text });
        addMessage('Вы', text);
        document.getElementById('chat-input').value = '';
    }
});

// Остальной код управления видео...
