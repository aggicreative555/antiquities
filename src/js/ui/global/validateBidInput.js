export function validateBidInput(event) {
  const bidInput = event.target;
  const errorMessage = document.getElementById('errorMessage');

  let bidValue = bidInput.value.replace(/[^0-9]/g, '');
  bidValue = bidValue ? parseInt(bidValue, 10) : '';

  if (isNaN(bidValue)) {
    errorMessage.textContent = 'Please enter a valid number';
    bidInput.classList.add('incorrect');
    return;
  }

  if (bidValue < 250 || bidValue > 100000) {
    errorMessage.textContent =
      'Please enter a bid amount between NOK 250 - NOK 100 000';

    bidInput.classList.add('incorrect');
  } else {
    errorMessage.textContent = '';
    bidInput.classList.remove('incorrect');
  }

  bidInput.value = `NOK ${bidValue}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const bidInput = document.getElementById('bidInput');

  console.log('NOK');

  if (bidInput) {
    if (!bidInput.value.includes('NOK')) {
      bidInput.value = 'NOK';
    }

    bidInput.addEventListener('focus', () => {
      if (!bidInput.value.includes('NOK')) {
        bidInput.value = 'NOK';
      }
    });

    bidInput.addEventListener('click', () => {
      if (bidInput.selectionStart < 4) {
        bidInput.setSelectionRange(4, 4);
      }
    });

    bidInput.addEventListener('keydown', (event) => {
      if (bidInput.selectionStart < 4 && event.key !== 'Backspace') {
        event.preventDefault();
        bidInput.setSelectionRange(4, 4);
      }
    });

    bidInput.addEventListener('input', (event) => {
      validateBidInput(event);
    });
  }
});
