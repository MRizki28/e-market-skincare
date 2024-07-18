class authService {

    async login(e) {
        let submitButton = $(e.target).find(':submit')
        try {
            let formData = new FormData(e.target)
            submitButton.attr('disabled', true)
            const response = await axios.post('/login', formData)
            const responseData = await response.data
            if (responseData.status == 'success') {
                successAlert().then(function () {
                    window.location.href = '/'
                })
                submitButton.attr('disabled', false)
            }
        } catch (error) {
            submitButton.attr('disabled', false)
            if (error.response.status == 422) {
                warningAlert();
            } else {
                errorAlert();
                console.log(error);
            }
        };
        
    }
}

export default authService;