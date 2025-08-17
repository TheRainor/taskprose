// SearchBar
const input    = document.getElementById('search-input');
const clearBtn = document.getElementById('icon-clear');

// 1) Input’a değer girildiğinde clear butonunu göster/gizle
input.addEventListener('input', () => {
clearBtn.classList.toggle('hidden', input.value === '');
});

// 2) Clear butonuna tıklandığında input’u temizle ve butonu gizle
clearBtn.addEventListener('click', () => {
input.value = '';
clearBtn.classList.add('hidden');
input.focus();
});



