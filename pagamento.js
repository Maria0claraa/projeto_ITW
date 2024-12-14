document.addEventListener('DOMContentLoaded', function () {
    const paymentRadios = document.querySelectorAll('input[name="paymentType"]');
    const confirmPaymentButton = document.getElementById('confirmPayment');

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            // Fechar qualquer modal aberto
            const modals = ['cardModal', 'mbwayModal', 'bankTransferModal'];
            modals.forEach(modalId => {
                const modalElement = document.getElementById(modalId);
                if (modalElement) {
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    if (modalInstance) {
                        modalInstance.hide();
                    }
                }
            });

            // Exibir o modal específico
            const modalToShow = this.id === 'paymentCard' ? 'cardModal' :
                this.id === 'paymentMbway' ? 'mbwayModal' :
                    this.id === 'paymentBankTransfer' ? 'bankTransferModal' : null;

            if (modalToShow) {
                const modalElement = document.getElementById(modalToShow);
                if (modalElement) {
                    const modalInstance = new bootstrap.Modal(modalElement);
                    modalInstance.show();
                }
            }
        });
    });

    // Função para validar todos os campos do formulário
    function validateForm() {
        let isValid = true;

        // Validação de cada campo
        const fields = [
            { id: 'firstName', regex: /.+/, errorMessage: "Por favor, insira o seu primeiro nome." },
            { id: 'lastName', regex: /.+/, errorMessage: "Por favor, insira o seu apelido." },
            { id: 'email', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorMessage: "Por favor, insira um email válido." },
            { id: 'phone', regex: /^9\d{8}$/, errorMessage: "Número de telemóvel inválido. Deve começar com 9 e ter 9 dígitos." },
            { id: 'address', regex: /.+/, errorMessage: "Por favor, insira a sua morada." },
            { id: 'city', regex: /.+/, errorMessage: "Por favor, insira a sua cidade." },
            { id: 'postalCode', regex: /.+/, errorMessage: "Por favor, insira o seu código postal." }
        ];

        fields.forEach(field => {
            const element = document.getElementById(field.id);
            const errorMessageContainer = document.getElementById(`${field.id}Error`);
            if (!field.regex.test(element.value.trim())) {
                element.classList.add('is-invalid');
                if (errorMessageContainer) {
                    errorMessageContainer.textContent = field.errorMessage;
                }
                isValid = false;
            } else {
                element.classList.remove('is-invalid');
                if (errorMessageContainer) {
                    errorMessageContainer.textContent = '';
                }
            }
        });

        return isValid;
    }

    // Lidar com o clique em "Confirmar" no modal de Cartão
    document.getElementById('cardForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;

        const cardNumberPattern = /^\d{16}$/;
        const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const cvvPattern = /^\d{3}$/;

        if (!cardNumber.match(cardNumberPattern) || !expiryDate.match(expiryDatePattern) || !cvv.match(cvvPattern)) {
            alert("Por favor, verifique os dados do cartão.");
            return;
        }

        // Preencher campos no formulário principal
        alert("Dados do cartão confirmados!");
        const modalInstance = bootstrap.Modal.getInstance(document.getElementById('cardModal'));
        if (modalInstance) modalInstance.hide();
    });

    // Lidar com o clique em "Confirmar" no modal de MB WAY
    document.getElementById('mbwayForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        const mbwayPhone = document.getElementById('mbwayPhone').value;

        const mbwayPhonePattern = /^9\d{8}$/;

        if (!mbwayPhone.match(mbwayPhonePattern)) {
            alert("Número MB WAY inválido!");
            return;
        }

        // Preencher campos no formulário principal
        alert("Dados MB WAY confirmados!");
        const modalInstance = bootstrap.Modal.getInstance(document.getElementById('mbwayModal'));
        if (modalInstance) modalInstance.hide();
    });

    // Confirmar pagamento principal
    confirmPaymentButton.addEventListener('click', function () {
        const selectedPaymentType = document.querySelector('input[name="paymentType"]:checked');

        // Verificar se um tipo de pagamento foi selecionado
        if (!selectedPaymentType) {
            alert("Por favor, selecione um tipo de pagamento!");
            return;
        }

        // Verificar se todos os campos foram preenchidos corretamente
        if (!validateForm()) {
            return;
        }

        // Confirmar os dados do pagamento e submeter
        alert("Pagamento confirmado com sucesso!");

        // Redirecionar para a loja (troque o URL abaixo para o correto)
        window.location.href = 'http://127.0.0.1:5501/loja.html'; // Substitua pelo URL da sua loja
    });
});
