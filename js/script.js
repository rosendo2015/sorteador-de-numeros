const checkbox = document.getElementById('toggleBtn');
const statusBTN = document.getElementById('statusBTN');

    checkbox.addEventListener('change', function () {
      statusBTN.textContent = this.checked ? 'Repetir números' : 'Não repetir números';
      console.log('Checkbox is now: ' + (this.checked ? 'checked' : 'unchecked'));
    });
