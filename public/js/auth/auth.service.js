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
                    window.location.href = '/cms/admin'
                })
                submitButton.attr('disabled', false)
            }
        } catch (error) {
            submitButton.attr('disabled', false)
            if (error.response.status == 422) {
                warningAlert();
            }else if(error.response.status == 401){
                emailOrPasswordWrong() 
            } else {
                errorAlert();
                console.log(error);
            }
        };
        
    }
}

export default authService;