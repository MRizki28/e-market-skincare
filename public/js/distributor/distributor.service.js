class distributorService {

    async renderData(){
        try {
            const response = await axios.get(`${appUrl}/v1/distributor`);
            const responseData = await response.data;
            console.log(responseData)
            if (responseData.status == 'success') {
                $('#name_distributor').val(responseData.data[0].name_distributor);
                $('#phone_number').val(responseData.data[0].phone_number);
                $('#address').val(responseData.data[0].address);
                $('#description').val(responseData.data[0].description);
                $('#preview').attr('src', `${appUrl}/uploads/distributor/${responseData.data[0].image_distributor}`);
                const fileUrl = `${appUrl}/uploads/distributor/${responseData.data[0].image_distributor}`;
                const fileNames = fileUrl.split('/').pop();
                const blob = await fetch(fileUrl).then(r => r.blob());
                const file = new File([blob], fileNames);
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $('#image_distributor').prop('files', fileList.files);
                $('#btn-simpan').text('Update');
            }else{
                $('#name_distributor').val('');
                $('#phone_number').val('');
                $('#address').val('');
                $('#description').val('');
                $('#btn-simpan').text('Simpan');
            }
        } catch (error) {
            console.log(error)
        };
        
    }

    async createAndUpdate(e){
        try {
            const formData = new FormData(e.target);
            const response = await axios.post(`${appUrl}/v1/distributor/create`, formData);
            const responseData = await response.data;
            console.log(responseData)
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