class distributorService {

    async renderData(){
        try {
            const response = await axios.get('/v1/distributor/');
            const responseData = await response.data;
            if (responseData.status == 'success') {
                $('#name_distributor').val(responseData.data[0].name_distributor);
                $('#phone_number').val(responseData.data[0].phone_number);
                $('#address').val(responseData.data[0].address);

                $('#btn-simpan').text('Update');
            }else{
                $('#name_distributor').val('');
                $('#phone_number').val('');
                $('#address').val('');
                $('#btn-simpan').text('Simpan');
            }
        } catch (error) {
            console.log(error)
        };
        
    }

    async createAndUpdate(e){
        try {
            const formData = new FormData(e.target);
            const response = await axios.post('/v1/distributor/create', formData);
            const responseData = await response.data;
            if (responseData.status == 'success') {
                successAlert().then(function () {
                    window.location.reload()
                })
            }
        } catch (error) {
            console.log(error);
            if (error.response.status == 422) {
                warningAlert();
            }
        };
        
    }
}

export default distributorService;