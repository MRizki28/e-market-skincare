function paramsUrl(url, params) {
    if (params) {
        return url + '?' + $.param(params)
    }
    return url
}

function clearInputForm() {
    $(".form-control").val("")
    $(".form-control").val("").trigger('change');
}

function paginationLink(element, params) {
    params.data.links.forEach((link, index) => {
        if (index === 0) {
            element.append(`
                <li class="page-item ${params.data.prev_page_url ? '' : 'disabled'}">
                    <a class="page-link" href="${params.data.prev_page_url || '#'}" aria-label="Previous" id="pagination-prev" >
                        <span aria-hidden="true">«</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
            `)
        } else if (index === params.data.links.length - 1) {
            element.append(`
                <li class="page-item ${params.data.next_page_url ? '' : 'disabled'}">
                    <a class="page-link" href="${params.data.next_page_url || '#'}" aria-label="Next" id="pagination-next" >
                        <span aria-hidden="true">»</span></span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            `)
        } else {
            element.append(`
                <li class="page-item ${link.active ? 'active disabled' : ''}"><a class="page-link" href="${link.active ? '#' : link.url}">${link.label}</a></li>
            `)
        }
    })
}

function dateRangePickerSetup(element) {
    element.daterangepicker({
        autoUpdateInput: false,
        locale: {
            format: 'YYYY-MM-DD',
            cancelLabel: 'Bersihkan',
            applyLabel: 'Gunakan'
        },
    })

    element.on('apply.daterangepicker', function (ev, picker) {
        const startDate = picker.startDate.format('YYYY-MM-DD');
        const endDate = picker.endDate.format('YYYY-MM-DD');
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);

        console.log($(this).data('start-date'));
        console.log($(this).data('end-date'));

        $(this).val(startDate + ' s/d ' + endDate);
        $(this).data('start-date', startDate);
        $(this).data('end-date', endDate);
    });


    element.on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
        $(this).data('start-date', '')
        $(this).data('end-date', '')
    });
}

function successAlert() {
    return Swal.fire({
        title: 'Success',
        text: 'Data berhasil ditambahkan',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
    })
}

function successAlertApprove() {
    return Swal.fire({
        title: 'Success',
        text: 'Member berhasil di approve',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
    })
}

function successAlertReject() {
    return Swal.fire({
        title: 'Success',
        text: 'Member berhasil di reject',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
    })
}

function successUpdateAlert() {
    return Swal.fire({
        title: 'Success',
        text: 'Data berhasil diperbaharui',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
    })
}

function successResetPasswordAlert() {
    return Swal.fire({
        title: 'Success',
        text: 'Password berhasil direset',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
    })
}

function successSettingPasswordAlert() {
    return Swal.fire({
        title: 'Success',
        text: 'Password berhasil diperbaharui',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
    })
}

function errorAlert() {
    Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan',
        icon: 'error',
        timer: 5000,
        showConfirmButton: true
    });
}

function failedDeleteDataLoginAlert() {
    Swal.fire({
        title: 'Peringatan',
        text: 'Tidak bisa delete diri sendiri!',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

function memberNotExistAlert() {
    Swal.fire({
        title: 'Peringatan',
        text: 'Tidak ad member yang terdaftar',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

function warningAlert() {
    Swal.fire({
        title: 'Peringatan',
        text: 'Periksa kembali inputan anda !',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

function choseAnotherDayAlert() {
    Swal.fire({
        title: 'Peringatan',
        text: 'Silahkan pilih tanggal lain, tanggal sudah terschedule !',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

function choseAnotherTimeAlert() {
    Swal.fire({
        title: 'Peringatan',
        text: 'Waktu berakhir tidak boleh kurang dari waktu mulai !',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

function protectedAlert() {
    Swal.fire({
        title: 'warning',
        text: 'Anda telah melakukan perubahan terhadap sistem, anda akan di kembalikan ke halaman home!',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: false
    });
}

function choseAnotherDayAlert2() {
    Swal.fire({
        title: 'Peringatan',
        text: 'Silahkan pilih tanggal hari ini atau setelah hari ini !',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

function isScheduleAlert() {
    Swal.fire({
        title: 'warning',
        text: 'Format schedule yang didukung day|month',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

function warningExtentionAlert() {
    Swal.fire({
        title: 'Peringatan',
        text: 'Format file tidak di dukung !',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

function deleteAlert() {
    return Swal.fire({
        title: 'Hapus ?',
        text: 'Anda tidak dapat mengembalikan  ini',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Ya',
        reverseButtons: true,
    })
}

function updateStatus() {
    return Swal.fire({
        title: 'Update ?',
        text: 'Seluruh status berdasarkan tanggal kegiatan yang anda pilih akan di update',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Ya',
        reverseButtons: true,
    })
}

function sendAllNotification() {
    return Swal.fire({
        title: 'Kirim notifikasi ?',
        text: 'Anda ingin mengirim notifikasi ke seluruh member ?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Ya',
        reverseButtons: true,
    })
}

function failedDeleteDataAlert() {
    Swal.fire({
        title: 'Gagal menghapus data',
        text: 'Data sedang digunakan !',
        icon: 'error',
        timer: 5000,
        showConfirmButton: true
    });
}

function successDeleteAlert() {
    return Swal.fire({
        title: 'Success',
        text: 'Data berhasil dihapus',
        icon: 'success',
        timer: 5000,
        showConfirmButton: true
    })
}

function emailTakenAlert() {
    Swal.fire({
        title: 'Peringatan',
        text: 'Email sudah digunakan, silahkan gunakan email lain!',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

function emailOrPasswordWrong() {
    Swal.fire({
        title: 'Peringatan',
        text: 'Email atau password anda salah !',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

function distributorNotFountAlert() {
    Swal.fire({
        title: 'Peringatan',
        text: 'Data distributor belum diinputkan, silahkan inputkan data distributor terlebih dahulu!',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: true
    });
}

$(document).ready(function () {
    $.validator.addMethod("fileExtension", function (value, element) {
        return this.optional(element) || /\.(docx|png|jpg|jpeg|xlsx|xls|csv|doc|pdf)$/i.test(value);
    },
        "Hanya file dengan ekstensi docx, png, jpg, jpeg, xlsx, xls, csv, doc, atau pdf yang diperbolehkan."
    );
});

function encryptToken(token, key) {
    return CryptoJS.AES.encrypt(token, key).toString();
}

function decryptToken(tokenEncrpyt, key) {
    let bytes = CryptoJS.AES.decrypt(tokenEncrpyt, key);
    return bytes.toString(CryptoJS.enc.Utf8)
}

function protectedModificationSystem(event) {
    if (event.originalEvent.storageArea === localStorage) {
        if (!localStorage.getItem('entire_id_arsip') || !localStorage.getItem('nameUser')
            || !localStorage.getItem('id_entire_user')
            || !localStorage.getItem('id_entire_year')
            || !localStorage.getItem('id_entire_type_document')) {
            protectedAlert();
            setTimeout(function () {
                window.location.href = '/';
            }, 2000);
        }
    }
}

function protectedModificationSystem2(event) {
    if (event.originalEvent.storageArea === localStorage) {
        if (!localStorage.getItem('personal_id_arsip') || !localStorage.getItem('user_name')
            || !localStorage.getItem('id_year')
            || !localStorage.getItem('id_type_document')) {
            protectedAlert();
            setTimeout(function () {
                window.location.href = '/';
            }, 2000);
        }
    }
}

function insertLineBreaks(text, wordsPerLine) {
    const words = text.split(' ');
    let newText = '';
    let wordCount = 0;

    for (let i = 0; i < words.length; i++) {
        newText += words[i] + ' ';
        wordCount++;

        if (wordCount === wordsPerLine) {
            newText += '<br>';
            wordCount = 0;
        }
    }

    return newText.trim();
}

function formatCurrency(value) {
    let numberValue = value.replace(/[^0-9]/g, '');
    numberValue = numberWithCommas(numberValue);
    return numberValue
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatDate(date) {
    return new Date(date).toJSON().slice(0, 10);
}

function statusInfo(status) {
    switch (status) {
        case 'pending':
            return '<span class="badge badge-warning">Pending</span>';
        case 'success':
            return '<span class="badge badge-success">Success</span>';
        case 'failed':
            return '<span class="badge badge-danger">Failed</span>';
        default:
            break;
    }
}